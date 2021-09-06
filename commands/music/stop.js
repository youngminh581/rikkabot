module.exports = {
    name: 'stop',
    aliases: ['',],
    description:'stop a song',
    async execute(client, msg, args) {
        const distube = client.distube;
        if (distube.isPlaying(msg)) 
        {
            await distube.stop(msg)
            await msg.channel.send('**STOPPED!**');
        }
        else {
            msg.channel.send(`**Nothing is playing ==! **`);
        }
    }
}