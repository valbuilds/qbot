const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`help`)
        .setDescription(`Need help?`),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle(`Help Menu`)
            .setDescription(`soon:tm:`)
            .setColor(`Blurple`)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}