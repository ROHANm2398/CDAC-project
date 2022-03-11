const express = require("express");
const app = express();
const errormiddleware=require("./middleware/error");

app.use(express.json());

//Route imports
const designer = require("./routes/designerRoute");

app.use("/api/v1",designer);
//middleware for error
app.use(errormiddleware);


module.exports = app;
