const {tables, getKnex} = require('../data/index');
const {getLogger} = require('../core/logging');

const findAll = ({
    limit,
    offset,
}) =>
{
    const ledenperdatum = getKnex().select(`${tables.dagen}.id AS datum`
        , `${tables.dagenleden}.lidid AS lidid`
        , `${tables.dagenleden}.aanwezig AS aanwezig`)
        .from(tables.dagenleden)
        .rightOuterJoin(tables.dagen, `${tables.dagenleden}.dagid`, `${tables.dagen}.id`);

    const aanwezig = getKnex().select('datum')
        .count('datum AS aantal')
        .from(getKnex().raw(`(${ledenperdatum}) ld`))
        .where('aanwezig', 1)
        .groupBy('datum');

    const afwezig = getKnex().select('datum')
        .count('datum AS aantal')
        .from(getKnex().raw(`(${ledenperdatum}) ld`))
        .where('aanwezig', 0)
        .groupBy('datum');
    
    return getKnex()
    .distinct('ld.datum', getKnex().raw('ifnull(aan.aantal, 0) AS aanwezig'), getKnex().raw('ifnull(af.aantal, 0) AS afwezig'))
    .from(getKnex().raw(`(${ledenperdatum}) ld`))
    .leftOuterJoin(getKnex().raw(`(${afwezig}) af`), 'ld.datum', 'af.datum')
    .leftOuterJoin(getKnex().raw(`(${aanwezig}) aan`), 'ld.datum', 'aan.datum')
    .limit(limit)
    .offset(offset);
};

const create = (dag) =>
{
    return getKnex().from(tables.dagen).insert({id: dag.id});
};

const deleteById = (id) =>
{
    return getKnex().from(tables.dagenleden).where("dagid", id).del()
    .then(() => getKnex().from(tables.dagen).where("id", id).del());
};

module.exports = {
    findAll,
    create,
    deleteById,
};