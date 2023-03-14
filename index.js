const express = require("express");
const route = require("./components");
const app = express();

app.use(express.json());
app.use(
  "/api/v1/",
  (req, res, next) => {
    next();
  },
  route
);

try {
  const PORT = process.env.PORT || 4000;
  // await dbConnection()
  app.listen(PORT, console.log(`Server started at port ${PORT}`));
} catch (error) {
  console.error(error);
}
