const {tables} = require('..');

module.exports = {
    up: async (knex) =>
    {
        await knex.schema.createTable(tables.leden, (table) =>
        {
            table.uuid('id')
                .primary();

            table.string('voornaam', 40)
                .notNullable();

            table.string('achternaam', 40)
                .notNullable();
        });
    },
    down: (knex) =>
    {
        return knex.schema.dropTableIfExists(tables.leden);
    },
};