const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription("kicks the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the member provided.")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString('reason');
    const member = await interaction.guild.members.fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reson provided.";

    await member.kick(reason).catch(console.error);

    await interaction.reply({
        content: `kicked ${user.tag} successfully!`,
    });
  },
};
