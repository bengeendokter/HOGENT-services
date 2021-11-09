const knex = require('knex');
const config = require('config');

const {getLogger} = require('../core/logging');

const NODE_ENV = config.get('env');
const isDevelopment = NODE_ENV === 'development';

const DATABASE_CLIENT = config.get('database.client');
const DATABASE_NAME = config.get('database.name');
const DATABASE_HOST = config.get('database.host');
const DATABASE_PORT = config.get('database.port');
const DATABASE_USERNAME = config.get('database.username');
const DATABASE_PASSWORD = config.get('database.password');

let knexInstance;

async function initializeData()
{
    const logger = getLogger();

    const knexOptions = {
        client: DATABASE_CLIENT,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            database: DATABASE_NAME,
            user: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            insecureAuth: isDevelopment,
        },
    };

    knexInstance = knex(knexOptions);

    try
    {
        await knexInstance.raw('SELECT 1+1 AS result');
    }
    catch(error)
    {
        logger.error(error.message, {error});
        throw new Error('Could not initialize the data layer');
    }

    return knexInstance;
}

function getKnex()
{
    if(!knexInstance) throw new Error('Please initialize the data layer before getting the Knex instance');
    return knexInstance;
}

const tables = Object.freeze({
	dagen: 'dag',
	leden: 'lid',
    dagenleden: 'daglid',
});

module.exports = {
    initializeData,
    getKnex,
    tables,
};