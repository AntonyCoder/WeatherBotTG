const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async (ctx) => {
    if (ctx.message.location) {
        console.log(ctx.message.location);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=60401e3cee410f3ff6686b571834aa16`;
        const response = await axios.get(url);
        console.log(response);
        const weatherData = response.data;
        const temp = (weatherData.main.temp - 273.15).toFixed(2);
        const weatherDescription = weatherData.weather[0].description;
        ctx.reply(`Текущая температура: ${temp}°C\nПогодные условия: ${weatherDescription}\nМестоположение: ${weatherData.name}`);
    } else {
        ctx.reply('Пожалуйста отправьте свою геопозицию чтобы я мог узнать погоду');
        console.log(ctx.message);
    }
});
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))