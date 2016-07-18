import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export default (User, config) => {
  const settings = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['displayName', 'emails'],
  };

  // TODO: Create or lookup user based on facebook response.
  const handler = (accessToken, refreshToken, profile, done) => done();

  passport.use(new FacebookStrategy(settings, handler));
};
