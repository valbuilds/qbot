const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`intro`)
        .setDescription(`Introduce yourself!`)
        .addStringOption(option =>
            option.setName(`name`) // called at line 52
                .setDescription(`Name.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`astrological-sign`) // called at line 54
                .setDescription(`Astrological sign.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`gender`) // called at line 55
                .setDescription(`Gender.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`orientation`) // called at line 56
                .setDescription(`Also known as sexual orientation.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`origins`) // called at line 57
                .setDescription(`Origins.`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`likes`) // called at line 58
                .setDescription(`What do you enjoy doing?`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`dm-policy`) // called at line 59, check var `dms`.
                .setDescription(`What is your policy with DMs?`)
                .addChoices(
                    { name: `Open, DM me anytime!`, value: `open-anytime` },
                    { name: `Open, DM me when I'm online.`, value: `open-online` },
                    { name: `Closed`, value: `closed` },
                    { name: `Ask me!`, value: `ask` },
                )
                .setRequired(true))
        .addStringOption(option =>
            option.setName('positive-traits') // called at line 61
                .setDescription(`Positive traits about yourself!`)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('negative-traits') // called at line 62
                .setDescription(`Negative traits about yourself!`)
                .setRequired(true))
                
        .addStringOption(option =>
            option.setName(`age`) // called at line 53
            .setDescription(`Age.`)),
    async execute(interaction) {
        const user = interaction.user;
        
        const name = interaction.options.getString(`name`); // free-string
        const age = interaction.options.getString(`age`); // free-string, not required
        const astro = interaction.options.getString(`astrological-sign`); // free-string
        const gender = interaction.options.getString(`gender`); // free-string
        const orientation = interaction.options.getString(`orientation`); // free-string
        const origins = interaction.options.getString(`origins`); // free-string
        const likes = interaction.options.getString(`likes`); // free-string
        const dmPolicy = interaction.options.getString(`dm-policy`); // can only be `open-anytime`, `open-online`, `closed`, or `ask`
        const positiveTraits = interaction.options.getString(`positive-traits`); // free-string
        const negativeTraits = interaction.options.getString(`negative-traits`); // free-string
        
        const emb1 = new EmbedBuilder()
            .setTitle(`All about ${user.username}!`)
            .setColor(`Blurple`)
            .setFooter({ text: 'This message includes user-written content. Queer Bot, nor the maker of, endorse the content.' })

        const emb2Age = new EmbedBuilder()
            .setTitle(`Identity`)
            .setColor(`Blurple`)
            .addFields(
                { name: `Name`, value:`${name}`, inline: true },
                { name: `Age`, value:`${age}`, inline: true },
                { name: `Astrological sign`, value:`${astro}`, inline: true },
                { name: `Gender`, value:`${gender}`, inline: true },
                { name: `Sexual Orientation`, value:`${orientation}`, inline: true },
                { name: `Origins`, value:`${origins}`, inline: true },
            )
            .setFooter({ text: 'This message includes user-written content. Queer Bot, nor the maker of, endorse the content.' })
        
        const emb2 = new EmbedBuilder()
            .setTitle(`Identity`)
            .setColor(`Blurple`)
            .addFields(
                { name: `Name`, value:`${name}`, inline: true },
                { name: `Astrological sign`, value:`${astro}`, inline: true },
                { name: `Gender`, value:`${gender}`, inline: true },
                { name: `Sexual Orientation`, value:`${orientation}`, inline: true },
                { name: `Origins`, value:`${origins}`, inline: true },
            )
            .setFooter({ text: 'This message includes user-written content. Queer Bot, nor the maker of, endorse the content.' })

        if (dmPolicy === `open-anytime`) {
            dms = `:white_check_mark: DM me anytime!`;
        } else if (dmPolicy === `open-online`) {
            dms = `:white_check_mark: DM me only when I'm online!`;
        } else if (dmPolicy === `closed`) {
            dms = `:negative_squared_cross_mark: My DMs are closed.`;
        }  else if (dmPolicy === `ask`) {
            dms = `:question: Ask me before messaging me!`;
        }

        const emb3 = new EmbedBuilder()
            .setTitle(`Personality`)
            .setColor(`Blurple`)
            .addFields(
                { name: `Likes`, value:`${likes}`, inline: true },
                { name: `DM Status`, value:`${dms}`, inline: true },
                { name: `Positive Traits`, value:`${positiveTraits}`, inline: true },
                { name: `Negative Traits`, value:`${negativeTraits}`, inline: true },
            )
            .setFooter({ text: 'This message includes user-written content. Queer Bot, nor the maker of, endorse the content.' })
        
        const channel = interaction.client.channels.cache.get('1111908854930882643');

        if (age === null) {
            await channel.threads.create({name: `${name}`, message: { content: `<@${user.id}>`, embeds: [emb1, emb2, emb3] }});
            return interaction.reply({ content: `Sent!`, ephemeral: true });
        } else {
            await channel.threads.create({name: `${name}`, message: { content: `<@${user.id}>`, embeds: [emb1, emb2Age, emb3] }});
            return interaction.reply({ content: `Sent!`, ephemeral: true });
        }
    }
}