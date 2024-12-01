import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import logger from '../helpers/logger.js';


console.log('Cloudinary Config:', {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

logger.info('Cloudinary configuration initialized', {
  cloud_name: process.env.CLOUD_NAME,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    try {
      console.log('File received for upload:', {
        originalname: file.originalname,
        fieldname: file.fieldname,
      });
      let folder;
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname);
      const suffix = crypto.randomUUID();

      const newOriginalname = `${basename}-${suffix}`;
      console.log('Generated new filename:', newOriginalname);

      if (file.fieldname === 'avatar') {
        folder = 'avatars';
      } else if (file.fieldname === 'drinkThumb') {
        folder = 'drinks';
      } else {
        folder = 'others';
      }

      console.log('Determined upload folder:', folder);

      return {
        folder,
        allowed_formats: ['jpg', 'png'],
        public_id: newOriginalname,
        transformation: [
          { height: 350, crop: 'scale' },
          { height: 700, crop: 'scale' },
        ],
      };
    } catch (error) {
      console.error('Error in Cloudinary params function:', error);
      throw error;
    }
  },
});

export const upload = multer({ storage });

logger.info('Multer storage configured successfully');
