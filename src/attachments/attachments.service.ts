import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentsRepository: Repository<Attachment>,
  ) {}

  async uploadAttachment(file: Express.Multer.File): Promise<Attachment> {
    const newFile = await this.attachmentsRepository.create({
      filename: file.fieldname,
      data: file.buffer,
    });
    await this.attachmentsRepository.save(newFile);
    return newFile;
  }

  async findOne(id: number) {
    const file = await this.attachmentsRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  findAll() {
    return `This action returns all attachments`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
