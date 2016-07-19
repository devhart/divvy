import express from 'express';
import passport from 'passport';
import { setTokenCookie } from '../auth.service';

const router = express.Router();

router.get('/', passport.authenticate('facebook', {
  scope: ['email', 'public_profile'],
  failureRedirect: '/login',
  session: false,
}));

router.get('/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  session: false,
}), setTokenCookie);

export default router;
