const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Dog.create({ height: '4-5' });
      });
    });
  
    describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its a valid weight', () => {
        Dog.create({ weight: '4-5' });
      });
    });

    describe('id UUID', () => {
      it('should throw an error if id UUID is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid id UUID')))
          .catch(() => done());
      });
      it('should work when its a valid UUID', () => {
        Dog.create({ id:"a378f7e1-94ad-432e-9db1-41baddbdae8f"});
      });
    });
  
  
  });
  
});
