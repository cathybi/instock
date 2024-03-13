const express = require("express");
const router = express.Router();

const warehouseControllers = require("../controller/warehouseControllers");


router.route("/").post(warehouseControllers.add);

router.route("/:id").patch(warehouseControllers.update);


/* this part used for test router working only!
 router.get("/warehouse",(req,res)=>{
    res.send("successfully connected to router!")
 })
this part used for test router working only!*/


module.exports = router;