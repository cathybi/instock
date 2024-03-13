const express = require("express");
const router = express.Router();

const warehouseControllers = require("../controllers/warehouseControllers");

router.route("/").post(warehouseControllers.add);

router.route("/:id").patch(warehouseControllers.update);

module.exports = router;