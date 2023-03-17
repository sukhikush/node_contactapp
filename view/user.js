/*
const users = {
    "1":{
        "id" : "1",
        "name":"Sukhi"
        contact:{
            101 : {
                conatctId : "101"
                "name":"Sukhi 1"
                conatact_info:{
                    "type":"home"
                    "number":12345657
                }
            }
        }
    }
}
*/

var { userDB } = require("../db");
var uuid = require("uuid");
var db = require("../models");
const contact = require("../models/contact");

class Users {
  constructor(name, pass, email) {
    this.userId = uuid.v4();
    this.userName = name;
    this.userPass = pass;
    this.userEmail = email;
    this.contact = {};
  }

  async createUser() {
    // userDB[this.userId] = this;
    // console.log(JSON.stringify(userDB, null, " "));
    var status = await db.user.create({
      userName: this.userName,
      userPass: this.userPass,
      userEmail: this.userEmail,
    });
    if (!!status && !!status.id) {
      return status.id;
    } else {
      throw new Error("Error in creating user");
    }
  }

  static async getUser() {
    var arr = await db.user.findAll({
      attributes: ["id", "userName"],
    });
    return arr;
  }

  static async getUserId(id) {
    var arr = await db.user.findOne({
      where: { id: id },
      include: [
        {
          model: db.contact,
          attributes: ["conatctName", "id"],
          include: [
            {
              model: db.contactinfo,
              attributes: ["conatctInfoType", "conatctInfoData"],
            },
          ],
        },
      ],
    });
    return arr;
  }

  static async getUserAll() {
    var arr = await db.user.findAll({
      include: [
        {
          model: db.contact,
          attributes: ["conatctName", "id"],
          include: [
            {
              model: db.contactinfo,
              attributes: ["conatctInfoType", "conatctInfoData"],
            },
          ],
        },
      ],
    });
    return arr;
  }

  static async findUsers(obj) {
    var arr = await db.user.findOne({
      where: { userName: obj.userName, userEmail: obj.userEmail },
    });
    return arr;
  }

  static async findUsersId(id) {
    var arr = await db.user.findOne({
      where: { id: id },
    });
    return arr;
  }
}

module.exports = Users;
