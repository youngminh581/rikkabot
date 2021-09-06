const fs = require('fs')
module.exports = {
    name: 'kicklog',
    aliases: ['kl',],
    description: 'View the kicklog',
    guildOnly : true,
    execute(client, msg,args) {
        const json = require('../../logs/kicklog.json');
        const count = Object.keys(json).length;
        if (!count) {return msg.reply('The log is empty')}
        msg.channel.send(`**Here is the log: **`)
        for (let i = 1;i <= count; i++)
        {
            msg.channel.send(`**User : ${json[i].user}, Date : ${json[i].date}**`)
        }
    }
}