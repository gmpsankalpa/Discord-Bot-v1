const {
    SlashCommandBuilder,
    SelectMenuBuilder,
    ActionRowBuilder,
    SelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("menu")
      .setDescription("Return a select menu."),
    async execute(interaction, client) {
      const menu = new StringSelectMenuBuilder()
        .setCustomId(`sub-menu`)
        .setMinValues(1)
        .setMaxValues(1)
        .setOptions(
          new StringSelectMenuOptionBuilder({
            label: `YouTube`,
            value: `https://Youtube.com/`,
            emoji: '879396250213027880'
          }),
          new StringSelectMenuOptionBuilder({
            label: `Facebook`,
            value: `Not Available Now`,
            emoji: `1201882009547575387`
          }),
          new StringSelectMenuOptionBuilder({
              label: `TikTok`,
              value: `Not Available Now.`,
              emoji: `1201883289502363668`
          })
        );
  
      await interaction.reply({
        components: [new ActionRowBuilder().addComponents(menu)],
      });
    },
  };
  