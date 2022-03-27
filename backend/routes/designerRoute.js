const express = require("express");
const { getAllDesigners,createDesigner, updateDesigner, deleteDesigner,getDesignerDetails } = require("../controllers/designerController");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")
const cookies = require("cookie-parser");
const bodyparser = require('body-parser');


//getDesigners
router.route("/designers").get( getAllDesigners);
//router.route("/designers").get( isAuthenticatedUser , authorizeRoles ("admin"),getAllDesigners);
//designer-url
router.route("/designer/new")
.post(isAuthenticatedUser , authorizeRoles ("admin"),createDesigner);

//update designer
router.route("/designer/:id")
.put(isAuthenticatedUser , authorizeRoles ("admin"),updateDesigner)
.delete(isAuthenticatedUser , authorizeRoles ("admin") , deleteDesigner)
.get( getDesignerDetails);

module.exports = router