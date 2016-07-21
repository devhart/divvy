import compose from 'composable-middleware';
import { ExpensePool } from '../../db';

const handleError = (res, error) => {
  console.log(error);
  res.status(500).send(error);
};

const handleNotFound = res => {
  return entity => {
    if (entity) {
      return entity;
    }
    res.sendStatus(404);
    return null;
  };
};

/**
 * Finds ExpensePool from params and adds req.expensePool
 *
 * Responds 404 Not Found if pool cannot be found, else decorates
 * req with found pool.
 */
const decorateWithPool = (req, res, next) => {
  ExpensePool.findById(req.params.id)
    .then(handleNotFound(res))
    .then(pool => {
      if (pool) {
        req.expensePool = pool;
        next();
      }
    })
    .catch(error => handleError(res, error));
};

/**
 * Checks to see if req.user is a member of req.expensePool
 *
 * Requires req.expensePool and req.user to be set.
 * Responds with 403 Forbidden if user is not a pool member.
 */
const isMember = (req, res, next) => {
  req.expensePool.hasUser(req.user)
    .then(result => {
      if (result) {
        return next();
      }
      return res.status(403).send('Not expense pool member.');
    })
    .catch(error => handleError(res, error));
};

/**
 * Authorization middleware that responds 403 if req.user is not a member of
 * expense pool specified by the request params.
 */
export const isPoolMember = () => compose().use(decorateWithPool).use(isMember);
