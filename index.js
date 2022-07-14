//Loads the express module
const express = require("express");
const path = require("path")
require("dotenv").config();

//Creates our express server
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

//Loads the handlebars module
const { engine } = require("express-handlebars");

//Sets our app to use the handlebars engine
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    //new configuration parameter
    extname: "hbs",
    // defaultlayout
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials/",
  })
);

//Serves static files (
app.use(express.static("public"));

// loading routers
const routes = require("./server/routes/user");
app.use("/", routes);

app.listen(port, () => {
  console.log(`The web server has started on port ${port}`);
});
