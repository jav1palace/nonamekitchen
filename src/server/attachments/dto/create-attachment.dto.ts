import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  filename: string;

  @IsNotEmpty()
  data: Uint8Array;
}
