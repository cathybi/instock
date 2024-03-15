const express = require("express");
const router = express.Router();
const inventoriesController = require('../controllers/inventoriesControler');

// Get the list of inventories
router.route('/').get(inventoriesController.getInventoriesList);

//GET a Single Inventory Item
router.route('/:id').get(inventoriesController.getSingleInventory);

//EDIT/PUT a Single Inventory Item
router.route('/:id').put(inventoriesController.editSingleInventory);

module.exports = router;