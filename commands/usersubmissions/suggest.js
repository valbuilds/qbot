const { SlashCommandBuilder, EmbedBuilder, Embed } = require(`discord.js`);
const { inlineCode } = require(`discord.js`);

const adminRoleId = `1111908821422587924`;
const logChannelId = `1111908875172597820`;
const suggestionChannelId = `1111908862057005127`;

const tagToBeClaimed = `1113562445403914281`;
const tagAccepted = `1113562292454437074`;
const tagInProgress = `1113562257763356692`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`suggest`).setDescription(`Suggest a server feature.`)
        .addSubcommand(subcommand => subcommand.setName(`submit`).setDescription(`Submits a suggestion.`)
            .addStringOption(option => option.setName(`title`).setDescription(`Suggestion title. Max 100 charachters, it's a Discord limitation.`).setMaxLength(100).setRequired(true))
            .addStringOption(option => option.setName(`description`).setDescription(`Explain in more detail. Max 4096 charachters, it's a Discord limiiation.`).setMaxLength(4096).setRequired(false)))
        .addSubcommand(subcommand => subcommand.setName(`claim`).setDescription(`(ADMIN+) Claims a suggestion.`))
        .addSubcommand(subcommand => subcommand.setName(`delete`).setDescription(`(ADMIN+) Deletes a suggestion.`)
            .addStringOption(option => option.setName(`reason`).setDescription(`Why did you deny this suggestion? Max 2000 charachters, it's a Discord limitation.`).setMaxLength(2000).setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName(`finalize`).setDescription(`(ADMIN+) Finalizes a suggestion.`)
            .addStringOption(option => option.setName(`notes`).setDescription(`Additional notes. Max 2000 charachters, it's a Discord limitation.`).setMaxLength(2000).setRequired(true))),
    async execute (interaction) {
        const sub = interaction.options.getSubcommand();
        const member = interaction.member;

        const adminRole = interaction.guild.roles.cache.get(`${adminRoleId}`);
        const logChannel = interaction.client.channels.cache.get(`${logChannelId}`);
        const suggestionChannel = interaction.client.channels.cache.get(`${suggestionChannelId}`);

        const avatar = interaction.member.user.avatarURL(
            { format: 'png', size: 512, forceStatic: false }
        );

        if (sub === `submit`) {
            submitSug();
        } else if (sub === `claim`) {
            claimSug();
        } else if (sub === `delete`) {
            denySug();
        } else if (sub === `finalize`) {
            finalizeSug();
        } else {
            return interaction.reply({ content: `I'm sorry but you need to run ${inlineCode(`/interaction submit`)}, ${inlineCode(`/interaction claim`)}, ${inlineCode(`/interaction deny`)}, ${inlineCode(`/interaction finalize`)}.`, ephemeral: true });
        }

        async function submitSug() {
            const title = interaction.options.getString(`title`);
            const description = interaction.options.getString(`description`);
            const tag = Math.floor(Math.random() * (9999 - 1000) + 1000);

            const suggested = new EmbedBuilder()
                .setTitle(`${title}`)
                .setDescription(`${description}`)
                .setAuthor({ name: `${member.displayName}`, iconURL: `${avatar}` })
                .setFooter({ text: `This message includes member-submitted content. Queer Bot nor it's contributors condone the content. ▪ Suggestion ${tag}` })
                .setColor(`Blurple`)
            
            const created = await suggestionChannel.threads.create({ name: `${title}`, message: { embeds: [suggested] }, appliedTags: [`${tagToBeClaimed}`] });
            return interaction.reply({ content: `Suggestion sent!\n${created.url}`, ephemeral: true });
        }
        async function claimSug() {
            if (interaction.member.roles.cache.some(role => role.id === `${adminRoleId}`)) {
                checkForForum();
            } else {
                noPerms();
            }

            async function checkForForum() {
                if (interaction.channel.isThread) {
                    isThread();
                } else {
                    notThread();
                }
            }

            async function isThread() {
                if (interaction.channel.isLocked) {
                    alreadyDone();
                } else {
                    claimFinale();
                }
            }

            async function claimFinale() {
                const claimed = new EmbedBuilder()
                    .setTitle(`Suggestion claimed!`)
                    .setDescription(`<@${interaction.member.id}> will handle your suggestion.`)
                    .setColor(`Green`)

                await interaction.channel.setAppliedTags([`${tagInProgress}`]);
                return interaction.reply({ embeds: [claimed] });
            }

            async function noPerms() {
                return interaction.reply({ content: `You are not allowed to use this command.`, ephemeral: true });
            }
            async function notThread() {
                return interaction.reply({ content: `You are not allowed to use this command in this channel.`, ephemeral: true });
            }
            async function alreadyDone() {
                return interaction.reply({ content: `This suggestion is already completed.`, ephemeral: true });
            }
        }
        async function denySug() {
            if (interaction.member.roles.cache.some(role => role.id === `${adminRoleId}`)) {
                checkForThread();
            } else {
                noPerms();
            }

            async function checkForThread() {
                if (interaction.channel.isThread) {
                    checkLocked();
                } else {
                    notThread();
                }
            }

            async function checkLocked() {
                if (interaction.channel.isLocked) {
                    isLocked();
                } else {
                    notLocked();
                }
            }

            async function notLocked() {
                const reason = interaction.options.getString(`reason`);

                const deleted = new EmbedBuilder()
                    .setTitle(`Suggestion deleted`)
                    .setDescription(`${reason}`)
                    .setAuthor({ name: `${member.displayName}`, iconURL: `${avatar}` })
                    .setFooter({ text: `This message includes member-submitted content. Queer Bot nor it's contributors condone the content.` })
                    .addFields({ name: `Suggestion title:`, value: `${interaction.channel.name}` })
                    .setColor(`Red`)

                await logChannel.send({ embeds: [deleted] });
                return interaction.channel.delete(`${reason}`);
            }

            async function noPerms() {
                return interaction.reply({ content: `You are not allowed to use this command.`, ephemeral: true });
            }
            async function notThread() {
                return interaction.reply({ content: `You are not allowed to use this command in this channel.`, ephemeral: true });
            }
            async function isLocked() {
                return interaction.reply({ content: `This suggestion is already completed.`, ephemeral: true });
            }
        }
        async function finalizeSug() {
            if (interaction.member.roles.cache.some(role => role.id === `${adminRoleId}`)) {
                checkForThread();
            } else {
                noPerms();
            }

            async function checkForThread() {
                if (interaction.channel.isThread) {
                    checkLocked();
                } else {
                    notThread();
                }
            }

            async function checkLocked() {
                if (interaction.channel.isLocked) {
                    isLocked();
                } else {
                    notLocked();
                }
            }

            async function notLocked() {
                const notes = interaction.options.getString(`notes`);

                const completed = new EmbedBuilder()
                    .setTitle(`Suggestion completed!`)
                    .setDescription(`${notes}`)
                    .setAuthor({ name: `${member.displayName}`, iconURL: `${avatar}` })
                    .setFooter({ text: `This message includes member-submitted content. Queer Bot nor it's contributors condone the content.` })
                    .setColor(`Green`)

                await interaction.channel.setAppliedTags([`${tagAccepted}`]);
                await interaction.channel.setLocked(true);
                return interaction.reply({ embeds: [completed] });
            }

            async function noPerms() {
                return interaction.reply({ content: `You are not allowed to use this command.`, ephemeral: true });
            }
            async function notThread() {
                return interaction.reply({ content: `You are not allowed to use this command in this channel.`, ephemeral: true });
            }
            async function isLocked() {
                return interaction.reply({ content: `This suggestion is already completed.`, ephemeral: true });
            }
        }
    }
        
}