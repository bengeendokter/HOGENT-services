const {tables, getKnex} = require('../data/index');

const findAll = ({
    limit,
    offset,
}) =>
{


    return getKnex()
        .select(`${tables.dagen}.id AS datum`)
        .count(`${tables.dagenleden}.id AS aanwezig`)
        .from(tables.dagen)
        .join(tables.dagenleden, `${tables.dagen}.id`, `${tables.dagenleden}.dagid`)
        .where(`${tables.dagenleden}.aanwezig`, 1)
        .groupBy(`${tables.dagen}.id`)
        .limit(limit)
		.offset(offset)

        // knex.select('year', knex.raw('SUM(profit)')).from('sales').groupByRaw('year WITH ROLLUP')
};

module.exports = {
    findAll,
};