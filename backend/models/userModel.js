const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require ("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter  your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name must be atleast 4 characters"],

    },
    emailId:{
        type:String,
        required:[true,"please enter  your emailID"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter  your password"],
        maxLength:[15,"password cannot exceed 15 characters"],
        minLength:[8,"password must be atleast 8 characters"],
        select:false,

    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",


    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();

    }
    this.password = await bcrypt.hash(this.password,10);
})
//JWT token(store access rights in cookies so tha server can know that this user can access the content)
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};
//compare password
userSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password,this.password)
};

//generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generating token
    //crypto is an inbuilt method so no need to import in externally
    const resetToken = crypto.randomBytes(20).toString("hex");

    //ashing and adding t o userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire  = Date.now() + 15*60*1000;

    return resetToken;
    
    
}
module.exports=mongoose.model("User",userSchema);