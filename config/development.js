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
	auth: {
		argon: {
			saltLength: 16,
			hashLength: 32,
			timeCost: 6,
			memoryCost: 2 ** 17,
		},
		jwt: {
			secret: 'ditisnogeenveeltemoeilijkteradensecretdushopelijkisdesitenuveilig',
			expirationInterval: 60 * 60 * 1000, // ms (1 hour)
			issuer: 'aanwezigheden.app',
			audience: 'aanwezigheden.app',
		},
	},
};
