const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
  Permissions,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dmembed")
    .setDescription("Send a direct message to a guild user")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to send a message to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

  async execute(interaction) {
    const { member, options, guild } = interaction;

    // Check if the user has the MANAGE_MESSAGES permission
    if (!member.permissions.has("MANAGE_MESSAGES")) {
      return interaction.reply({
        content: "You don't have the required permissions to use this command!",
        ephemeral: true,
      });
    }

    // Get the mentioned user or user ID from the command options
    const targetUser = options.getUser("target");
    if (!targetUser) {
      return interaction.reply({
        content: "Can't find the specified user!",
        ephemeral: true,
      });
    }

    // Get the message content from the command options
    const messageContent = options.getString("message");
    if (!messageContent || messageContent.length < 1) {
      return interaction.reply({
        content: "You must supply a message!",
        ephemeral: true,
      });
    }

    try {
      // Create an embed
      const color = 0x0099ff;
      const embed = {
        color: color, // You can customize the color
        title: "Direct Message",
        description: `You have received a direct message from ${member.user.tag}`,
        fields: [
          {
            name: "Message Content",
            value: messageContent,
          },
        ],
        thumbnail: {
          url: guild.iconURL({ dynamic: true }) || guild.iconURL(),
        },
        footer: {
          text: `${interaction.guild.name} | ${new Date().toLocaleString()}`,
          icon_url: interaction.guild.iconURL(),
        },
      };

      // Send a direct message with the embed to the target user
      await targetUser.send({ embeds: [embed] });

      // Reply in the channel that the message was sent successfully
      const replyRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Sent!")
          .setStyle(ButtonStyle.Success)
          .setDisabled(true)
          .setCustomId("button_22") // Fixed the typo in the custom ID
      );

      return interaction.reply({
        content: `You have sent your message to ${targetUser.tag}`,
        ephemeral: true,
        components: [replyRow],
      });
    } catch (error) {
      console.error(`Error sending DM: ${error.message}`);
      return interaction.reply({
        content: `Failed to send a direct message. Error: ${error.message}`,
        ephemeral: true,
      });
    }
  },
};
