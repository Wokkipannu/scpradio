module.exports = class LeaveCommand {
  constructor(client) {
    this.client = client;
    this.name = 'leave';
    this.description = 'Leave the channel and stop playing';
  }

  async run(msg) {
    const connection = await this.connections.get(msg.guild.id);
    if (!connection) return msg.reply('Radio is not connected');

    connection.dispatcher.end('leavecmd');
    connection.channel.leave();
    this.connections.delete(msg.guild.id);
    return msg.reply('Radio has left the facility');
  }

  get connections() {
    return this.client.commands.get('JoinCommand').connections;
  }
}