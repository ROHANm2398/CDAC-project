const ErrorHandler = require("../utils/errorhandler");

const catchAsyncError = require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require ("../utils/sendEmail")
//Register a user
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const{name,emailId,password}=req.body;
    const user=await User.create({
        name,emailId,password,
        avatar:{
            public_id:"this is a sample id url",
            url:"profilepicUrl"
        }
    });
    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success:true,
    //     token,

    // });
    sendToken(user,201,res);

});

//login user
exports.loginUser  = catchAsyncError(async(req,res,next)=>{
    const {emailId,password} = req.body;
    //checking ifuser has given password and email both
    if(!emailId || !password){
        return next(new ErrorHandler("please enter both email and password",400))

    }
    const user= await User.findOne({emailId : emailId}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or  password",401));

    }
    const isPasswordMatched = user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or  password",401));

    }
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success:true,
    //     token,
    sendToken(user,200,res);


    });
    //logout user
     exports.logout = catchAsyncError(async (req,res,next)=>{
        res.cookie("token" ,null,{
            expires  : new Date(Date.now()),
            httpOnly :true,
        })

         res.status(200).json({
         success :  true,
         message : "logged out"

     });

 });
 //forgot password logic

 exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
     const user=await User.findOne({emailId:req.body.emailId});

     if(!user){
         return next(new ErrorHandler("user not found",404))
     }

     //get reset password token
     const resetToken = user.getPasswordToken();

     await user.save({valiateBeforeSave:false});

     const resetPasswordUrl = `${request.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
     const message =`your password reset token is:- \n\n ${resetPasswordUrl} \n\n if  you have not requested this email then please ignore it`;


     try{
         await sendEmail({
            emailId : user.emailId,
            subject : `Graphic designers hub password recovery mail`,
            message,

         });
         res.status(200).json({
             success:true,
             message : `Email sent to user ${user.emailId} succesfully`,

         })


     }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({valiateBeforeSave:false});
        return next( new ErrorHandler(error.message,500));


     }

 });
 