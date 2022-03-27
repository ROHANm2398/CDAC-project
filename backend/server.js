const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Uncaught Exception`);
    process.exit(1);
})



//Config
dotenv.config({path:"backend/config/config.env"});

//connectin to database
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`)
});




//UnHandled Promise Rejection
//for mongod worng connectionstring
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down this Server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});