const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const Distube = require('distube');
client.distube = new Distube(client);

//load folders then load command file from each folder
for (const folder of commandFolders){
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
}
}

//config
const {PREFIX, TOKEN} = require('./config.json');
client.login(TOKEN);

//


//distube events listeners
client.distube.on('playSong', (msg, queue, song) =>{
    msg.channel.send(`**Now playing "${song.name}"
Requested by: ${song.user}**`);
})

client.distube.on('empty', msg => {
    msg.channel.send(`**All users left, stop!**`);
});
client.distube.on('addSong', (msg, queue, song) => {
    msg.channel.send(`**"${song.name}" has been added to queue**`);
});

client.distube.on("finish", msg => msg.channel.send(`**No more song in queue**`));





client.on('ready', () => {
    console.log('Bot is readyy');

    //change the status of the bot
    client.user.setActivity('Hentai', {type: 'WATCHING'})
});

client.on('message', (msg) => {
    // if the message was from bot or not starting with the prefix, return
    if(!msg.content.startsWith(PREFIX) || msg.author.bot) return;

    //trim and split the prefix from the message
    const args = msg.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    //if there isn't a command, return
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (command.guildOnly && msg.channel.type == 'dm') return
    if (command.permissions){
        const authorPerms = msg.channel.permissionsFor(msg.author)
        if (!authorPerms || !authorPerms.has(command.permissions)) return msg.reply('You don\t have permissions to do this');
    
    }
    if (command.args && !args.length)
    {   // if the command required arg but u didn't provide, return a message
        let reply = `You didn't provide any arguments, sir`
        
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
        }

        return msg.channel.send(reply);
    }


    //execute command
    try {
        command.execute(client, msg, args);
    }
    catch(error) {
        console.error(error);
        msg.reply('Something goes wrong, please try again later');
    }
});