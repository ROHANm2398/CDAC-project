const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require('body-parser');
const errorMiddleware = require("./middleware/error")
app.use(express.json());
//app.use(cookieParser());
app.use(cookieParser())



/*assuming an express app is declared here*/
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//Route imports
const designer = require("./routes/designerRoute");
const user=require("./routes/userRoutes");

app.use("/api/v1",designer);
app.use("/api/v1",user);

//MiddleWare For Error
app.use(errorMiddleware);

module.exports = app