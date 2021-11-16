const {getLogger} = require('../core/logging');
const dagenRepository = require('../repository/dag');

// TODO dummy object, verwijder later

let DAGEN = [
    {
        id: 20211024
        , aanwezig: 10
        , afwezig: 10
    }
    , {
        id: 20211031
        , aanwezig: 9
        , afwezig: 12
    }
];

const debugLog = (message, meta = {}) =>
{
    const logger = getLogger();
    logger.debug(message, meta);
}

const getAll = async (
	limit = 100,
	offset = 0,
) => {
    debugLog('Fetching all dagen');
	const data = await dagenRepository.findAll({ limit, offset });
    return {
		data,
		limit,
		offset
	};
};

const getById = (id) =>
{
    debugLog(`Fetching dag with id ${id}`);
    return DAGEN.filter((dag) => dag.id === id)[0];
};

const create = async ({id}) =>
{
    const dag = {id: parseInt(id)};
    debugLog('Creating new dag', dag);
    await dagenRepository.create(dag);
    return dag;
    // TODO return await dagenRepository.create(dag);
};

const updateById = (id, {aanwezig, afwezig}) =>
{
    debugLog(`Updating dag with id ${id}`, {id, aanwezig, afwezig});
    const index = DAGEN.findIndex((dag) => dag.id === id);

    if(index < 0) return null;

    const dagen = DAGEN[index];
    dagen.aanwezig = aanwezig;
    dagen.afwezig = afwezig;

    return dagen;
};

const deleteById = async (id) =>
{
    debugLog(`Deleting dag with id ${id}`);
    await dagenRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
