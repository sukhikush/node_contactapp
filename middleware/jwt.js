const jwt = require("jsonwebtoken");
const { unauthorizeAcess } = require("../error");

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

          console.log(decode, "--------&&", process.env.JWT);
          const payload = jwt.verify(decode, process.env.JWT);
          console.log(payload);
          next();
        } catch (err) {
          console.log("rrrrr=====rrr");
          next(new unauthorizeAcess("hjdhj"));
        }
      }
    };
  }
}

module.exports = JwtToken;
