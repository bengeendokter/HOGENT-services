const Router = require('@koa/router');
const ledenService = require('../service/leden');

const getAllDagen = async (ctx) =>
{
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await ledenService.getAll(limit, offset);
  ctx.status = 200;
};

const createDag = async (ctx) =>
{
  ctx.body = await ledenService.create({...ctx.request.body});
  ctx.status = 201;
};

const getDagById = async (ctx) =>
{
  ctx.body = await ledenService.getById(Number(ctx.params.id));
  ctx.status = 200;
};

const deleteDag = async (ctx) =>
{
  ctx.body = await ledenService.deleteById(Number(ctx.params.id));
  ctx.status = 200;
}


module.exports = (app) =>
{
  const router = new Router({
    prefix: '/leden',
  });

  router.get('/', getAllDagen);
  router.post('/', createDag);
  router.get('/:id', getDagById);
  router.delete('/:id', deleteDag);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}