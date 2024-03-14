const express = require("express");
const router = express.Router();
const inventoriesController = require('../controllers/inventoriesControler');

// Get the list of inventories
router.route('/').get(inventoriesController.getInventoriesList);

//GET a Single Inventory Item
router.route('/:id').get(inventoriesController.getSingleInventory);

module.exports = router;