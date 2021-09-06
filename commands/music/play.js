

module.exports = {
    name: 'play',
    aliases: ['p',],
    description:'Play a song',
    async execute(client, msg, args) {
        const distube = client.distube;
        const queue = client.distube.getQueue(msg);
        const song = args.join(' ');
        if (!msg.member.voice.channel) {
            await msg.channel.send('**Join a voice channel firstttttt**');
        }

        else {
            if(!song) msg.reply('**Please enter song name or link to play**')
            try {
                await distube.play(msg,song);
            }
            catch (error) {
                console.log(error);
            }
        }
        
    }
}