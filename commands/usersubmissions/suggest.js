const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`suggest`)
        .setDescription(`Suggest a server feature.`)
}