module.exports = {
	log: {
		level: 'info',
		disabled: false,
	},
	cors: {
		origins: ['https://hogent-web.github.io', 'https://aanwezigheden.netlify.app', 'http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},
	database: {
		client: 'mysql2',
	},
	auth: {
		argon: {
			saltLength: 16,
			hashLength: 32,
			timeCost: 6,
			memoryCost: 2 ** 17,
		},
		jwt: {
			expirationInterval: 3 * 24 * 60 * 60 * 1000, // ms (3 days)
			issuer: 'aanwezigheden.app',
			audience: 'aanwezigheden.app',
		},
	},
};
