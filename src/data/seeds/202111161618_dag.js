const {tables} = require('..');

module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex(tables.dagen).delete();

		// then add the fresh places
		await knex(tables.dagen).insert([
		{ id: 20211109},
        { id: 20211116},
        { id: 20211124},
    ]);
	},
};