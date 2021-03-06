const {tables, getKnex} = require('../data/index');
const short = require('short-uuid');

const translator = short("0123456789");
const shortId = async () =>
{
    let id = parseInt(translator.new()) % 1_000_000_000;
    const exists = await findById(id);
    if(exists)
    {
        id = await shortId();
    }
    return id;
};

// TODO join met lid voor voornaam en achternaam
const findAll = async (dagid, {
    limit,
    offset,
}) =>
{
    return await getKnex().select(`${tables.dagenleden}.id`
    , `${tables.dagenleden}.dagid`
    , `${tables.dagenleden}.lidid`
    , `${tables.leden}.voornaam`
    , `${tables.leden}.achternaam`
    , `${tables.dagenleden}.aanwezig`)
    .from(tables.dagenleden)
    .leftOuterJoin(tables.leden, `${tables.dagenleden}.lidid`, `${tables.leden}.id`)
    .where('dagid', dagid)
    .limit(limit)
    .offset(offset);
};

const findById = async (id) =>
{
    return await getKnex().select(`${tables.dagenleden}.id`
    , `${tables.dagenleden}.dagid`
    , `${tables.dagenleden}.lidid`
    , `${tables.leden}.voornaam`
    , `${tables.leden}.achternaam`
    , `${tables.dagenleden}.aanwezig`)
    .from(tables.dagenleden)
    .leftOuterJoin(tables.leden, `${tables.dagenleden}.lidid`, `${tables.leden}.id`)
    .where(`${tables.dagenleden}.id`, id)
    .first();
};

// hulpfunctie
const findByDagidLidid = async (dagid, lidid) =>
{
    return await getKnex()(tables.dagenleden)
    .where('dagid', dagid)
    .andWhere('lidid', lidid)
    .first();
};

const create = async ({dagid, lidid, aanwezig}) =>
{
    // controleer of combinatie dag,lid al bestaad
    const isRegistered = await findByDagidLidid(dagid, lidid);

    if(isRegistered)
    {
        throw Error("Lid is registered");
    }
    // else
    const id = await shortId();
    await getKnex()(tables.dagenleden).insert({id, dagid, lidid, aanwezig});
    return await findById(id);
};

const updateById = async (id, {
    dagid, lidid, aanwezig
  }) => {
    const isRegistered = await findById(id);

    if(!isRegistered)
    {
        throw Error("Lid is not registered");
    }

    await getKnex()(tables.dagenleden)
    .update({dagid, lidid, aanwezig})
    .where(`id`, id);
    return await findById(id);
  };

const deleteById = async (id) =>
{
    const rowsAffected = await getKnex()(tables.dagenleden).where("id", id).del();
    return rowsAffected > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};