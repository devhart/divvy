import db, { User, ExpensePool, Expense } from '../../db';

const cleanModels = () => User.destroy({ where: {} })
  .then(() => ExpensePool.destroy({ where: {} }))
  .then(() => Expense.destroy({ where: {} }));

describe('ExpensePool Model', () => {
  before(() => db.sync().then(cleanModels));

  afterEach(cleanModels);

  it('should begin with no expense pools', () => {
    return ExpensePool.findAll().should.eventually.have.length(0);
  });

  describe('Constraints', () => {
    it('should build and save a new ExpensePool', () => {
      const expensePoolRecord = {};
      return ExpensePool.create(expensePoolRecord).then(expensePool => {
        expensePool.should.have.property('_id');
        expensePool._id.should.not.be.null;
        return ExpensePool.findById(expensePool._id).then(found => {
          found._id.should.equal(expensePool._id);
        });
      });
    });
  });
});
