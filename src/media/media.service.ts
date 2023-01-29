import { Injectable } from '@nestjs/common';
import { IMediaResponse } from './media.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursePhotoEntity } from 'src/course/entities/photo-course.entity';

@Injectable()
export class MediaService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(CoursePhotoEntity)
    private readonly carsPhotoRepository: Repository<CoursePhotoEntity>,
  ) {}
  async saveMedia(
    mediaFile: Express.Multer.File,
    folder: string,
    id: string,
    isMain: boolean,
  ): Promise<CoursePhotoEntity> {
    if (folder === 'promotionalVideos') {
      console.log(folder, 'video');

      const video = true;
      const photo = false;
      const savePhoto = await this.cloudinaryService.uploadImage(
        mediaFile,
        video,
        photo,
      );
      console.log(savePhoto);

      const savePhotoRepo = this.carsPhotoRepository.create({
        path: savePhoto.url,
        isMain: isMain ? isMain : false,
      });
      const save = await this.carsPhotoRepository.save(savePhotoRepo);

      return save;
    }
    if (folder === 'coverPhoto') {
      console.log(folder, 'photo');
      const video = false;
      const photo = true;
      const savePhoto = await this.cloudinaryService.uploadImage(
        mediaFile,
        video,
        photo,
      );
      console.log(savePhoto);

      const savePhotoRepo = this.carsPhotoRepository.create({
        path: savePhoto.url,
        isMain: isMain ? isMain : false,
      });
      const save = await this.carsPhotoRepository.save(savePhotoRepo);

      return save;
    }

    return;
  }

  async deleteCarPhoto(type: string, photoId: string, photoUrl: string) {
    const avatarPublicId = photoUrl.split('/').pop().split('.')[0];

    const photo = await this.carsPhotoRepository.delete(photoId);

    if ((type = 'photo')) {
      return await this.cloudinaryService.destroyImage(avatarPublicId);
    }

    return await this.cloudinaryService.destroyImage(avatarPublicId);
  }
}
