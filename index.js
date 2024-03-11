const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { config } = require('dotenv');
const numeral = require('numeral');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds
    ],
});
config();
const api = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${process.env.CHANNEL}&key=${process.env.KEY}`;
client.on('ready', () => {
    client.user.setActivity({
        name: "",
        url: "",
        type: ActivityType.Streaming
    });
    console.log(`${client.user.username} has logged in!`);
});
setInterval(async () => {
    const data = await fetch(api);
    data.json().then((x) => {
        const subscriberCount = numeral(x.items[0].statistics.subscriberCount).format('0.00a');
        client.channels.cache.get(process.env.DISCORDCHANNEL).setName(`📺｜Sub Count: ${subscriberCount}`);
    });
}, process.env.TIMER);
client.login(process.env.TOKEN);