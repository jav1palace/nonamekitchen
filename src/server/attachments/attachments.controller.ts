import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  StreamableFile,
  Res,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { AttachmentsService } from './attachments.service';
import { memoryStorage } from 'multer';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get(':id')
  async getAttachmentById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.attachmentsService.findOne(id);
    const stream = Readable.from(file.data);
    // response.set({
    //   'Content-Disposition': `inline; filename="${file.filename}"`,
    //   'Content-Type': 'image',
    // });
    return new StreamableFile(stream);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  async uploadImage(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.attachmentsService.uploadAttachment(file);
  }

  @Get()
  findAll() {
    return this.attachmentsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(+id);
  }
}
