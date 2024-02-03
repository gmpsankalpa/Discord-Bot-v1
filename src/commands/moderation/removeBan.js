const {
    SlashCommandBuilder,
    PermissionsBitField
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("removeban")
      .setDescription("Remove the ban from the member provided.")
      .addUserOption((option) =>
        option
          .setName("id")
          .setDescription("The id from user you'd like to remove the ban from")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("reason")
          .setDescription("The reason for removing the ban.")
      )
      .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
    async execute(interaction, client) {
      const user = interaction.options.getUser("id");
      let reason = interaction.options.getString("reason");
      let time = interaction.options.getInteger("days");
  
      if (!reason) reason = "No reson provided.";
  
      // Fetch the banned user from the guild bans collection
      const bannedUser = await interaction.guild.bans.fetch(user.id).catch(console.error);
      if (!bannedUser) return interaction.reply("This user is not banned.");

      // Unban the user with the given reason
      await interaction.guild.members.unban(user.id, reason).catch(console.error);
  
      await interaction.reply({
        content: `Unbanned ${user.tag} successfully!`,
      });
    },
  };
  