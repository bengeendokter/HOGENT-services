const {getLogger} = require('../core/logging');
const aanwezigheidRepository = require('../repository/aanwezigheid');

const debugLog = (message, meta = {}) =>
{
    const logger = getLogger();
    logger.debug(message, meta);
}

const getAll = async (
    limit = 100,
    offset = 0,
) =>
{
    debugLog('Fetching all aanwezigheden');
    const data = await aanwezigheidRepository.findAll({limit, offset});
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

const create = async (lid) =>
{
    debugLog('Creating new aanwezigheid', lid);
    return await aanwezigheidRepository.create(lid);
};

const updateById = async (id, {dagid, lidid, aanwezigheid}) =>
{
    debugLog(`Updating transaction with id ${id}`, {
        dagid, lidid, aanwezigheid
    });

    return await aanwezigheidRepository.updateById(id, {
        dagid, lidid, aanwezigheid
    });
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
