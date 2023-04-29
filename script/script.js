const cron = require('node-cron');
const BD = require('../config/database')

cron.schedule('* * * * * *', () => {
    console.log('Rodar em Cada minuto');
});
    