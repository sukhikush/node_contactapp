const {createContact:contactService} = require("../service/contactService")

const createContact = (req,res,next) => {
    try{
        var {id,name} = req.body;
        if (!!name && !!id){
            var result = contactService(id,name);
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

module.exports = createContact