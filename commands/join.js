const ytdl = require('ytdl-core-discord');

module.exports = class JoinCommand {
  constructor(client) {
    this.client = client;
    this.name = 'join';
    this.description = 'Join a channel and start playing';
    this.connections = new Map();
  }

  run(msg) {
    if (msg.member.voiceChannel) {
      if (this.connections.get(msg.guild.id)) return msg.reply('Connection already exists, cannot start a new one');
      msg.member.voiceChannel.join()
        .then(connection => {
          this.connections.set(msg.guild.id, connection);
          this.play(msg);
        });
    }
    else {
      return msg.reply('Join a voice channel first');
    }
  }

  async play(msg) {
    try {
      let connection = this.connections.get(msg.guild.id);
      if (!connection) {
        this.connections.delete(msg.guild.id);
        return console.error('Tried to play without a connection, deleting connection');
      }

      try {
        const dispatcher = connection.playOpusStream(await ytdl('https://www.youtube.com/watch?v=SuKH17fNTEY'), { volume: 0.1 })
          .on('end', reason => {
            if (reason === 'leavecmd') return;
            this.play(msg);
          })
          .on('error', error => {
            console.error('Dispatcher error', error);
          });
      }
      catch(error) {
        console.error('Play function error', error);
      }
    }
    catch(error) {
      this.connections.delete(msg.guild.id);
      console.error('Failed to get connection', error);
    }
  }
}