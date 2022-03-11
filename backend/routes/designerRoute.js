const express = require("express");
const { getAllDesigners,createDesigner, updateDesigner,deleteDesigner,getDesignerDetails } = require("../controllers/designerController");
const router = express.Router();

router.route("/designers").get(getAllDesigners);
router.route("/designer/new").post(createDesigner);
router.route("/designer/:id").put(updateDesigner).delete(deleteDesigner).get(getDesignerDetails);


module.exports = router
