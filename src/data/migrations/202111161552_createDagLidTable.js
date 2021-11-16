const {tables} = require('..');

module.exports = {
    up: async (knex) =>
    {
        await knex.schema.createTable(tables.dagenleden, (table) =>
        {
            table.uuid('id')
                .primary();

            table.uuid('dagid')
                .notNullable();

            table.foreign('dagid', 'fk_daglid_dag')
                .references(`${tables.dagen}.id`)
                .onDelete('CASCADE');

            table.uuid('lidid')
            .notNullable();

            table.foreign('lidid', 'fk_daglid_lid')
                .references(`${tables.leden}.id`)
                .onDelete('CASCADE');

            table.boolean('aanwezig')
                .notNullable();
        });
    },
    down: (knex) =>
    {
        return knex.schema.dropTableIfExists(tables.dagenleden);
    },
};