import { validateInput } from '@app/middlewares';
import { Router } from 'express';
import { syncRoute } from 'handlers';
import { uploadMediaHandler } from 'handlers/media';
import multer from 'multer';

const upload = multer({dest: 'storage/media'});

const router = Router();

router.post(
  '/upload/',
  upload.single('file'),
  validateInput,
  syncRoute(uploadMediaHandler)
);

export default router;