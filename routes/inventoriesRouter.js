const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventoriesControler");

// Get the list of inventories
router
  .route("/")
  .get(inventoriesController.getInventoriesList)
  .post(inventoriesController.addNewInventory); //create new inentory item

//GET a Single Inventory Item
router.route("/:id").get(inventoriesController.getSingleInventory);

//EDIT/PUT a Single Inventory Item
router.route("/:id").put(inventoriesController.editSingleInventory);

//DELETE an Inventory Item
router.route("/:id").delete(inventoriesController.deleteSingleInventory);

module.exports = router;
