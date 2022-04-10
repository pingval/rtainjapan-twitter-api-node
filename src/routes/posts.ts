import express from 'express';
import { postNewTweetHandler } from '../handlers/posts';

const router = express.Router();

router.post('/', postNewTweetHandler);

export default router;