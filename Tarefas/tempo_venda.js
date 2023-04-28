const cron = require('node-cron');
const BD = require('../config/database')


function updateDate(){
    console.log('Estou Radando em cada segundo')
   
}

module.exports = cron.schedule('* * /24 * * *', updateDate,{
schedule:false

});