const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cors =require("cors")
const  route = require('./routes/routes');
const script = require('./script/script')
//Models
const BD = require('./database/database')
const port = process.env.PORT || 3000;
// Fim Models
// View engine
app.set('view engine','ejs');
//Sessions
app.use(session({
    secret: "qualquercoisaparaaumentaraseguranç@", cookie: { maxAge: 80000000 },
    saveUninitialized:true,
    resave:true
}))
app.use(flash());
// Static
app.use(express.static('public'));
//Body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/",route);
app.use(cors());
// Database
app.use(function  (req,res,next){
    res.render('error/404')
}) 

app.listen(port, function (erro) {
    if (erro) {
        console.log(erro);
    } else {
       
        console.log("Servidor iniciado com sucesso! porta:"+port);
    }
})