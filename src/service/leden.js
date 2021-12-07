const {getLogger} = require('../core/logging');
const ledenRepository = require('../repository/lid');

const debugLog = (message, meta = {}) =>
{
    const logger = getLogger();
    logger.debug(message, meta);
}

const getAll = async (
	limit = 100,
	offset = 0,
) => {
    debugLog('Fetching all leden');
	const data = await ledenRepository.findAll({ limit, offset });
    return {
		data,
		limit,
		offset
	};
};

const getById = async (id) =>
{
    debugLog(`Fetching lid with id ${id}`);
    return await ledenRepository.findById(id);
};

const create = async (lid) =>
{
    debugLog('Creating new lid', lid);
    return await ledenRepository.create(lid);
};

const deleteById = async (id) =>
{
    debugLog(`Deleting lid with id ${id}`);
    return await ledenRepository.deleteById(id);
};

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
}
