const {tables, getKnex} = require('../data/index');

const findAll = ({
    limit,
    offset,
}) =>
{
    return getKnex()(tables.dagen)
        .select()
        .limit(limit)
        .offset(offset)
        .orderBy('id', 'ASC');
};

module.exports = {
    findAll,
};