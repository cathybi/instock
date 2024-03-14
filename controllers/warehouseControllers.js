const knex = require("knex")(require("../knexfile"));

const add = async (req, res) => {
  console.log("body", req.body);

  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).json({
      message: "Please provide all information for the request",
    });
  }

  try {
    const newRecord = await knex("warehouses").insert(req.body);

    console.log("newRecord", newRecord);

    const newWarehouseId = newRecord[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });

    res.status(201).json(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new warehouses: ${error}`,
    });
  }
};

const update = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedwarehouses = await knex("warehouses").where({
      id: req.params.id,
    });

    res.json(updatedwarehouses[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const warehouseFound = await knex("warehouses").where({
      id: req.params.id,
    });

    if (warehouseFound.length === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const warehouseData = warehouseFound[0];
    res.json(warehouseData);
  } catch (error) {
    res.status(200).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
};

//Trying to get inventorylist by warehouse id
const getInventoryListByWarehouseId = async (req, res) => {
  try {
    const data = await knex("inventories").where({
      warehouse_id: req.params.id,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving warehouse: ${err}`);
  }
};

module.exports = {
  add,
  update,
  getInventoryListByWarehouseId,
  findOne,
};
