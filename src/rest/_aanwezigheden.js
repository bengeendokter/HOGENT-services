const Router = require('@koa/router');
const aanwezighedenService = require('../service/aanwezigheden');

const getAllAanwezigheden = async (ctx) =>
{
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await aanwezighedenService.getAll(limit, offset);
  ctx.status = 200;
};

const createAanwezigheid = async (ctx) =>
{
  ctx.body = await aanwezighedenService.create({...ctx.request.body});
  ctx.status = 201;
};

const getAanwezigheidById = async (ctx) =>
{
  ctx.body = await aanwezighedenService.getById(Number(ctx.params.id));
  ctx.status = 200;
};

const updateAanwezigheid = async (ctx) =>
{
  ctx.body = await aanwezighedenService.updateById(ctx.params.id, {...ctx.request.body});
};

const deleteAanwezigheid = async (ctx) =>
{
  ctx.body = await aanwezighedenService.deleteById(Number(ctx.params.id));
  ctx.status = 200;
}


module.exports = (app) =>
{
  const router = new Router({
    prefix: '/leden',
  });

  router.get('/', getAllAanwezigheden);
  router.post('/', createAanwezigheid);
  router.get('/:id', getAanwezigheidById);
  router.put('/:id', updateAanwezigheid);
  router.delete('/:id', deleteAanwezigheid);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}