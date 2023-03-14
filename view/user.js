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

var userDB = require("../db");
var uuid = require("uuid");

class Users {
  constructor(name) {
    this.userId = uuid.v4();
    this.userName = name;
    this.contact = {};
  }

  static createUser(name) {
    const newUser = new Users(name);
    userDB[newUser.userId] = newUser;
    console.log(JSON.stringify(userDB, null, " "));
    return newUser.userId;
  }

  static getUser() {
    var arr = [];
    for (let y in userDB) {
      let { userId, userName } = userDB[y];
      arr.push({ userId, userName });
    }
    return arr;
  }

  static getUserId(id) {
    return userDB[id];
  }

  static getUserAll() {
    return userDB;
  }
}

module.exports = Users;
