import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

export default (User, config) => {
  const settings = {
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'link', 'photos', 'email'],
  };

  const handler = (accessToken, refreshToken, profile, done) => {
    User.find({ where: { facebookId: profile.id } })
      .then(user => {
        if (user) {
          return done(null, user);
        }

        const newUser = User.build({
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookId: profile.id,
          imageUrl: profile.photos[0].value,
          facebook: profile._json,
        });
        return newUser.save()
          .then(createdUser => done(null, createdUser))
          .catch(err => done(err));
      })
      .catch(err => done(err));
  };

  passport.use(new FacebookStrategy(settings, handler));
};
