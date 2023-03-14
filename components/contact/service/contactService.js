const Contact = require("../../../view/contact");
const userDB = require("../../../db")

var createContact = (userId,name) => {
    console.log(userId)
    console.log(userDB)
    if(typeof userDB[userId] !== 'undefined'){
        var id = Contact.createContact(userId,name);
        return "Contact Created  |  " + id
    }else{
        throw new Error("Error: User not found!!")
    }
}

module.exports = {createContact}