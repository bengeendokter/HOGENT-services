const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const {initializeLogger, getLogger} = require('./core/logging');
const koaCors = require('@koa/cors');
const emoji = require('node-emoji');

const installRest = require('./rest');

const { initializeData } = require('./data');


const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

async function main()
{
	initializeLogger({
		level: LOG_LEVEL,
		disabled: LOG_DISABLED,
		isProduction: NODE_ENV === 'production',
		defaultMeta: {NODE_ENV},
	});

	const logger = getLogger();
	
	await initializeData();

	const app = new Koa();

	app.use(
		koaCors({
			origin: (ctx) => {
				if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          logger.info(`${emoji.get('x')} blocked request from origin ${ctx.request.header.origin}`);
					return ctx.request.header.origin;
				}
				// Not a valid domain at this point, let's return the first valid as we should return a string
				return CORS_ORIGINS[0];
			},
			allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
			maxAge: CORS_MAX_AGE,
		})
	);

	app.use(bodyParser());

  app.use(async (ctx, next) => {
    logger.info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get('skull');
      if (ctx.status >= 400) return emoji.get('x');
      if (ctx.status >= 300) return emoji.get('rocket');
      if (ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();

      logger.info(
        `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`,
      );
    } catch (error) {
      logger.error(`${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error,
      });

      throw error;
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.body = {
          code: 'NOT_FOUND',
          message: `Unknown resource: ${ctx.url}`,
        };
      }
    } catch (error) {
      const logger = getLogger();
      logger.error('Error occured while handling a request', {
        error,
      });

      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };

      if (error) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

	installRest(app);
  const port = process.env.PORT || 9000;
	logger.info(`🚀 Server listening on http://localhost:${port}`);
	app.listen(port);
};

main();
