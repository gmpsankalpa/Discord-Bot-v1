const {
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Add a role to user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((Option) =>
      Option.setName("user")
        .setDescription("The user add the role to.")
        .setRequired(true)
    )
    .addRoleOption((Option) =>
      Option.setName("role")
        .setDescription("The role to add the user.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    const role = interaction.options.getRole("role");
    const member = await interaction.guild.members.fetch(user.id);

    if (member.roles.cache.has(role.id)) {
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setDescription(`User ${user} already has the role \`${role.name}\`.`)
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
      await interaction.guild.members.cache.get(user.id).roles.add(role);
      const embed = new EmbedBuilder()
        .setColor(role.color)
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(`Succesfully add role \`${role.name}\` to user \`${user.tag}\``)
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
          `Failed to add role \`${role.name}\` to user \`${user.tag}\`.`
        );
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
