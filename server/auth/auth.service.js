import compose from 'composable-middleware';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import config from '../config/environment';
import { User } from '../db';

const EXPIRY = 60 * 60 * 5;
const SECRET = config.secrets.session;
const validateJwt = expressJwt({ secret: SECRET });

/**
 * Include access_token query param in req.header for validateJwt.
 */
export const accessTokenHeader = (req, res, next) => {
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = `Bearer ${req.query.access_token}`;
  }
  next();
};

/**
 * Converts the req.user after validateJwt from just an object with an _id
 * property to a full User instance looked up from the database.
 */
const populateReqUser = (req, res, next) => {
  User.find({ where: { _id: req.user._id } })
    .then(user => {
      if (!user) {
        return res.status(401).end();
      }
      req.user = user;
      return next();
    })
    .catch(err => next(err));
};

export const isAuthenticated = () => compose()
  .use(compose().use(accessTokenHeader).use(validateJwt))
  .use(populateReqUser);

export const signToken = id => jwt.sign({ _id: id }, SECRET, { expiresIn: EXPIRY });

export const setTokenCookie = (req, res) => {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  res.cookie('token', signToken(req.user._id));
  return res.redirect('/');
};
