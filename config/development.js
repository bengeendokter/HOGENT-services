module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},
	cors: {
		origins: ['http://192.168.0.130:3000', 'http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
	database: {
		client: 'mysql2',
		host: 'localhost',
		port: 3306,
		name: 'aanwezigheden',
		username: 'root',
		password: 'root',
	},
};
