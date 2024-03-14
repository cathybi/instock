const express = require("express");
const router = express.Router();

const warehouseControllers = require("../controllers/warehouseControllers");

router.route("/").post(warehouseControllers.add);

router.route("/:id").patch(warehouseControllers.update);

router.route('/:id/inventories').get(warehouseControllers.getInventoryListByWarehouseId);

module.exports = router;