import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { threadId } from 'worker_threads';
import { MediaService } from './media.service';

@UseGuards(AccessTokenGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(200)
  @Post()
  @UseInterceptors(FileInterceptor('media'))
  async uploadMediaFile(
    @Req() req: Request,
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string,
    @Query('isMain') isMain?: boolean,
  ) {
    const id = req.user['id'];
    return this.mediaService.saveMedia(mediaFile, folder, id, isMain);
    // console.log(mediaFile);
  }

  @Get()
  async delete(
    @Query('type') type: string,
    @Query('photoId') photoId: string,
    @Query('photoUrl') photoUrl: string,
  ) {
    return this.mediaService.deleteCarPhoto(type, photoId, photoUrl);
  }
}
