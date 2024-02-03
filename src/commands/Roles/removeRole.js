const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removerole")
    .setDescription("Remove a role from a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((Option) =>
      Option.setName("user")
        .setDescription("The user to remove the role from.")
        .setRequired(true)
    )
    .addRoleOption((Option) =>
      Option.setName("role")
        .setDescription("The role to remove from the user.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    const member = await interaction.guild.members.fetch(user.id);

    if (!member.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`User ${user} dosen't have the role \`${role.name}\`.`)
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp();
      await interaction.reply({ embeds: [embed], ephemeral: true });
      return;
    }

    try {
      await interaction.guild.members.cache.get(user.id).roles.remove(role);
      const embed = new EmbedBuilder()
        .setColor(role.color)
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(`Succesfully removed role \`${role.name}\` from user \`${user.tag}\``)
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .setTimestamp()
        .setDescription(
          `Failed to remove role \`${role.name}\` from user \`${user.tag}\`.`
        );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
