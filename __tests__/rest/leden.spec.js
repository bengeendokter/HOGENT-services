const { tables } = require('../../src/data');
const { withServer, login } = require('../supertest.setup');

const data = {
  leden: [
		{ id: "998", voornaam: "Nep", achternaam: "Persoon"},
		{ id: "999", voornaam: "IsNiet", achternaam: "Echt"},
    ]
};

const dataToDelete = {
  leden: [
    "998",
    "999"
  ]
};

describe('Leden', () => {
  let request;
  let knex;
  let loginHeader;

  withServer(({ knex: k, supertest:s }) => {
    knex = k;
    request = s;
  });

  beforeAll(async () => {
    loginHeader = await login(request);
  });

  const url = '/api/leden';

  describe('GET /api/leden', () => {
    beforeAll(async () => {
      await knex(tables.leden).insert(data.leden);
    });

    afterAll(async () => {
      await knex(tables.leden)
        .whereIn('id', dataToDelete.leden)
        .delete();
    });

    // begin testen
    test('it should 200 and return all leden', async () => {
      const response = await request.get(url)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(4);
    });


    test('it should 200 and paginate the list of leden', async () => {
      const response = await request.get(`${url}?limit=2&offset=1`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.limit).toBe(2);
      expect(response.body.offset).toBe(1);
      expect(response.body.data[1]).toEqual(
        { id: "998", voornaam: "Nep", achternaam: "Persoon"},);
    });
  });

  describe('GET /api/leden/:id', () => {

    beforeAll(async () => {
      await knex(tables.leden).insert(data.leden[0]);
    });

    afterAll(async () => {
      await knex(tables.leden)
        .where('id', dataToDelete.leden[0])
        .delete();
    });

    test('it should 200 and return the requested lid', async () => {
      const lidId = data.leden[0].id;
      const response = await request.get(`${url}/${lidId}`)
        .set('Authorization', loginHeader);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        { id: "998", voornaam: "Nep", achternaam: "Persoon"});
    });
  });

  describe('POST /api/leden', () => {

    const ledenToDelete = [];

    afterAll(async () => {
      await knex(tables.leden)
        .whereIn('id', ledenToDelete)
        .delete();
    });

    test('it should 201 and return the created lid', async () => {
      const response = await request.post(url)
        .set('Authorization', loginHeader)
        .send({ id: "998", voornaam: "Nep", achternaam: "Persoon"});

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.voornaam).toBe("Nep");
      expect(response.body.achternaam).toBe("Persoon");

      ledenToDelete.push(response.body.id);
    });
  });


  describe('DELETE /api/leden/:id', () => {

    beforeAll(async () => {

      await knex(tables.leden).insert([{ id: "998", voornaam: "Nep", achternaam: "Persoon"}]);
    });

    test('it should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/998`)
        .set('Authorization', loginHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});