const Router = require('@koa/router');
const installDagenRouter = require('./_dagen');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) =>
{
    const router = new Router({
        prefix: '/api',
    });

    installDagenRouter(router);

    app
        .use(router.routes())
        .use(router.allowedMethods());
}