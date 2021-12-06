const {tables, getKnex} = require('../data/index');

const findAll = async ({
    limit,
    offset,
}) =>
{
    return await getKnex()(tables.leden)
    .limit(limit)
    .offset(offset);
};

const findById = async (id) =>
{
    return await getKnex()(tables.leden)
    .where('id', id)
    .first();
};

const create = async (dag) =>
{
    await getKnex().from(tables.dagen).insert({id: dag.id});
    // TODO return await findById(dag.id);
};

const deleteById = async (id) =>
{
    await getKnex().from(tables.dagen).where("id", id).del();
    await getKnex().from(tables.dagenleden).where("dagid", id).del();
};

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
};