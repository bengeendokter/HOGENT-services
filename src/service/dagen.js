const {getLogger} = require('../core/logging');

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

const getAll = () =>
{
    debugLog('Fetching all dagen');
    return DAGEN;
};

const getById = (id) =>
{
    debugLog(`Fetching dag with id ${id}`);
    return DAGEN.filter((dag) => dag.id === id)[0];
};

const create = ({id, aanwezig, afwezig}) =>
{
    const dag = {id, aanwezig, afwezig};
    debugLog('Creating new dag', dag);
    DAGEN = [...DAGEN, dag];
    return dag;
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

const deleteById = (id) =>
{
    debugLog(`Deleting dag with id ${id}`);
    DAGEN = DAGEN.filter((dag) => dag.id !== id);
};

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
