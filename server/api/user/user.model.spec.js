import { User } from '../../database/database';

describe('User Model', () => {
  const email = 'test@example.com';

  before(() => {
    return User.sync().then(() => {
      return User.destroy({ where: {} });
    });
  });

  afterEach(() => {
    return User.destroy({ where: {} });
  });

  it('should begin with no users', () => {
    return User.findAll().should.eventually.have.length(0);
  });

  describe('#create', () => {
    it('should make new user with an _id', () => {
      const user = { name: 'Fake User', email };
      return User.create(user).then(created => {
        created.should.have.property('_id');
        created.name.should.equal(user.name);
        created.email.should.equal(user.email);
      });
    });
  });

  describe('#email', () => {
    const invalidEmail = 'not-an-email';

    it('should fail when creating with an invalid email', () => {
      const user = { name: 'Fake User', email: invalidEmail };
      return User.create(user).should.be.rejected;
    });

    it('should fail when saving with an invalid email', () => {
      const user = { name: 'Fake User', email };
      return User.create(user).then(created => {
        created.email = invalidEmail;
        return created.save().should.be.rejected;
      });
    });

    it('should fail when saving duplicate email', () => {
      const user1 = { name: 'Fake User 1', email };
      const user2 = { name: 'Fake User 2', email };
      return User.create(user1).then(() => {
        return User.create(user2).should.be.rejected;
      });
    });
  });
});
