const {tables, getKnex} = require('../data/index');
const short = require('short-uuid');

const translator = short("0123456789");
const shortId = async () =>
{
    let id = parseInt(translator.new()) % 10_000_000_000;
    const exists = await findById(id);
    if(exists)
    {
        id = await shortId();
    }
    return id;
};

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

const create = async ({voornaam, achternaam}) =>
{
    const id = await shortId();
    await getKnex()(tables.leden).insert({id, voornaam, achternaam});
    return await findById(id);
};

const updateById = async (id, {
    dagid, lidid, aanwezigheid
  }) => {
    // try {
    //   await getKnex()(tables.transaction)
    //     .update({
    //       amount,
    //       date,
    //       place_id: placeId,
    //       user_id: userId,
    //     })
    //     .where(`${tables.transaction}.id`, id);
    //   return await findById(id);
    // } catch (error) {
    //   const logger = getChildLogger('transactions-repo');
    //   logger.error('Error in updateById', {
    //     error,
    //   });
    //   throw error;
    // }
  };

const deleteById = async (id) =>
{
    const rowsAffected = await getKnex()(tables.leden).where("id", id).del();
    await getKnex()(tables.dagenleden).where("lidid", id).del();
    return rowsAffected > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};