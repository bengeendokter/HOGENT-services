module.exports = {
  log: {
    level: 'silly',
    disabled: true,
  },
  cors: {
    origins: ['https://aanwezigheden.netlify.app', 'http://localhost:3000'],
    maxAge: 3 * 60 * 60,
  },
  database: {
    client: 'mysql2',
  },
  pagination: {
    limit: 100,
    offset: 0,
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    jwt: {
      expirationInterval: 60 * 60 * 1000, // ms (1 hour)
			issuer: 'aanwezigheden.app',
			audience: 'aanwezigheden.app',
    },
  },
};