module.exports = {
    name: 'skip',
    aliases: ['s',],
    description:'Skip a song',
    async execute(client, msg, args) {
        const distube = client.distube;
        const queue = client.distube.getQueue(msg);
        if (distube.isPlaying(msg)) 
        {
            await distube.skip(msg)
            await msg.channel.send('**SKIPPED!!!**');
            if(!queue) distube.stop();
            
        }
        else {
            msg.channel.send(`**Nothing is playing ==! **`);
        }
    }
}