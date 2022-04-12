import { Request, Response } from 'express';

import { writeFileSync } from 'fs';
import path from 'path';

const outputPath = path.resolve(__dirname, 'resources');

function uploadOnce(req: any, res: Response) {
  const { body, files } = req;

  writeFileSync(`${outputPath}/${files[0].originalname}`, files[0].buffer);

  const result = {
    data: '上传成功',
    success: true,
  };

  res.json(result);
}

export default {
  'POST /api/upload/once': uploadOnce,
};
