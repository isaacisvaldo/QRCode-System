const cron = require('node-cron');
const BD = require('../database/database')
const bcrypt = require('bcryptjs');


const email = process.env.EMAIL_ADMIN || "isaacisvaldobunga300@gmail.com";
const user =process.env.USER_ADMIN  ||'isvaldo';
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
   const admin = await BD("admin").insert({ image_admin:'user.png', username_admin:'isvaldo', nome_admin:'Isaac Isvaldo Bunga', email_admin:'isaacisvaldobunga300@gmail.com', telefone_admin:'930333042', senha_admin})
   console.log('Administrador Cadastrado !');
    console.log(admin)
}
});
    