const Router = require('@koa/router');
const dagenService = require('../service/dagen');

// TODO await bij alle service calls
const getAllDagen = async (ctx) => {
  const limit =  ctx.query.limit && Number(ctx.query.limit);
  const offset =  ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await dagenService.getAll(limit, offset);
  ctx.status = 200;
};

const createDag = async (ctx) => {
  const newDag = await dagenService.create({...ctx.request.body});
  ctx.body = newDag;
};

const getDagById = async (ctx) => {
  ctx.body = dagenService.getById(Number(ctx.params.id));
};

const updateDag = async (ctx) => {
  ctx.body = dagenService.updateById(Number(ctx.params.id), {...ctx.request.body});
};

const deleteDag = async (ctx) => {
  await dagenService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
}

/**
 * Install dagen routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/dagen',
  });

  router.get('/', getAllDagen);
  router.post('/', createDag);
  router.get('/:id', getDagById);
  router.put('/:id', updateDag);
  router.delete('/:id', deleteDag);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}