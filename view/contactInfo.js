var { userDB } = require("../db");
var uuid = require("uuid");
var db = require("../models");
class contactInfo {
  constructor(Ctype, Cdata) {
    this.contactInfoId = uuid.v4();
    this.conatctInfoType = Ctype;
    this.conatctInfoData = Cdata;
  }

  static async contactInfo(userId, contactId, Ctype, Cdata) {
    var status = await db.contactinfo.create({
      conatctInfoType: Ctype,
      conatctInfoData: Cdata,
      conatctId: contactId,
    });

    if (!!status && !!status.id) {
      return status.id;
    } else {
      throw new Error("Error in creating contact");
    }
  }
}

module.exports = contactInfo;
