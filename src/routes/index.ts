import express from 'express';
import { homeHandler } from '../handlers/home';

const router = express.Router();

/* GET home page. */
router.get('/', homeHandler);

export default router;
