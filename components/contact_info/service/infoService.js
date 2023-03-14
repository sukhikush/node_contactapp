const contactInfo = require("../../../view/contactInfo");
const userDB = require("../../../db")

var createContactInfo = (userId,contactId,Ctype,Cdata) => {
    if(typeof userDB[userId] !== 'undefined' && typeof userDB[userId].contact[contactId] !== 'undefined'){
        contactInfo.contactInfo(userId,contactId,Ctype,Cdata);
        return "Contact Info Created"
    }else{
        throw new Error("Error: Incorrect id!!")
    }
}

module.exports = {createContactInfo}