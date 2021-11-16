const {tables} = require('..');

module.exports = {
    up: async (knex) =>
    {
        await knex.schema.createTable(tables.dagen, (table) =>
        {
            table.uuid('id')
                .primary();
        });
    },
    down: (knex) =>
    {
        return knex.schema.dropTableIfExists(tables.dagen);
    },
};