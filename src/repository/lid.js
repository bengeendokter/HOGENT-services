const {tables, getKnex} = require('../data/index');

const findAll = async ({
    limit,
    offset,
}) =>
{
    return await getKnex().select().from(`${tables.leden}`)
    .limit(limit)
    .offset(offset);
};

const findById = async (dag) =>
{
    await getKnex().from(tables.dagen).insert({id: dag.id});
    // TODO return await findById(dag.id);
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