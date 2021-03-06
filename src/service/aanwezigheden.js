const {getLogger} = require('../core/logging');
const aanwezigheidRepository = require('../repository/aanwezigheid');

const debugLog = (message, meta = {}) =>
{
    const logger = getLogger();
    logger.debug(message, meta);
}

const errorLog = (message, meta = {}) =>
{
    const logger = getLogger();
    logger.error(message, meta);
}

const getAll = async (
    dagid,
    limit = 100,
    offset = 0,
) =>
{
    debugLog(`Fetching all aanwezigheden op dag ${dagid}`);
    const data = await aanwezigheidRepository.findAll(dagid, {limit, offset});
    return {
        data,
        limit,
        offset
    };
};

const getById = async (id) =>
{
    debugLog(`Fetching aanwezigheid with id ${id}`);
    return await aanwezigheidRepository.findById(id);
};

const create = async ({dagid, lidid, aanwezig}) =>
{
    debugLog('Creating new aanwezigheid', {dagid, lidid, aanwezig});
    try
    {
        const newAanwezigheid = await aanwezigheidRepository.create({dagid, lidid, aanwezig});
        return newAanwezigheid;
    }
    catch(error)
    {
        errorLog(`Aanwezigheid with dagid ${dagid} and lidid ${lidid} already exists or the given dag or lid doesn't exist`)
        throw (error)
    };
};

const updateById = async (id, {dagid, lidid, aanwezig}) =>
{
    debugLog(`Updating transaction with id ${id}`, {
        dagid, lidid, aanwezig
    });

    try
    {
        const newAanwezigheid = await aanwezigheidRepository.updateById(id, {dagid, lidid, aanwezig});
        return newAanwezigheid;
    }
    catch(error)
    {
        errorLog(`Aanwezigheid with id ${id} doesn't exists`)
        throw (error)
    };
};

const deleteById = async (id) =>
{
    debugLog(`Deleting aanwezigheid with id ${id}`);
    return await aanwezigheidRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    updateById,
    create,
    deleteById,
}
