const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const owner = config.owner;

module.exports = {
    name: "user-info",
    aliases: ["t"],
    args: true,

    async execute(message, client, args) {

        const { options } = interaction;
        
        const userID = interaction.user.id;
        const { guild } = interaction;

        const icon1 = guild.iconURL;
        const roles = guild.emojis.cache.size;
        const emojis = guild.emojis.cache.size;
        const id = guild.id;

        const user = options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;
        const { name } = guild;
        const banner = await ( await interaction.client.users.fetch(user.id, { force: true})).bannerURL({ size: 4096 });
        const owner = config.owner

        const userbed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: tag, iconURL: icon })
        .setThumbnail(icon)
        .addFields({ name: "Name of Server", value: `${name}`, inline: false })
        .addFields({ name: "Member", value: `${user}`, inline: true })
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false })
        .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: false })
        .addFields({ name: "Joined Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: false })
        .addFields({ name: "User ID", value: `${user.id}`, inline: false })
        .setFooter({ text: `User info tracker | By ${owner}`})
        .setTimestamp()
        .setImage(banner)

        message.reply({ embeds: [userbed]});
    }
}