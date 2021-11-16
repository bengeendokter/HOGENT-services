const {tables} = require('..');

module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex(tables.leden).delete();

		// then add the fresh places
		await knex(tables.leden).insert([
		{ id: 1, voornaam: "Ben", achternaam: "Arts"},
		{ id: 2, voornaam: "Peter", achternaam: "Jansens"},
    ]);
	},
};