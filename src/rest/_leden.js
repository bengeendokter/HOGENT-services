const Router = require('@koa/router');
const ledenService = require('../service/leden');
const {requireAuthentication} = require('../core/auth');

const getAllLeden = async (ctx) =>
{
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await ledenService.getAll(limit, offset);
  ctx.status = 200;
};

const createLid = async (ctx) =>
{
  ctx.body = await ledenService.create({...ctx.request.body});
  ctx.status = 201;
};

const getLidById = async (ctx) =>
{
  ctx.body = await ledenService.getById(Number(ctx.params.id));
  ctx.status = 200;
};

const deleteLid = async (ctx) =>
{
  ctx.body = await ledenService.deleteById(Number(ctx.params.id));
  ctx.status = 200;
}


module.exports = (app) =>
{
  const router = new Router({
    prefix: '/leden',
  });

  router.get('/', requireAuthentication, getAllLeden);
  router.post('/', requireAuthentication, createLid);
  router.get('/:id', requireAuthentication, getLidById);
  router.delete('/:id', requireAuthentication, deleteLid);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}