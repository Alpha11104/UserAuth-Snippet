import knex from "knex";
import config from '../../knexfile.js'

const databaseConnection = knex(config);

export default databaseConnection;