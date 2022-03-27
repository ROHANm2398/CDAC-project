const Designer = require("../models/designerModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


//Create Designer --ADMIN
exports.createDesigner = catchAsyncError(async (req,res,next)=>{
    req.body .user = req.user.id;

    const designer = await Designer.create(req.body);

    res.status(201).json({
        success:true,
        designer
    });
});



//Get ALL DESIGNERS
exports.getAllDesigners = catchAsyncError(async(req,res)=>{

    //pagination
    const resultPerPage = 5;
    const designerCount = await Designer.countDocuments();

    const apiFeature = new ApiFeatures(Designer.find(),req.query).search().filter().pagination(resultPerPage);
    const designers = await apiFeature.query;

    res.status(201).json({
        success:true,
        designers
    });
    
});


//Update the Designer --Admin
exports.updateDesigner = catchAsyncError(async (req,res,next)=>{

    let designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    designer = await Designer.findByIdAndUpdate(req.params.id,req.body,{
        new:true,runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        designer
    });
});


//Delete Designer
exports.deleteDesigner = catchAsyncError(async(req,res,next)=>{

    const designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    await designer.remove();

    res.status(200).json({
        success:true,
        message:"Designer Deleted Successfully"
    });
});


//Get Single Designer Details
exports.getDesignerDetails = catchAsyncError(async(req,res,next)=>{

    const designer = await Designer.findById(req.params.id);

    if(!designer){
        return next(new ErrorHandler("Designer Not Found",404));
    }

    res.status(200).json({
        success:true,
        designer,
         designerCount,
    });
});

