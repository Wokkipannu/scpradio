const ytdl = require('ytdl-core-discord');

module.exports = class JoinCommand {
  constructor(client) {
    this.client = client;
    this.name = 'join';
    this.description = 'Join a channel and start playing';
    this.connections = new Map();
    this.radioSongURL = 'https://www.youtube.com/watch?v=SuKH17fNTEY';
  }

  async run(msg, args) {
    let voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {
      if (args[0]) {
        voiceChannel = msg.guild.channels.find(ch => ch.id === args[0]);
        if (!voiceChannel) return msg.reply('No voice channel found with the given ID');
      }
      else {
        return msg.reply('Connect to a voice channel to use the command');
      }
    }

    await voiceChannel.join()
      .then(connection => {
        this.connections.set(msg.guild.id, connection);
        this.play(msg);
      });
  }

  async play(msg) {
    let connection = await this.connections.get(msg.guild.id);
    if (!connection) {
      await this.connections.delete(msg.guild.id);
      return console.log('Connection no longer exists. Deleting it.');
    }

    const dispatcher = await connection.play(await ytdl(this.radioSongURL), { type: 'opus', volume: 0.1 })
      .on('end', reason => {
        if (reason === 'leavecmd') return;
        this.play(msg);
      })
      .on('error', error => {
        console.log('Dispatcher error', error);
      });
  }
}