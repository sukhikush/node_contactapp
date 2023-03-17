var { userDB } = require("../db");
var uuid = require("uuid");
var db = require("../models");

class contact {
  constructor(name) {
    this.contactId = uuid.v4();
    this.conatctName = name;
    this.contact_info = {};
  }

  static async createContact(userId, contactName) {
    var status = await db.contact.create({
      conatctName: contactName,
      userId: userId,
    });

    if (!!status && !!status.id) {
      return status.id;
    } else {
      throw new Error("Error in creating contact");
    }
  }

  static async findContactByUserId(userId, conatctId) {
    var arr = await db.contact.findOne({
      where: { id: conatctId, user_id: userId },
    });
    return arr;
  }

  static async updateUserContact(tran, userid, contactId, name) {
    var arr = await db.contact.update(
      { conatctName: name },
      {
        where: {
          userId: userid,
          id: contactId,
        },
      },
      { transaction: tran }
    );
    return arr;
  }

  static async deleteUserContact(tran, contcatId) {
    var arr = await db.contact.destroy(
      {
        where: {
          id: contcatId,
        },
      },
      { transaction: tran }
    );

    return arr;
  }
}

module.exports = contact;
