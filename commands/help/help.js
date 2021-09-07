const {PREFIX} = require('../../config.json');
module.exports = {
    name: 'help',
    description: 'Help',
    execute(client, msg, args) {
        const data = [];
        const {commands} = client;


        //if there is no arguments, show the commands list
        if (!args.length) {
            data.push('**Here\'s a list of all my commands:**');
            commands.map((command)=> {
              data.push(`- ${command.name}: __${command.description}__.`)
              });
            data.push(`\n**You can send \`${PREFIX}help [command name]\` to get info on a specific command!**`);
            return msg.channel.send(data, { split: true })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return msg.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${PREFIX}${command.name} ${command.usage}`);
        else {
          data.push(`**Usage:** ${PREFIX}${command.name}`);
        }


        msg.channel.send(data, { split: true });
            }
        }