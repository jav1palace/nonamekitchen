import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  NNK_TEAMS,
  NNK_EXPENSES_CATEGORIES,
  NNK_EXPENSES_CONCEPTS,
  NNK_DONORS,
  NNK_CURRENCIES,
} from '../expenses.constants';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column()
  expenseDate: Date;

  //un?  Do they need this field stores or show anywhere

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 32, nullable: false })
  team: NNK_TEAMS;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  category: NNK_EXPENSES_CATEGORIES;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  concept: NNK_EXPENSES_CONCEPTS;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 32, nullable: false })
  currency: NNK_CURRENCIES;

  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @IsString({ always: true })
  @Column({ type: 'varchar', length: 32, nullable: false })
  donor: NNK_DONORS;

  @IsOptional({ always: true })
  @IsString({ always: true })
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  notes: string;
}
