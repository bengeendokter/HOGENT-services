const { getLogger } = require('../core/logging');

let DAGEN = [{id: 1, user: 'Benjamin', amount: 100, place: 'Irish Pub', date: '2021-08-15' }];

const debugLog = (message, meta = {}) => {
  const logger = getLogger();
  logger.debug(message, meta);
}

const getAll = () => {
  debugLog('Fetching all dagen');
  return DAGEN;
};

const getById = (id) => {
  debugLog(`Fetching dag with id ${id}`);
  return DAGEN.filter((dag) => dag.id === id)[0];
};

const create = ({ amount, date, place, user }) => {
  const maxId = Math.max(...DAGEN.map(i => i.id));
  const dag = {id: maxId+1, amount, date, place, user};
  debugLog('Creating new dag', dag);
  DAGEN = [...DAGEN, dag];
  return dag;
};

const updateById = (id, { amount, date, place, user }) => {
  debugLog(`Updating dag with id ${id}`, { amount, date, place, user });
  const index = DAGEN.findIndex((dag) => dag.id === id);

  if (index < 0) return null;

  const dagen = DAGEN[index];
  dagen.amount = amount;
  dagen.date = date;
  dagen.place = place;
  dagen.user = user;

  return dagen;
};

const deleteById = (id) => {
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
