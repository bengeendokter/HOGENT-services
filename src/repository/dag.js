const {tables, getKnex} = require('../data/index');

const findAll = ({
    limit,
    offset,
}) =>
{
    const ledenperdatum = getKnex().select(`${tables.dagenleden}.dagid AS datum`
        , `${tables.dagenleden}.lidid AS lidid`
        , `${tables.dagenleden}.aanwezig AS aanwezig`)
        .from(tables.dagenleden)
        .join(tables.dagen, `${tables.dagenleden}.dagid`, `${tables.dagen}.id`);

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
    .select('aan.datum', 'aan.aantal AS aanwezig', getKnex().raw('ifnull(af.aantal, 0) AS afwezig'))
    .from(getKnex().raw(`(${aanwezig}) aan`))
    .leftOuterJoin(getKnex().raw(`(${afwezig}) af`), 'aan.datum', 'af.datum')
    .limit(limit)
    .offset(offset);
};

module.exports = {
    findAll,
};