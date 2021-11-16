const {tables} = require('..');

module.exports = {
	seed: async (knex) => {
		// first delete all entries
		await knex(tables.dagenleden).delete();

		// then add the fresh places
		await knex(tables.dagenleden).insert([
		{ id: 1, dagid: 20211109, lidid: 1, aanwezig: 1},
		{ id: 2, dagid: 20211109, lidid: 2, aanwezig: 1},
        { id: 3, dagid: 20211116, lidid: 2, aanwezig: 0},
        { id: 4, dagid: 20211116, lidid: 2, aanwezig: 1},
    ]);
	},
};