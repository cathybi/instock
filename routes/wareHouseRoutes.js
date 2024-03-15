const express = require("express");
const router = express.Router();
const warehouseControllers = require("../controllers/warehouseControllers");

/**
 * Get list of warehouse
 */
router.route("/").get(warehouseControllers.getAll);
/**
 * Add a single warehouse
 */
router.route("/").post(warehouseControllers.add);
/**
 * Update a single warehouse
 */
router.route("/:id").patch(warehouseControllers.update);

router.route("/:id").get(warehouseControllers.findOne);

router
  .route("/:id/inventories")
  .get(warehouseControllers.getInventoryListByWarehouseId);

//DELETE an warehouse Item
router.route('/:id').delete(warehouseControllers.deleteWarehouse);

module.exports = router;
