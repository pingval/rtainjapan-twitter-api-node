import { uploadMedia } from '@services/twitter.v1';
import { AsyncRequestHandler } from 'handlers';
import responses from 'responses';

export const uploadMediaHandler: AsyncRequestHandler = async (req, res) => {

  if (!req.file) {
    return res.status(400).json(responses.failure('ファイルがアップロードされていません.'));
  }

  const uploaded = await uploadMedia(req.file.path, req.file.mimetype);

  return res.json(responses.success({
    media_id_string: uploaded,
  }));
}