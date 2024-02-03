const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member, client) {
    // const rem = `${member.user} just left the **${member.guild.name}**. GOOD BYE.`;
    client.channels.cache.get(client.config.left).send({
      embeds: [
        new EmbedBuilder()
          .setColor('#800080')
          .setTitle(`${member.guild.name} Left Notice!`)
          .setDescription(`${member.user} just left the **${member.guild.name}**. GOOD BYE.`)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({
            text: `${client.user.username}`,
            iconURL: client.user.displayAvatarURL(),
          }),
      ],
      //  content: rem,
    });
    // console.log(member.user);
  },
};
