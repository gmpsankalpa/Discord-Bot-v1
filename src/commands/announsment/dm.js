const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dm")
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
    const { member, options } = interaction;

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
  // Send a direct message to the target user
  await targetUser.send({ content: messageContent });

  // Reply in the channel that the message was sent successfully
  const replyRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Sent!")
      .setStyle(ButtonStyle.Success)
      .setDisabled(true)
      .setCustomId("buttom_11")
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
