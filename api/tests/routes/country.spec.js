/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id:"ARG",
  name: 'Argentina',
  flagimage:"imagen",
  continent:"America",
  capitalCity:"Buenos Aires"
};

let newPost = {
  name: 'prueba',
  difficulty:2,
  duration:"1 dia",
  season:"otoño",
  countries:["Argentina"]
}

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country))
    .catch((err) => console.log(err)));

  describe('GET /countries', () => {
    it('should get 200', () => agent.get('/countries').expect(200));
    
    it('Responde con información del servidor',() =>{
      return agent.get('/countries')
      .then((res) => {
        expect((res.body.count >= 1)).to.be.eql(true); 
      });
    });
    
    it('Retorna 400 si se le pasa una query string',() => agent.get('/countries?page=string').expect(400));
    
    it('Retorna 404 si se le pasa un page mayor a la cantidad minima de paises',
    () => agent.get('/countries?page=2').expect(404));
  });

  describe('GET /countries/:id', () => {
    it('Should get 200', () => agent.get('/countries/ARG').expect(200));
    
    it('Responde con información del servidor',
    () => agent.get('/countries/arg')
    .then((res) => {
      expect(res.body.id).to.be.eql("ARG");
      expect(res.body.name).to.be.eql("Argentina");
      expect(res.body.flagimage).to.be.eql("imagen");
      expect(res.body.continent).to.be.eql("America");
      expect(res.body.capitalCity).to.be.eql("Buenos Aires");
      })
    );

    it('Retorna 404 si se le pasa un id inexistente',
    () => agent.get('/countries/PRB').expect(404));
  });

  describe('GET /countries?name=""&page="" ', () =>{
    it('Should get 200', () => agent.get('/countries?name=Argentina ').expect(200))
    
    it('Debe encontrar el pais si es valido',
    () => { return agent.get('/countries?name=Argentina ')
      .then((res) =>{
        expect(res.body.rows[0].name).to.be.eql("Argentina");
      });
    });

    it('Debe ser sensitive', () => {
      return agent.get('/countries?name=rg ')
    .then((res) => {
      expect(res.body.rows.map(results => results.name.includes("Argentina"))).to.be.eql([true])
    });
  }); 

  it('Retorna 404 si no encuntra el pais',() => agent.get('/countries?name=prueba').expect(404))
  })

  describe('POST /activity', () => {
    it('Debe crear la actividad', () => agent.post('/activity')
    .send(newPost).expect(200))

    it('Debe devolver 400 si falta el campo name',()=> agent.post('/activity')
    .send({
      duration: '1 dia',
      difficulty:2,
      season:"otoño",
      countries:["Argentina"]
    }).expect(400));

    it('Debe devolver 400 si falta el campo duration',()=> agent.post('/activity')
    .send({
      name: 'prueba',
      difficulty:2,
      season:"otoño",
      countries:["Argentina"]
    }).expect(400));

    it('Debe devolver 400 si falta el campo difficulty',()=> agent.post('/activity')
    .send({
      name: "prueba",
      duration:"1 dia",
      season:"otoño",
      countries:["Argentina"]
    }).expect(400));

    it('Debe devolver 400 si falta el campo season',()=> agent.post('/activity')
    .send({
      name: "prueba",
      duration:"1 dia",
      difficulty:3,
      countries:["Argentina"]
    }).expect(400));

    it('Debe devolver 400 si falta el campo season',()=> agent.post('/activity')
    .send({
      name: "prueba",
      duration:"1 dia",
      difficulty:3,
      season:"primavera"
    }).expect(400));
  })
});
