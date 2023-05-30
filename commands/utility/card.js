const { SlashCommandBuilder, EmbedBuilder, Embed } = require(`discord.js`);
const { inlineCode } = require('discord.js');
const axios = require(`axios`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`card`)
        .setDescription(`Get a card from pronouns.page`)
        .addStringOption(option => option.setName(`username`).setDescription(`The user's pronouns.page username, without the @. (Example: violetbuilds)`).setRequired(true))
        .addBooleanOption(option => option.setName(`ephemeral`).setDescription(`Set this to true if you don't want others to see the response.`).setRequired(true)),
    async execute(interaction) {
        const eph = interaction.options.getBoolean(`ephemeral`)
        const username = interaction.options.getString(`username`)
        await interaction.deferReply({ ephemeral: eph });

        axios.get(`https://en.pronouns.page/api/profile/get/${username}?version=2`)
            .then(function (response) {

                if (response.data.id === undefined) {
                    accountDoesntExist();
                } else {
                    accountExists();
                }

                async function accountExists() {
                    const introEmbed = new EmbedBuilder()
                        .setTitle(`${username}'s card`)
                        .setColor([199, 21, 133])
                        .setThumbnail(`${response.data.avatar}`)
                    const namesEmbed = new EmbedBuilder()
                        .setTitle(`Names`)
                        .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                        .addFields(...response.data.profiles.en.names.map(({value, opinion}) => ({ name: value, value: opinion, inline: true })))
                        .setColor([199, 21, 133])
                    const pronounEmbed = new EmbedBuilder()
                        .setTitle(`Pronouns`)
                        .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                        .addFields(...response.data.profiles.en.pronouns.map(({value, opinion}) => ({ name: value, value: opinion, inline: true })))
                        .setColor([199, 21, 133])
                    const descriptionEmbed = new EmbedBuilder()
                        .setTitle(`Description`)
                        .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                        .addFields({ name: `​`, value: `${response.data.profiles.en.description}` })
                        .setColor([199, 21, 133])
                    const ageEmbed = new EmbedBuilder()
                        .setTitle(`Age`)
                        .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                        .addFields({ name: `​`, value: `${response.data.profiles.en.age}` })
                        .setColor([199, 21, 133])
                    const tzEmbed = new EmbedBuilder()
                        .setTitle(`Timezone`)
                        .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                        .addFields({ name: `​`, value: `${response.data.profiles.en.timezone.tz}` })
                        .setColor([199, 21, 133])
                    const extraInfoEmbed = new EmbedBuilder()
                    .setTitle(`Thats not it!`)
                    .setFooter({ text: `This data is not endorsed nor written by Queer Bot or their developers.` })
                    .setDescription(`More info is on the users pronouns.page.\nhttps://en.pronouns.page/@${username}`)
                    .setColor([199, 21, 133])
                    
                    interaction.editReply({ content: ``, embeds: [introEmbed, namesEmbed, pronounEmbed, descriptionEmbed, ageEmbed, tzEmbed, extraInfoEmbed] });
                }
                async function accountDoesntExist() {
                    interaction.editReply({ content: `That account doesn't exist! Make sure you didnt include the ${inlineCode(`@`)} in the 'user' spot!`});
                }
            })
            .catch(function (error) {
                console.log(error);
                interaction.editReply({ content: `An error was encountered.` });
            })
    }
}