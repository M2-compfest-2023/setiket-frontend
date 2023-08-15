import { S3 } from '@aws-sdk/client-s3';

const S3Client = new S3({
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  region: 'sgp1',
  credentials: {
    accessKeyId: 'DO00FL3E72EEWFDXBGH3',
    secretAccessKey: '/PIebvvtwlxy3YYiCdK5pzeZJ0HSJryVAWVFxTux2FA',
  },
});
export default S3Client;
