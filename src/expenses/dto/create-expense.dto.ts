import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  NNK_CURRENCIES,
  NNK_DONORS,
  NNK_EXPENSES_CATEGORIES,
  NNK_EXPENSES_CONCEPTS,
  NNK_TEAMS,
} from '../expenses.constants';

export class CreateExpenseDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  expenseDate: Date;

  //un?  Do they need this field stores or show anywhere
  @IsEnum(NNK_TEAMS)
  @IsNotEmpty()
  team: NNK_TEAMS;

  @IsEnum(NNK_EXPENSES_CATEGORIES)
  @IsNotEmpty()
  category: NNK_EXPENSES_CATEGORIES;

  @IsEnum(NNK_EXPENSES_CONCEPTS)
  @IsNotEmpty()
  concept: NNK_EXPENSES_CONCEPTS;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(NNK_CURRENCIES)
  @IsNotEmpty()
  currency: NNK_CURRENCIES;

  @IsEnum(NNK_DONORS)
  @IsNotEmpty()
  donor: NNK_DONORS;

  @IsString()
  @IsOptional()
  notes?: string;
}
