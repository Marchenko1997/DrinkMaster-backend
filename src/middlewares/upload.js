import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import logger from '../helpers/logger.js';


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
      logger.info('Processing file for Cloudinary upload', {
        originalname: file.originalname,
        fieldname: file.fieldname,
      });

      let folder;
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname);
      const suffix = crypto.randomUUID();

      file.originalname = `${basename}-${suffix}`;
      logger.info('File renamed for Cloudinary', {
        newOriginalname: file.originalname,
      });


      if (file.fieldname === 'avatar') {
        folder = 'avatars';
      } else if (file.fieldname === 'drinkThumb') {
        folder = 'drinks';
      } else {
        folder = 'others';
      }

      logger.info('Folder determined for Cloudinary upload', { folder });

      return {
        folder: folder,
        allowed_formats: ['jpg', 'png'],
        public_id: file.originalname,
        transformation: [
          { height: 350, crop: 'scale' },
          { height: 700, crop: 'scale' },
        ],
      };
    } catch (error) {
      logger.error('Error in CloudinaryStorage params configuration', {
        error: error.message,
      });
      throw error;
    }
  },
});


export const upload = multer({ storage });

logger.info('Multer storage configured successfully');
