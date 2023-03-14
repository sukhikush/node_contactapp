var userDB = require("../db");
var uuid = require("uuid");

class contactInfo {
    constructor(Ctype,Cdata){
        this.contactInfoId = uuid.v4()
        this.conatctInfoType = Ctype 
        this.conatctInfoData = Cdata
    }

    static contactInfo (userId,contactId,Ctype,Cdata) {
        const newCont = new contactInfo(Ctype,Cdata)
        console.log("==============")
        console.log(JSON.stringify(userDB,null, " "))
        userDB[userId].contact[contactId].contact_info[newCont.contactInfoId] = newCont
        
        console.log("==============")
        console.log(JSON.stringify(userDB,null, " "))
        
        return newCont.contactInfoId;
    }
}

module.exports = contactInfo