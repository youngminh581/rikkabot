module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(client, message, args) {
		message.channel.send(`**Ping: ${client.ws.ping}ms**`);
	},
};