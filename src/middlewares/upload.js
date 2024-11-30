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
      console.log('File received:', {
        originalname: file.originalname,
        fieldname: file.fieldname,
      });
      logger.info('Processing file for Cloudinary upload', {
        originalname: file.originalname,
        fieldname: file.fieldname,
      });
      let folder;
      const extname = path.extname(file.originalname);
      const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID();

            console.log('File basename:', basename);
            console.log('File extension:', extname);
            console.log('Generated suffix:', suffix);

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

          console.log('Determined folder:', folder);
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
        console.error(
          'Error in CloudinaryStorage params configuration:',
          error,
        );
      logger.error('Error in CloudinaryStorage params configuration', {
        error: error.message,
      });
      throw error;
    }
  },
});


export const upload = multer({ storage });

logger.info('Multer storage configured successfully');
