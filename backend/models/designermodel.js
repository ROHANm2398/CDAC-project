const mongoose = require("mongoose");
const designerSchema = new mongoose.Schema({
    designerId:{
        type:Number,
        required:[true,"Please enter the ID"],
    },
    name:{
        type:String,
        required:[true,"Please enter designer Name"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please enter Password"],
        minLength:[4,"Password cannot be small then 4 characters"],
        maxLength:[6,"Password cannot exceed 6 characters"]
    },
    emailId:{
        type:String,
        required:[true,"Please enter designer EmailId"]
    },
    phone:{
        type:Number,
        required:[true,"Please enter designer's Phone Number"],
        minLength:[10,"Phone Number cannot be small then 10 Digits"],
        maxLength:[10,"Phone Number cannot exceed 10 Digits"]
    },
    address:{
        type:String,
        required:[true,"Please enter designer's Address"]
    },
    qualification:{
        type:String,
        required:[true,"Please enter designer's Qualifications"]
    },
    specialization:{
        type:String,
        required:[true,"Please enter designer's Specialization"]
    },
    Experience:{
        type:Number,
        required:[true,"Please enter designer's Experience"]
    },

    identityProof:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    rating:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,"Please enter the Designer Category"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    sampleProductImage:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})


module.exports = mongoose.model("Designer",designerSchema);