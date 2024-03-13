const knex = require('knex')(require('../knexfile'));

/**
 * Return all inventories in json format
 * @param {*} _req 
 * @param {*} res 
 */
const getAll = async (_req, res) => {
  try {
    const data = await knex('inventories');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json({
      message: `Error retrieving Inventories: ${err}`,
    });
  }
}

module.exports = {
  getAll
}