const express = require("express");
const router = express.Router();
const inventoriesController = require('../controllers/inventoriesControler');

/**
 * Get the list of inventories
 */
router.route('/').get(inventoriesController.getAll);

module.exports = router;