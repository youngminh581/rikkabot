const fs = require('fs');
let arr = [];

module.exports = {
    name: 'kick',
    description: 'Kick a player',
    args: true,
    permissions: 'KICK_MEMBERS',
    usage: '<user>',
    guildOnly: true,
    async execute(client, msg,args) {
        const taggedUser = msg.mentions.users.first();
        if (!msg.mentions.users.size) {
            return await msg.reply('**you need to tag a user in order to kick them!**');
        }
        await msg.channel.send(`**You wanted to kick ${taggedUser.username}**`);
        await msg.mentions.members.first().kick();

        //get the date
        let ts = Date.now();
        const date = new Date(ts);
        const kickedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

        const kickedMember = {
            user : taggedUser.username  ,
            date : kickedDate
        };

        //require the json
        const json = require('../../logs/kicklog.json');
        const length = Object.keys(json).length;
        json[length+1] = kickedMember;
        //write file
        fs.writeFile('./logs/kicklog.json',JSON.stringify(json), (err) => console.log(err))

    }
}