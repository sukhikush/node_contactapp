const {createContactInfo:contactInfoService} = require("../service/infoService")

const createInfoContact = (req,res,next) => {
    try{
        var {userId,contactId,Ctype,Cdata} = req.body;
        if (!!userId && !!contactId && !!Ctype && !!Cdata){
            var result = contactInfoService(userId,contactId,Ctype,Cdata);
            res.send(result);
        }else{
            res.status(400)
            res.send("Name & id cannot be blank")
        }
    }catch(err){
        res.status(500)
        res.send(err.message)
    }
}

module.exports = createInfoContact