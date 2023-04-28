
const bcrypt = require('bcryptjs');
const axios = require("axios");


class ClienteController {


async index(req, res) {


      res.render('login')
    } catch(error) {
        res.json({ erro: "Ocorreu um problema" });
        console.log(error)
    }

}
module.exports = new ClienteController();