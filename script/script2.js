const cron = require('node-cron');
const BD = require('../database/database')
const bcrypt = require('bcryptjs');


const email = "isabel@gmail.com";
const user = 'isabel';
    const senha = '12345678';
    var salt = bcrypt.genSaltSync(10);
    var senha_admin = bcrypt.hashSync(senha, salt);

cron.schedule('* * * * *',  async() => {
    
    const admin = await BD("admin")
    .where("email_admin", email)
    .orWhere("username_admin", user)
    .first();

if(admin){
    console.log('Encontrei o Admin');

}else{
   const admin = await BD("admin").insert({ image_admin:'user.png', username_admin:user, nome_admin:'Isabel Germano', email_admin:email, telefone_admin:'930333042', senha_admin})
   console.log('Administrador Cadastrado !');
    console.log(admin)
}
});
    