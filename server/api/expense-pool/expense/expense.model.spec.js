import db, { User, ExpensePool, Expense } from '../../../database/database';

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
});
