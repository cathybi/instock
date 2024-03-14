const knex = require('knex')(require('../knexfile'));

/**
 * Return all inventories in json format
 * @param {*} _req 
 * @param {*} res 
 */
const index = async (_req, res) => {
  try {
    const data = await knex('inventories');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json({
      message: `Error retrieving Inventories: ${err}`,
    });
  }
}

/**
 * Returns single Inventory object for given id
 * @param {*} req 
 * @param {*} res 
 */
const getSingleInventory = async(req, res) => {
  try{
    const inventory= await knex('inventories').where({id: req.params.id});
    res.status(200).json(inventory[0]);
  }catch(error) {
    res.status(400).send(`Error in getting single Inventory: ${error}`)
  }
}

module.exports = {
  index
}