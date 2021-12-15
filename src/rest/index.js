const Router = require('@koa/router');
const installDagenRouter = require('./_dagen');
const installLedenRouter = require('./_leden');
const installAanwezighedenRouter = require('./_aanwezigheden');
const installUserRouter = require('./_user');

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
    installLedenRouter(router);
    installAanwezighedenRouter(router);
    installUserRouter(router);

    app
        .use(router.routes())
        .use(router.allowedMethods());
}