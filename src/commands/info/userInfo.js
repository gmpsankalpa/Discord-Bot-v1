const { SlashCommandBuilder, client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display info about a selected user")
    .addUserOption((Option) =>
      Option.setName("target").setDescription("The user's information to show")
    ),
  async execute(interaction) {
    let user = interaction.options.getUser("target");
    if (user) {
      let member = interaction.guild.members.cache.get(user.id);
      if (member) {
        this.createEmbed(interaction, member);
      } else {
        interaction.reply("User not found");
      }
    } else {
      interaction.reply("User not found");
    }
  },
  createEmbed(interaction, member) {
    const embed = {
      title: `User Information - ${member.user.username}`,
      fields: [
        {
          name: "Username",
          value: `\`@${member.user.username}\``, // Manually mention the user
          inline: true,
        },
        {
          name: "Discriminator",
          value: `\`${member.user.discriminator}\``,
          inline: true,
        },
        {
          name: "User ID",
          value: `\`${member.user.id}\``, // Add the User ID field
          inline: true,
        },
        // {
        //   name: "Avatar",
        //   value: "Avatar hidden",
        // },
        {
          name: "Account Creation Date",
          value: `\`${member.user.createdAt.toLocaleDateString()}\``,
        },
        {
          name: "Join Date",
          value: `\`${member.joinedAt.toLocaleDateString()}\``,
        },
      ],
      thumbnail: {
        url: member.user.displayAvatarURL({ dynamic: true }),
      },
      footer: {
        text: `Provided by ${interaction.guild.name} ${new Date().toLocaleString()}`,
        icon_url: interaction.guild.iconURL({ dynamic: true }),
      },
    };

    // Check if the user has roles
    if (member.roles && member.roles.cache) {
      embed.fields.push({
        name: "Roles",
        value: member.roles.cache.map((role) => role.name).join(", "),
      });
    } else {
      embed.fields.push({
        name: "Roles",
        value: "No roles",
      });
    }

    interaction.reply({
      embeds: [embed],
    });
  },
};
