const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removetimeout")
    .setDescription("Remove the timeout from the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to remove the timeout from")
        .setRequired(true)
    )
    // .addIntegerOption((option) =>
    //   option
    //     .setName("time")
    //     .setDescription("The amount of minutes to timeout a member for.")
    // )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for removing the timeout")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger("time");
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!reason) reason = "No reson provided.";
    if (!time) time = null;

    await member.timeout(time == null ? null : time * 60 * 1000, reason).catch(console.error);

    await interaction.reply({
      content: `Timed out ${user.tag} successfully!`,
    });
  },
};
