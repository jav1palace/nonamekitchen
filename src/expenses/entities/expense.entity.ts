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

  @Column()
  inputDate: Date;

  @Column()
  expenseDate: Date;

  //un?  Do they need this field stores or show anywhere

  @Column()
  team: NNK_TEAMS;

  @Column()
  category: NNK_EXPENSES_CATEGORIES;

  @Column()
  concept: NNK_EXPENSES_CONCEPTS;

  @Column()
  amount: number;

  @Column()
  currency: NNK_CURRENCIES;

  @Column()
  totalAmount: number;

  @Column()
  donor: NNK_DONORS;

  @Column({ nullable: true })
  notes: string;
}
