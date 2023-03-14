var userDB = require("../db");
var uuid = require("uuid");

class contact {
    constructor(name){
        this.contactId = uuid.v4()
        this.conatctName = name 
        this.contact_info= {}
    }

    static createContact (userId,contactName) {
        const newCont = new contact(contactName)
        userDB[userId].contact[newCont.contactId] = newCont
        console.log(JSON.stringify(userDB,null, " "))
        return userId + " - " + newCont.contactId;
    }
}

module.exports = contact