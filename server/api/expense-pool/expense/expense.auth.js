import compose from 'composable-middleware';
import { Expense } from '../../../db';
import { handleError, handleNotFound } from '../../../utils';

/**
 * Finds expense from expenseId in params and adds req.expense
 *
 * Responds 404 Not Found if expense cannot be found, else decorates
 * req with found expense.
 */
const decorateWithExpense = (req, res, next) => {
  Expense.findById(req.params.expenseId)
    .then(handleNotFound(res))
    .then(expense => {
      if (expense) {
        req.expense = expense;
        next();
      }
    })
    .catch(handleError(res));
};

/**
 * Checks if req.expense is an expense of req.expensePool
 *
 * Responds 404 Not Found if expense is not a pool expense.
 * Prevents users from submitting requests using pool ids they
 * are members of with expenseIds for expenses in other pools.
 */
const checkExpensePoolId = (req, res, next) => {
  if (req.expense.ExpensePoolId === req.expensePool._id) {
    return next();
  }
  return res.status(404).send('Not expense pool expense.');
};

/**
 * Checks to see if req.expense user is req.user.
 *
 * Responds 403 Forbidden if req.user does not match
 */
const checkUserId = (req, res, next) => {
  if (req.expense.UserId === req.user._id) {
    return next();
  }
  return res.status(403).send('Not expense creator');
};

/**
 * Authorization middleware that responds 404 if req.expensePool does not have
 * expense specified by params as an expense.
 */
export const isPoolExpense = () => compose().use(decorateWithExpense).use(checkExpensePoolId);

/**
 * Authorization middleware that responds 403 if req.user is not creator of
 * expense specified by the request params.
 */
export const isExpenseUser = () => compose().use(isPoolExpense()).use(checkUserId);
