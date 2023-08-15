import formidable from 'formidable';
import { createReadStream } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import S3Client from '@/lib/spaces';

export const config = {
  api: {
    bodyParser: false,
  },
};

type FileWithMetadata = {
  originalFilename: string;
  filepath: string;
  newFilename: string;
  size: number;
  mimetype: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (!files.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const file = files.file as FileWithMetadata[];
      const email = fields.email[0] ? fields.email[0] + '/' : '';
      const name = fields.name[0] ? fields.name[0] + '_' : '';
      const location = fields.location[0] ? fields.location[0] + '/' : '';
      try {
        const key =
          'setickets/assets/' + email + location + name + new Date().getTime();
        await S3Client.putObject({
          Bucket: 'sch',
          Key: key,
          Body: createReadStream(file[0].filepath),
          ACL: 'public-read',
          ContentType: file[0].mimetype,
        });
        return res.status(200).json({
          success: true,
          message: 'Berhasil menyimpan file',
          data: { url: key },
        });
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
  }

  if (req.method === 'DELETE') {
    const { key } = req.query;
    if (!key)
      return res
        .status(400)
        .json({ success: false, message: 'No file to delete' });

    try {
      await S3Client.deleteObject({
        Bucket: 'sch',
        Key: key as string,
      });
      return res.status(200).json({
        success: true,
        message: 'Berhasil menghapus file',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  }
}
