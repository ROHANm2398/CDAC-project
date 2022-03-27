//to allow only those users to access the functions who have   logged in on the website
const ErrorHandler = require("../utils/errorhandler");
const cookies = require("cookie-parser");
const bodyparser = require('body-parser');
const catchAsyncError = require ("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
        const {token}  = req.cookies;
        //console.log(token);
       // console.log('token: ', token)
       if(!token){
           return next(new ErrorHandler("please login to access this resource", 401));


       }
       const decodedData = jwt.verify(token,process.env.JWT_SECRET);
       req.user = await User.findById(decodedData.id);
       next();

});

exports.authorizeRoles = (...roles) => {
    return (req,res,next)=>{
          
        if(!roles.includes(req.user.role)){
          return next(
                new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resource`,403
                )
            );
        };
        next();

    };
};
