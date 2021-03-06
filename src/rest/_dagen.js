const Router = require('@koa/router');
const dagenService = require('../service/dagen');
const {requireAuthentication} = require('../core/auth');
const Joi = require('joi');
const validate = require('./_validation')

// TODO await bij alle service calls
const getAllDagen = async (ctx) =>
{
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await dagenService.getAll(limit, offset);
  ctx.status = 200;
};

getAllDagen.validationScheme =
{ query:
  Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional()
    , offset: Joi.number().integer().min(0).optional()
  }).and("limit", "offset")
}
  ;

const createDag = async (ctx) =>
{
  try
  {
    ctx.body = await dagenService.create({...ctx.request.body});
    ctx.status = 201;
  }
  catch(error)
  {
    ctx.body = false;
    ctx.status = 409;
  }
};

const getDagById = async (ctx) =>
{
  ctx.body = dagenService.getById(Number(ctx.params.id));
};

const updateDag = async (ctx) =>
{
  ctx.body = dagenService.updateById(Number(ctx.params.id), {...ctx.request.body});
};

const deleteDag = async (ctx) =>
{
  await dagenService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
}

/**
 * Install dagen routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) =>
{
  const router = new Router({
    prefix: '/dagen',
  });

  router.get('/',
    requireAuthentication,
    validate(getAllDagen.validationScheme),
    getAllDagen);
  router.post('/',
    requireAuthentication,
    createDag);
  router.get('/:id', requireAuthentication, getDagById);
  router.put('/:id', requireAuthentication, updateDag);
  router.delete('/:id', requireAuthentication, deleteDag);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}