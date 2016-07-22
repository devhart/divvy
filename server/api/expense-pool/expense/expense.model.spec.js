import db, { User, ExpensePool, Expense } from '../../../db';

const cleanModels = () => User.destroy({ where: {} })
  .then(() => ExpensePool.destroy({ where: {} }))
  .then(() => Expense.destroy({ where: {} }));

describe('Expense Model', () => {
  before(() => db.sync().then(cleanModels));

  afterEach(cleanModels);

  it('should begin with no expenses', () => {
    return Expense.findAll().should.eventually.have.length(0);
  });

  describe('Constraints', () => {
    it('should build and save a new Expense', () => {
      const expenseRecord = {};
      return Expense.create(expenseRecord).then(expense => {
        expense.should.have.property('_id');
        expense._id.should.not.be.null;
        return Expense.findById(expense._id).then(found => {
          found._id.should.equal(expense._id);
        });
      });
    });
  });

  describe('Relationships', () => {
    const userRecord = { name: 'User', email: 'user@example.com' };
    const expenseRecords = [
      { name: 'Expense1' },
      { name: 'Expense2' },
    ];
    let user;
    let expense1;
    let expense2;

    beforeEach(() => {
      return User.create(userRecord)
        .then(createdUser => user = createdUser)
        .then(() => Expense.bulkCreate(expenseRecords))
        .then(() => Expense.all())
        .then(expenses => [expense1, expense2] = expenses);
    });

    it('should bulk create user, pools and expenses', () => {
      user.email.should.equal('user@example.com');
      expense1.name.should.equal('Expense1');
      expense2.name.should.equal('Expense2');
    });

    describe('User', () => {
      describe('#setUser', () => {
        it('should set a user to expense user', () => {
          return expense1.setUser(user)
            .then(() => expense1.getUser())
            .then(expenseUser => expenseUser._id.should.equal(user._id))
            .then(() => expense1.UserId.should.equal(user._id));
        });

        it('should allow the same user to be set as User for many expenses', () => {
          return expense1.setUser(user)
            .then(() => expense1.getUser())
            .then(expenseUser => expenseUser._id.should.equal(user._id))
            .then(() => expense1.UserId.should.equal(user._id))
            .then(() => expense2.setUser(user))
            .then(() => expense2.getUser())
            .then(expenseUser => expenseUser._id.should.equal(user._id))
            .then(() => expense2.UserId.should.equal(user._id));
        });
      });
    });
  });
});
