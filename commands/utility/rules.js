const { SlashCommandBuilder, EmbedBuilder, inlineCode } = require(`discord.js`);

const memberRoleId = `1113826992333279352`;
const verifyCmdsChannelId = `1113675686398398604`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`rules`).setDescription(`Refrences the rules.`)
        .addSubcommand(subcommand => subcommand.setName(`full`).setDescription(`Sends the full rules message!`)
            .addBooleanOption(option => option.setName(`ephemeral`).setDescription(`Hides the message from other members.`).setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName(`verify`).setDescription(`Verifies you.`)),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand();

        const member = interaction.member;

        if (sub === `full`) {
            fullMessage();
        } else if (sub === `verify`) {
            verifyUser();
        }

        async function fullMessage() {
            const eph = interaction.options.getBoolean(`ephemeral`);

            const fullRules = new EmbedBuilder()
                .setTitle(`Server Rules`)
                .addFields(
                    { name: `1. General Discord-required rules (per the Community Guidelines)`, value: `a. Respect Each Other\nb. Be Honest\nc. Respect Discord\n[Learn more](https://discord.com/guidelines 'Discord Community Guidelines')` },
                    { name: `2. Discord-wide rules (Terms of Service)`, value: `a. By accessing our services, you confirm that you’re at least 13 years old and meet the minimum age required by the laws in your country. ([List of minimum ages](https://support.discord.com/hc/en-us/articles/360040724612 'List of minimum ages'))\nb. Don’t use the services to do harm to yourself or others.\nc. Don’t use the services to do harm to Discord.\nd. Don’t use the services to do anything else that’s illegal.\n[Learn more](https://discord.com/terms 'Discord Terms of Service')` },
                    { name: `3. Server-specific rules`, value: `a. Treat others with respect.\nb. When making jokes, tone tags (${inlineCode(`/j`)}, ${inlineCode(`/joke`)}, ${inlineCode(`/joking`)}) are required. (This makes moderation easier.)\nc. Keep all talk of sexual fantasies in our spicy server. (https://discord.gg/N3Zm48K4Z7)\nd. Put sensitive topics in spoilers. Sensitive topics can be (but are not limited to) guns, self harm, suicide, sexual assault. Spoilers can be created by adding ${inlineCode(`||`)} to the start and end of a message. (${inlineCode(`||this is a spoiler||`)})\ne. Please keep discussions of suicide and self harm to a minimum.\nf. This is an __english only__ server.` },
                )
                .setColor([111, 255, 164])

            return interaction.reply({ embeds: [fullRules], ephemeral: eph })
        }

        async function verifyUser() {
            if (interaction.member.roles.cache.some(role => role.id === `${memberRoleId}`)) {
                alreadyVerified();
            } else {
                checkChannel();
            }

            async function alreadyVerified() {
                return interaction.reply({ content: `You've already verified.`, ephemeral: true });
            }

            async function checkChannel() {
                if (interaction.channel.id === `${verifyCmdsChannelId}`) {
                    finalizeVerification();
                } else {
                    notRightChannel();
                }
            }

            async function finalizeVerification() {
                await interaction.member.roles.add(`${memberRoleId}`);
                return interaction.reply({ content: `Verified.`, ephemeral: true });
            }
            
            async function notRightChannel() {
                return interaction.reply({ content: `You aren't in the right channel!\nHead to <#${verifyCmdsChannelId}> and run the command again.`, ephemeral: true })
            }
        }
    }
}