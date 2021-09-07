module.exports = {
    name: 'queue',
    aliases: ['q',],
    description:'Show queue',
    async execute(client, msg, args) {
        const distube = client.distube;
        const queue = await distube.getQueue(msg);
        let msgQueue = '';
        if(!queue) return
        queue.songs.map(song => {
            msgQueue += `- **${queue.songs.indexOf(song) + 1}. ${song.name} Requested by: ${song.user}**`
        });
        await msg.channel.send(msgQueue);
    }
}