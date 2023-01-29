import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    video: boolean,
    photo: boolean,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (photo)
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            folder: 'coverPhoto',
            format: 'webp',
            width: 1280,
            height: 1020,
            gravity: 'auto',
            crop: 'fill',

            maxImageFileSize: 10000000,
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result);
          },
        );
        toStream(file.buffer).pipe(upload);
      });

    if (video) console.log('video');
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_chunked_stream(
        {
          resource_type: 'auto',
          folder: 'promotionalVideos',
          uplaod_large: true,
          eager_async: true,
          chunk_size: 6000000,

          // eager: [{ format: 'webm' }],

          // notification_url: 'http://localhost:3000/my-courses/create-course',
          // format: 'webm',
          // gravity: 'auto',
          // crop: 'fill',
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  // async uploadAvatar(
  //   file: Express.Multer.File,
  // ): Promise<UploadApiResponse | UploadApiErrorResponse> {
  //   return new Promise((resolve, reject) => {
  //     const upload = v2.uploader.upload_stream(
  //       {
  //         folder: 'MyFinance',
  //         format: 'webp',
  //         width: 50,
  //         height: 50,
  //         crop: 'limit',
  //         maxImageFileSize: 500000,
  //       },
  //       (error, result) => {
  //         if (error) return reject(error);
  //         resolve(result);
  //       },
  //     );
  //   });
  // }

  async destroyImage(publicId: string): Promise<void> {
    await v2.uploader.destroy(`coverPhoto/${publicId}`);

    console.log('Image deleted');
  }
  async destroyVideo(publicId: string): Promise<void> {
    await v2.uploader.destroy(`promotionalVideos/${publicId}`);

    console.log('Image deleted');
  }
}
