const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`get-forum-channel-tags`)
        .setDescription(`[DEBUG] Lists forum channel tags in the bot's console.`)
        .addChannelOption(option =>
            option.setName(`channel`)
                .setDescription(`What channel do you want to grab the tags from?`)
                .addChannelTypes(ChannelType.GuildForum)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction) { 
            const channel = interaction.options.getChannel(`channel`);

            console.log(channel.availableTags);
            return interaction.reply({ content: `The tags are now in the bot's console.`, ephemeral: true });
        }
}