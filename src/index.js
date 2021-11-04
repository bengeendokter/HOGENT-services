const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const {initializeLogger, getLogger} = require('./core/logging');

const installRest = require('./rest');


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

initializeLogger({
	level: LOG_LEVEL,
	disabled: LOG_DISABLED,
	isProduction: NODE_ENV === 'production',
	defaultMeta: {NODE_ENV},
});
const app = new Koa();
const logger = getLogger();

app.use(bodyParser());

installRest(app);

logger.info(`🚀 Server listening on http://localhost:9000`);
app.listen(9000);