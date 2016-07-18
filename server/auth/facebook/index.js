import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'user_about_me'],
  failureRedirect: '/signup',
  session: false,
}));

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/signup',
  session: false,
}));

export default router;
