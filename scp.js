const Discord = require('discord.js');
const ytdl = require('ytdl-core-discord');

const client = new Discord.Client();

const { TOKEN } = require('./config')

client.login(TOKEN);

const songURL = 'https://www.youtube.com/watch?v=gjQHPblDtd8';
let savedConnection;
let voiceChannel;
let dispatcher;

client.on('ready', () => {
  console.log('Ready to play some tunes!');
});

client.on('message', message => {
  if (message.content.startsWith(".scp")) {
    if (message.content === '.scp join') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            savedConnection = connection;
            voiceChannel = message.member.voiceChannel;
            play(connection, songURL);
          });
      }
    }
    if (message.content === '.scp leave') {
      if (voiceChannel) {
        voiceChannel.leave();
        dispatcher.end('Leaving channel on command');
      }
    }
  }
});

async function play(connection, url) {
  try {
    dispatcher = connection.playOpusStream(await ytdl(url))
      .on('end', reason => {
        console.log('We ended, starting again! (Or maybe some cruel person stopped us!', reason);
        play(savedConnection, songURL);

      })
      .on('error', error => {
        console.error('Stream died', error);
      });
    dispatcher.setVolume(0.5); // Change volume to half so we don't kill any ears
  }
  catch(error) {

  }
}