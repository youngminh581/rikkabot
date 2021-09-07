

module.exports = {
    name: 'play',
    aliases: ['p',],
    args: true,
    usage: '<link> or <name>',
    description:'Play a song',
    async execute(client, msg, args) {
        const distube = client.distube;

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