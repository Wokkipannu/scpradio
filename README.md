# SCP Radio
A Discord bot that has only one purpose. To play the [SCP Radio song](https://www.youtube.com/watch?v=gjQHPblDtd8) and few other radio voice lines that are found in SCP: Containment Breach.

# Why?
Because why not.

# Requirements and installation
- Node.js 6.0.0 or newer

- Clone repository
- Run `npm install`
- Create `config.json` in the root directory and paste the following.
```
{
  "TOKEN": "YOUR-TOKEN-HERE"
}
```
- Get your [Discord bot token](https://discordapp.com/developers/applications/)
- Replace "YOUR-TOKEN-HERE" with your bots token.
- Download [SCP Containment Breach](http://www.scpcbgame.com/) extract it and locate the sounds in `SFX/Radio` and copy every `scpradio` sound to the bots `sounds` folder. Alternatively use your own sounds and replace the soundsQueue in `scp.js`.
- `npm start`

# Usage
- .scp join - Starts playing in your current voice channel
- .scp leave - Leaves channel and stops playing