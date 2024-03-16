const knex = require("knex")(require("../knexfile"));

/**
 * Return all inventories in json format
 * @param {*} _req
 * @param {*} res
 */
const getInventoriesList = async (_req, res) => {
  try {
    const data = await knex('inventories')
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .select(
      'inventories.id as id',
      'warehouses.warehouse_name as warehouse_name',
      'inventories.item_name as item_name',
      'inventories.description as description',
      'inventories.category as category',
      'inventories.status as status',
      'inventories.quantity as quantity',
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Inventories: ${err}`,
    });
  }
};

/**
 * J24BTW-26: Back-End: API to GET a Single Inventory Item
 * @param {*} req
 * @param {*} res
 */
const getSingleInventory = async (req, res) => {
  try {
    const inventory = await knex('inventories')
    .where({ 'inventories.id': req.params.id })
    .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
    .select(
      'inventories.id as id',
      'warehouses.warehouse_name as warehouse_name',
      'inventories.item_name as item_name',
      'inventories.description as description',
      'inventories.category as category',
      'inventories.status as status',
      'inventories.quantity as quantity',
    );;
    if (inventory[0]) {
      res.status(200).json(inventory[0]);
    } else {
      res.status(404).send("Inventory Id is not found");
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Error in getting single Inventory:getSingleInventory() method: ${error}`
      );
  }
};

/**
 * J24BTW-29 : Back-End: API to PUT/EDIT an Inventory Item
 * @param {*} req
 * @param {*} res
 */
const editSingleInventory = async (req, res) => {
  try {
    //Response returns 400 if unsuccessful because of missing properties in the request body
    if (
      !req.body.id ||
      !req.body.warehouse_id ||
      !req.body.item_name ||
      !req.body.description ||
      !req.body.category ||
      !req.body.status ||
      !req.body.quantity
    ) {
      return res
        .status(400)
        .send("Please provide all information for the request");
    }

    //Response returns 400 if the quantity is not a number
    if (!(typeof req.body.quantity === "number")) {
      return res
        .status(400)
        .send(`Quantity is not a number for inventory id ${req.body.id}`);
    }

    //Response returns 400 if the warehouse_id value does not exist in the warehouses table
    const warehouseFound = await knex("warehouses").where({
      id: req.body.warehouse_id,
    });
    if (!warehouseFound[0]) {
      return res
        .status(400)
        .send(
          `The warehouse_id ${req.body.warehouse_id} does not exist in the warehouses table`
        );
    }

    //Response returns 404 if inventory ID is not found
    const inventoryFound = await knex("inventories").where({
      id: req.params.id,
    });
    if (!inventoryFound[0]) {
      return res
        .status(404)
        .send(
          `The inventory_id ${req.params.id} does not exist in the inventories table`
        );
    }

    const rowsUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);

    const updatedInventory = await knex("inventories").where({
      id: req.params.id,
    });

    res.status(200).json(updatedInventory[0]);
  } catch (error) {
    res
      .status(500)
      .send(
        `Error in updating Inventory for id :editSingleInventory() method: ${error}`
      );
  }
};

/**
 * J24BTW-30 : Back-End: API to DELETE an Inventory Item
 * @param {*} req
 * @param {*} res
 */
const deleteSingleInventory = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      //Response returns 404 if inventory ID is not found
      return res
        .status(404)
        .json({ message: `Inventory Id ${req.params.id} is not found` });
    }
    //Response returns 204 if successfully deleted
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Error in deleting  Inventory: ${error}` });
  }
};

/**
 * J24BTW-28: Back-End: API to POST/CREATE a New Inventory Item
 */
const addNewInventory = async (req, res) => {
  if (
    !req.body.id ||
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send("Please provide all information for the request");
  }

  const warehouseFound = await knex("warehouses").where({
    id: req.body.warehouse_id,
  });
  if (!warehouseFound[0]) {
    return res
      .status(400)
      .send(
        `The warehouse_id ${req.body.warehouse_id} does not exist in the warehouses table`
      );
  }

  if (!(typeof req.body.quantity === "number")) {
    return res
      .status(400)
      .send(`Quantity is not a number for inventory id ${req.body.id}`);
  }

  try {
    const result = await knex("inventories").insert(req.body);

    const newInventoryId = result[0];
    const createdWarehouse = await knex("invenorties").where({
      id: newInventoryId,
    });

    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory: ${error}`,
    });
  }
};

module.exports = {
  getInventoriesList,
  getSingleInventory,
  editSingleInventory,
  deleteSingleInventory,
  addNewInventory,
};
