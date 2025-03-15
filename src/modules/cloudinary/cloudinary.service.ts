import { Injectable, Logger } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse
} from 'cloudinary';

@Injectable()
class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    options?: UploadApiOptions
  ): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) =>
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error || !result) {
            Logger.error(error?.message || 'No result from Cloudinary upload');
            return reject(new Error('upload fail!'));
          }
          resolve(result);
        })
        .end(file.buffer)
    );
  }
}

export default CloudinaryService;
