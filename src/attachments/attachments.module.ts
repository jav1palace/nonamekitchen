import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
