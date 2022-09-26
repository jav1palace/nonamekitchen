import { CreateExpenseDto } from './dto/create-expense.dto';
import {
  NNK_CURRENCIES,
  NNK_DONORS,
  NNK_EXPENSES_CATEGORIES,
  NNK_EXPENSES_CONCEPTS,
  NNK_TEAMS,
} from './expenses.constants';

export const expenseDto: CreateExpenseDto = {
  expenseDate: new Date(Date.now().toLocaleString()),
  team: NNK_TEAMS.BHC,
  category: NNK_EXPENSES_CATEGORIES.NFIs,
  concept: NNK_EXPENSES_CONCEPTS.clothes,
  amount: 100.0,
  currency: NNK_CURRENCIES.BAM,
  donor: NNK_DONORS.DONORBOX,
  notes: 'This is an example expense',
};

export const expenses = [
  {
    ...expenseDto,
    id: 1,
    createdDate: new Date(Date.now()),
  },
];
