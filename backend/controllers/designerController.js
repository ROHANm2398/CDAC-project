const Designer = require("../models/designerModel");
const errorhandler = require("../utils/errorhandler");
const catchAsyncErrors =require("../middleware/catchAsyncErrors");


//Create Designer --ADMIN
exports.createDesigner = catchAsyncErrors( async(req,res,next)=>{ 
    const designer= await Designer.create(req.body);

res.status(200).json({
    success:true,
    designer,
});
});


  


//Get ALL DESIGNERS
exports.getAllDesigners = catchAsyncErrors (async(req,res)=>{


    const designers = await Designer.find();

    res.status(201).json({
        success:true,
        designers,
    });
    
});
//update designer (admin route)
exports.updateDesigner=catchAsyncErrors (async(req,res,next)=>{
    let designer=await Designer.findById(req.params.id)
    // if(!designer){
    //     return Body.status(500).json({
    //         success:false,
    //         message:"designer not found"

    //     })
       
    // }
    if(!designer){
        return next(new errorhandler("Designer Not Found",404));
    }
    designer=await Designer.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true,
        useFindAndModify:false})
        res.status(200).json({
            success:true,
            designer
        });
});
//delete designer
exports.deleteDesigner=catchAsyncErrors (async(req,res,next)=>{
const designer=await Designer.findById(req.params.id);
// if(!designer){
//     return res.status(500).json({
//     success:false,
//     message:"designer not found"

// })
// }
if(!designer){
    return next(new errorhandler("Designer Not Found",404));
}
await designer.remove();
res.status(200).json({
    success:true,
    message:"designer removed succesfully from the website"
});
});
//get designer details
exports.getDesignerDetails= catchAsyncErrors (async(req,res,next)=>{
    const designer = await Designer.findById(req.params.id);
    // if(!designer){
    //     //this is a callback function
    //     return next(new errorhandler("product not found", 404));
    // }
    if(!designer){
        return next(new errorhandler("Designer Not Found",404));
    }
    res.status(200).json({
        success:true,
       // message:"Designer deleted succesfully"
       designer,
    });
});