module.exports = class TimeCommand {
  constructor(client) {
    this.client = client;
    this.name = 'time';
    this.description = 'Display how long the bot has been playing in a channel';
  }

  async run(msg) {
    const connection = await this.connections.get(msg.guild.id);
    if (!connection) return msg.reply('Radio is not connected');

    return msg.reply(this.timeString(connection.dispatcher.totalStreamTime / 1000));
  }

  timeString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    
    return `${hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
  }

  get connections() {
    return this.client.commands.get('JoinCommand').connections;
  }
}