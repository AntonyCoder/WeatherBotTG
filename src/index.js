const { Telegraf } = require('telegraf')
const axios = require('axios');

const bot = new Telegraf('7385744401:AAER1duO2BivsffNWNxxSEBUNTtzzGXjgsI')
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async (ctx) => {
    if (ctx.message.location) {
        console.log(ctx.message);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=60401e3cee410f3ff6686b571834aa16`;
        const response = await axios.get(url);
        console.log(response);
    }
    console.log(ctx.message);
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))