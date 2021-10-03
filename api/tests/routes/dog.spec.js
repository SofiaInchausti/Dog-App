const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const Temperaments=require("../../src/models/Temperament")

const agent = session(app);
const dog = {
  id:"a378f7e1-94ad-432e-9db1-41baddbdae8f",
  name: 'Pug', 
  height:"2-8",
  weight:"2-8",
  
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

describe('POST /dogs', function () {
  it('responde con 302', function(){
    return agent.post('/dogs')
      .send({
        name:"chiguaguaua",
        image:"hhj",
        height:"555",
        weight:"20",
        lifeSpan:"4",
        temperaments:["active"]
      })
      .expect(200);
  });
  it('create a dog in data base', function(){
    return agent.post('/dogs')
      .send({
        name:"chiguaguaua",
        image:"hhj",
        height:"555",
        weight:"20",
        lifeSpan:"4",
        temperaments:["active"]
      })
      .then(() => {
        return Dog.findOne({
          where: {
            name:"chiguaguaua"
          }
        });
      })
      .then(dog => {
        expect(dog).to.exist;
      });
  });
})


describe('pedidos http Dogs', function () {
  beforeEach(function(){
    return Dog.sync({ force: true })
  })

  describe('GET /dogs', function () {
    it('responde con 200', function() {
      return Dog.create({
        id:"a378f7e1-94ad-432e-9db1-41baddbdae8f",
        name: 'Pug',
        height: '3-3',
        weight:"3-3"
      })
      .then(() => {
        return agent.get('/dogs')
          .expect(200);
      })
    })
    
  });


  describe('GET /dogs/:idRaza', function () {
    it('responde con 200', function() {
      return Dog.create({
        id:"a378f7e1-94ad-432e-9db1-41baddbdae8f",
        name: 'Pug',
        height: '3-3',
        weight:"3-3"
      })
      .then(() => {
        return agent.get('/dogs/a378f7e1-94ad-432e-9db1-41baddbdae8f')
          .expect(200);
      })
    });
    it('espera que sea json', function(){
      return agent.get('/dogs')
      .expect('Content-Type', /json/);
      
    });
  });
})

describe('pedidos HTTP temperaments', function () {
  beforeEach(function(){
    return Dog.sync({ force: true })
  })

  describe('GET /temperament', function () {
    it('responde con 200', function() {
      return agent.get('/temperament')
      .expect(200);
    });
    
  });
  
  })
});



