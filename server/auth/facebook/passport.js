import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export default (User, config) => {
  const settings = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['displayName', 'emails'],
  };

  const handler = (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done();
  };

  passport.use(new FacebookStrategy(settings, handler));
};
