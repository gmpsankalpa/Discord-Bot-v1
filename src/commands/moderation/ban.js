const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the member provided.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to ban")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("days")
        .setDescription("The amount of days to ban a member for.")
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for banning the member provided.")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    let time = interaction.options.getInteger("days");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reson provided.";
    if (!time) time = null;

    await member
      .ban({
        days: time,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `banned ${user.tag} successfully!`,
    });
    client.channels.cache.get(client.config.banned).send({
      embeds: [
        new EmbedBuilder()
          .setColor("#FF0000")
          .setTitle(`${member.guild.name} Ban Notification!.`)
          .setDescription(
            `${member.user} banned from the **${member.guild.name}**.`
          )
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({
            text: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
      //  content: rem,
    });
  },
};
