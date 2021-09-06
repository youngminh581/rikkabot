module.exports = {
    name: 'swep',
    description:'Delete amount of messages',
    permissions: ['MANAGE_MESSAGES'],
    execute(client, msg, args) {
        const amount = parseInt(args[0]);
        if (isNaN(amount)) return msg.reply('Please type a valid number');
        else if (amount < 2 || amount > 100) {
            return  msg.reply('You need to input a number between 2 and 100');
        } 
        else msg.channel.bulkDelete(amount);
    }
}