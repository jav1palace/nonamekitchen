import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  notes?: string;
}
