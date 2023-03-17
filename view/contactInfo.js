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

  static async updateUserContactInfo(tran, contactId, contcatInfoId, Obj) {
    console.log("updateUserContactInfo");
    console.log(JSON.stringify(Obj, null, " "));

    var arr = await db.contactinfo.update(
      Obj,
      {
        where: {
          conatctId: contactId,
          id: contcatInfoId,
        },
      },
      { transaction: tran }
    );
    return arr;
  }

  static async deleteUserContactInfo(tran, contcatInfoId) {
    var arr = await db.contactinfo.destroy(
      {
        where: {
          id: contcatInfoId,
        },
      },
      { transaction: tran }
    );

    return arr;
  }

  static async deleteUserContactInfoUsingContactId(tran, conatctId) {
    var arr = await db.contactinfo.destroy(
      {
        where: {
          conatctId: conatctId,
        },
      },
      { transaction: tran }
    );

    return arr;
  }
}

module.exports = contactInfo;
