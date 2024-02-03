const { EmbedBuilder, Events, ActivityType } = require("discord.js");
let i = 0;

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.guilds.fetch(client.config.guildId).then(async (guild) => {
      client.user.setStatus("online");
      console.log(
        `\x1B[94mReady ${client.user.tag} is logged in and online ☑️\x1B[39m`
      );

      client.channels.cache.get(client.config.log).send({
        embeds: [
          new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(`${client.user.username} Bot is online ||@Admin||`)
            .setTimestamp()
            .setFooter({
              text: `${client.user.username}`,
              iconURL: client.user.displayAvatarURL(),
            }),
        ],
      });

      // ACTIVITY STATUS
      setInterval(() => {
        const activities_list = [
          {
            name: `gmpsankalpa.xyz`,
            type: ActivityType.Watching,
            status: "online",
          },
          {
            name: `YT:Sanka`,
            type: ActivityType.Watching,
            status: "online",
          },
          {
            name: `FB:Sanka`,
            type: ActivityType.Watching,
            status: "online",
          },
          {
            name: `TikTok:@Sanka`,
            type: ActivityType.Watching,
            status: "online",
          },
        ];

        if (i == activities_list.length) {
          i = 0;
        }
        client.user.setPresence({ activities: [activities_list[i++]] });
      }, 3000);

    });
  },
};
