require("dotenv").config();
const express = require("express");
const route = require("./components");
const cookieParser = require("cookie-parser");
const JwtToken = require("./middleware/jwt");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();

var nonGaurdedRoute = ["/api/v1/user/login"];

var userRouteAcess = {
  admin: ["/api/v1/user/create", "/api/v1/user/getAll"],
};

app.use(express.json());

app.use("/", (req, res, next) => {
  next();
});

app.use(cookieParser());

app.use(
  "/api/v1/user/",
  JwtToken.verifyToken(nonGaurdedRoute),
  JwtToken.userSpecificRoutes(userRouteAcess),
  route
);

app.use(errorHandlerMiddleware);

app.use("*", (req, res, next) => {
  res.status(404).json({
    err: "Page Not Found",
  });
});

try {
  const PORT = process.env.PORT || 4000;
  // await dbConnection()
  app.listen(PORT, console.log(`Server started at port ${PORT}`));
} catch (error) {
  console.error(error);
}
