const Router = require('@koa/router');
const aanwezighedenService = require('../service/aanwezigheden');
const {requireAuthentication} = require('../core/auth');
const Joi = require('joi');
const validate = require('./_validation')

const getAllAanwezigheden = async (ctx) =>
{
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  ctx.body = await aanwezighedenService.getAll(Number(ctx.params.dagid), limit, offset);
  ctx.status = 200;
};

getAllAanwezigheden.validationScheme =
{ query:
  Joi.object({
    limit: Joi.number().integer().positive().max(1000).optional()
    , offset: Joi.number().integer().min(0).optional()
  }).and("limit", "offset")
}
  ;

const createAanwezigheid = async (ctx) =>
{
  try
  {
    ctx.body = await aanwezighedenService.create({...ctx.request.body});
    ctx.status = 201;
  }
  catch(error)
  {
    ctx.body = false;
    ctx.status = 409;
  }
};

const getAanwezigheidById = async (ctx) =>
{
  ctx.body = await aanwezighedenService.getById(Number(ctx.params.id));
  ctx.status = 200;
};

const updateAanwezigheid = async (ctx) =>
{
  try
  {
    ctx.body = await aanwezighedenService.updateById(ctx.params.id, {...ctx.request.body});
    ctx.status = 200;
  }
  catch(error)
  {
    ctx.body = false;
    ctx.status = 409;
  }
};

const deleteAanwezigheid = async (ctx) =>
{
  ctx.body = await aanwezighedenService.deleteById(Number(ctx.params.id));
  ctx.status = 200;
}


module.exports = (app) =>
{
  const router = new Router({
    prefix: '/aanwezigheden',
  });

  router.get('/dag/:dagid', requireAuthentication, validate(getAllAanwezigheden.validationScheme), getAllAanwezigheden);
  router.post('/', requireAuthentication, createAanwezigheid);
  router.get('/:id', requireAuthentication, getAanwezigheidById);
  router.put('/:id', requireAuthentication, updateAanwezigheid);
  router.delete('/:id', requireAuthentication, deleteAanwezigheid);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}