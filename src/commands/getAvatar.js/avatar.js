const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('getAvatar')
        .setType(ApplicationCommandType.User),

    async execute(interaction, client) {
        try {
            if (interaction.targetUser) {
                const avatarUrl = interaction.targetUser.displayAvatarURL();
                await interaction.reply({
                    content: avatarUrl,
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: "Please select a valid user.",
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    },
};
