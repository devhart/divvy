import _ from 'lodash';
import development from './development';
import test from './test';
import production from './production';

const envSettings = Object.create(null);
envSettings.development = development;
envSettings.test = test;
envSettings.production = production;

const baseSettings = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: `${process.env.DOMAIN || ''}/auth/facebook/callback`,
  },
};

export default _.merge(baseSettings, envSettings[baseSettings.env] || {});
