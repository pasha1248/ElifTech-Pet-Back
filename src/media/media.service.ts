import { Injectable } from '@nestjs/common';
import { IMediaResponse } from './media.interface';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsPhotoEntity } from 'src/car/entities/photo-car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(CarsPhotoEntity)
    private readonly carsPhotoRepository: Repository<CarsPhotoEntity>,
  ) {}
  async saveMedia(
    mediaFile: Express.Multer.File,
    folder: string,
    id: string,
    isMain: boolean,
  ): Promise<CarsPhotoEntity> {
    if (folder === 'videos') {
      const uploadFolder = `${path}/uploads/${folder}`;
      await ensureDir(uploadFolder);

      await writeFile(
        `${uploadFolder}/${mediaFile.originalname}`,
        mediaFile.buffer,
      );
    }
    if (folder === 'carPhoto') {
      const savePhoto = await this.cloudinaryService.uploadImage(mediaFile);

      const savePhotoRepo = this.carsPhotoRepository.create({
        path: savePhoto.url,
        isMain: isMain ? isMain : false,
      });
      const save = await this.carsPhotoRepository.save(savePhotoRepo);

      return save;
    }

    return;
  }

  async deleteCarPhoto(photoId: string) {
    const photo = await this.carsPhotoRepository.delete(photoId);
    await this.cloudinaryService.destroyImage(photoId);
  }
}
