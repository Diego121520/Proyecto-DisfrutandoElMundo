const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

const country = {
  id:"PRB",
  name: 'prueba',
  flagimage:"imagen",
  continent:"America",
  capitalCity:"Buenos Aires"
};

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('Funciona cuando todos los datos son ingresados', (done) => {
        Country.create({
          id:"ARG",
          name: 'prueba',
          flagimage:"imagen",
          continent:"America",
          capitalCity:"Buenos Aires"
        })
        .then(() => done())
        .catch((error) => done(new Error(error)))
      });

      it('should throw an error if name is null', (done) => {
        Country.create({
          id:"PRB",
          name: null,
          flagimage:"imagen",
          continent:"America",
          capitalCity:"Buenos Aires"
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should throw an error if id is null', (done) => {
        Country.create({
          id: null,
          name: "prueba",
          flagimage:"imagen",
          continent:"America",
          capitalCity:"Buenos Aires"
        })
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });

      it('should throw an error if id is not valid', (done) => {
        Country.create({
          id:"PRBA",
          name: "Prueba",
          flagimage:"imagen",
          continent:"America",
          capitalCity:"Buenos Aires"
        })
          .then(() => done(new Error('It requires a valid ID')))
          .catch(() => done());
      });

      it('should throw an error if flagimage is null', (done) => {
        Country.create({
          id: "PRB",
          name: "prueba",
          flagimage: null,
          continent:"America",
          capitalCity:"Buenos Aires"
        })
          .then(() => done(new Error('It requires a valid flagimage')))
          .catch(() => done());
      });

      it('should throw an error if continent is null', (done) => {
        Country.create({
          id: "PRB",
          name: "prueba",
          flagimage: "imagen",
          continent: null,
          capitalCity:"Buenos Aires"
        })
          .then(() => done(new Error('It requires a valid continent')))
          .catch(() => done());
      });

      it('should throw an error if capitalCity is null', (done) => {
        Country.create({
          id: "PRB",
          name: "prueba",
          flagimage: "imagen",
          continent: "america",
          capitalCity: null
        })
          .then(() => done(new Error('It requires a valid capitalCity')))
          .catch(() => done());
      })


    });
  });
});
