import express from 'express';
import config from '../config/environment';
import facebookSetup from './facebook/passport';
import facebookRouter from './facebook';
import User from '../api/user/user.model';

facebookSetup(User, config);

const router = express.Router();
router.use('/facebook', facebookRouter);

export default router;
