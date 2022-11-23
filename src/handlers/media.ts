import { uploadMedia } from '@services/twitter';
import { unlink } from 'fs/promises';
import { AsyncRequestHandler } from 'handlers';
import responses from 'responses';

export const uploadMediaHandler: AsyncRequestHandler = async (
  req, res, next
) => {

  if (!req.file) {
    return res.status(400).json(responses.failure('ファイルがアップロードされていません.'));
  }

  const uploaded = await uploadMedia(req.file.path, req.file.mimetype);
  await unlink(req.file.path);

  if (uploaded.isErr()) {
    return next(uploaded.error);
  }

  return res.json(responses.success({
    media_id_string: uploaded.value,
  }));
}