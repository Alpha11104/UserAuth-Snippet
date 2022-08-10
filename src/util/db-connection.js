import knex from "knex";
import config from '../../knexfile.js'
import fastifyPlugin from 'fastify-plugin';

function fastifyKnex(fastify, options, done) {
    
    const databaseConnection = knex(config);
    fastify.decorate('knex', databaseConnection);

    done();
}

export default fastifyPlugin(fastifyKnex);