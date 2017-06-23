import supertest from 'supertest';
import { expect } from 'chai';
import database from '../../models';
import app from '../../../server';
import SpecHelper from '../helpers/SpecHelper';
import SeedHelper from '../helpers/SeedHelper';

const client = supertest.agent(app);

describe('Roles:', () => {
  const adminUser = SpecHelper.validAdminUser;
  const regularUser = SpecHelper.generateRandomUser(2);
  before((done) => {
    SeedHelper.init()
    .then(() => {
      client.post('/users/login')
      .send({
        email: adminUser.email,
        password: adminUser.password
      })
      .end((error, response) => {
        adminUser.token = response.body.activeToken;
        adminUser.id = response.body.userId;
        client.post('/users')
        .send(regularUser)
        .end((error1, response1) => {
          regularUser.token = response1.body.activeToken;
          regularUser.id = response1.body.userId;
          done();
        });
      });
    });
  });

  after((done) => {
    database.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
  });

  describe('Create Role', () => {
    const newRole = SpecHelper.generateRandomRole('ttl');
    it('should allow an Admin user with VALID token create a Role',
    (done) => {
      client.post('/roles')
      .set({ 'xsrf-token': adminUser.token })
      .send(newRole)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(newRole.title);
        done();
      });
    });

    it(`should return status code 400 if an Admin tries
    to create a new Role with the Role ID specified`,
    (done) => {
      const invalidNewRole = SpecHelper.generateRandomRole('d0');
      invalidNewRole.id = 1;
      client.post('/roles')
      .send(invalidNewRole)
      .set({ 'xsrf-token': adminUser.token })
      .end((error, response) => {
        console.log('rorle', response.body)
        expect(response.status).to.equal(400);
        done();
      });
    });

    xit(`should NOT allow an Admin user with VALID token create a
     DUPLICATE Role`,
    (done) => {
      client.post('/roles')
      .set({ 'x-access-token': adminUser.token })
      .send(newRole)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    xit(`should NOT allow an Admin user with VALID token create an
     Invalid Role`,
    (done) => {
      client.post('/roles')
      .set({ 'x-access-token': adminUser.token })
      .send({})
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    xit(`should NOT allow any User (Admin, Regular...) with an INVALID token
    create a Role`,
    (done) => {
      const testRole = SpecHelper.generateRandomRole('learner');
      client.post('/roles')
      .set({ 'x-access-token': 'invalid token' })
      .send(testRole)
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    xit(`should NOT allow an authenticated NON-Admin User with a VALID token
    create a Role`,
    (done) => {
      const testRole = SpecHelper.generateRandomRole('new learner');
      client.post('/roles')
      .set({ 'x-access-token': regularUser.token })
      .send(testRole)
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  xdescribe('Update Role', () => {
    const newRole = SpecHelper.generateRandomRole('update');
    before((done) => {
      client.post('/roles')
      .send(newRole)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        // set our new role id
        newRole.id = response.body.id;
        done();
      });
    });

    it('should allow only an Admin user with VALID token UPDATE a Role',
    (done) => {
      const newTitle = 'new title';
      client.put(`/roles/${newRole.id}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token UPDATE a
    NON-EXISTENT Role`, (done) => {
      const newTitle = 'new title1';
      client.put(`/roles/${300}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should return a status code of 400 to show it does NOT allow
    update of a Role ID`, (done) => {
      client.put(`/roles/${3}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ id: 5 })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should return a status code of 403 to show it does NOT allow
    update of admin Role`, (done) => {
      const newTitle = 'new title1';
      client.put(`/roles/${1}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should return a status code of 403 to show it does NOT allow
    update of the regular Role`, (done) => {
      const newTitle = 'new title1';
      client.put(`/roles/${2}`)
      .set({ 'x-access-token': adminUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular...) with an INVALID token
    UPDATE a Role`,
    (done) => {
      const newTitle = 'new title2';
      client.put(`/roles/${newRole.id}`)
      .set({ 'x-access-token': 'invalid token' })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it(`should NOT allow a NON-Admin User with a VALID token
    UPDATE a Role`,
    (done) => {
      const newTitle = 'new title3';
      client.put(`/roles/${newRole.id}`)
      .set({ 'x-access-token': regularUser.token })
      .send({ title: newTitle })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  xdescribe('Get Roles', () => {
    it('should allow an Admin User with VALID token get a specific Role',
    (done) => {
      client.get('/roles/2')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it('should allow specifying offset when fetching Roles', (done) => {
      const searchOffset = 1;
      client.get(`/roles/?offset=${searchOffset}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it('should return a 400 status code when an invalid offset is specified',
    (done) => {
      const invalidSearchOffset = -1;
      client.get(`/roles/?offset=${invalidSearchOffset}`)
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it(`should NOT allow an Admin User with VALID token get a specified Role
    that does NOT exist`,
    (done) => {
      client.get('/roles/9000')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should NOT allow a Non Admin User with VALID token
    get a specific Role`,
    (done) => {
      client.get('/roles/2')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should NOT allow any un-authenticated user get a specific Role',
    (done) => {
      client.get('/roles/2')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should allow an Admin User with VALID token get all Roles',
    (done) => {
      client.get('/roles')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.instanceOf(Object);
        done();
      });
    });

    it(`should NOT allow any User (Admin, Regular, ...) with an INVALID
    token to get all Roles`, (done) => {
      client.get('/roles')
      .set({ 'x-access-token': 'invalid token' })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should NOT allow a Non-Admin User with VALID token get all Roles',
    (done) => {
      client.get('/roles')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });

  xdescribe('Delete Role', () => {
    it('should NOT allow a Non-Admin User with VALID token delete a Role',
    (done) => {
      client.delete('/roles/3')
      .set({ 'x-access-token': regularUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it('should allow an Admin user with VALID token delete a Role',
    (done) => {
      client.delete('/roles/3')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });

    it(`should NOT allow an Admin user with VALID token delete a
    non-existing Role`, (done) => {
      client.delete('/roles/100')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        done();
      });
    });

    it(`should return a 403 status code to show it does NOT allow an
    Admin user with VALID token delete admin Role`, (done) => {
      client.delete('/roles/1')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });

    it(`should return a 403 status code to show it does NOT allow an
    Admin user with VALID token delete regular Role`, (done) => {
      client.delete('/roles/2')
      .set({ 'x-access-token': adminUser.token })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        done();
      });
    });
  });
});
