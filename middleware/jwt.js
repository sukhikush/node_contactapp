const jwt = require("jsonwebtoken");
const { unauthorizeAcess } = require("../error");
const Users = require("../view/user");

class JwtToken {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  generateToken() {
    console.log("Generating JWT token");
    console.log(JSON.stringify(this));
    var token = jwt.sign(JSON.stringify(this), process.env.JWT);
    return token;
  }

  static verifyToken(nonGaurdedRoute) {
    return async (req, res, next) => {
      console.log("Verifying JWT token");
      if (nonGaurdedRoute.indexOf(req.originalUrl) > -1) {
        //nonGaurdedRoute
        next();
      } else {
        try {
          const decode = req.cookies["authorization"];
          if (!decode) {
            console.log("No authorization cookie found");
            throw new unauthorizedError("No authorization cookie found");
          }

          const payload = jwt.verify(decode, process.env.JWT);
          console.log(payload);
          res.locals.sessionUserName = payload.name;
          res.locals.sessionUserEmail = payload.email;
          await JwtToken.fetachSessionUserId(req, res, next);
          next();
        } catch (err) {
          next(new unauthorizeAcess(err));
        }
      }
    };
  }

  static userSpecificRoutes(routeMap) {
    return (req, res, next) => {
      for (let x in routeMap) {
        console.log(x);
        console.log(routeMap[x]);
        if (routeMap[x].indexOf(req.originalUrl) > -1) {
          if (x != res.locals.sessionUserName) {
            throw new unauthorizeAcess("unauthorizeAcess - Route Acess");
          }
        }
      }
      next();
    };
  }

  static async fetachSessionUserId(req, res, next) {
    try {
      var user = await Users.findUsers({
        userName: res.locals.sessionUserName,
        userEmail: res.locals.sessionUserEmail,
      });

      if (!!user && !!user.id) {
        console.log("user valid", user.id);
        res.locals.sessionUserId = user.id;
      } else {
        console.log("User id not found");
        throw new unauthorizeAcess("unauthorizeAcess - Please login again");
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JwtToken;
