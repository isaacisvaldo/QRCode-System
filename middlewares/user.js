function Cliente(req, res, next){
     if(req.session.user != undefined ||req.session.admin != undefined){
        next()
    }else{
        res.redirect("/form_login");
    }
 }
 
 module.exports = Cliente