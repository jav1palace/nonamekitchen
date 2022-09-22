import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { NNK_CURRENCIES } from './expenses.constants';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create(createExpenseDto);
    console.log('newExpense: ' + newExpense);
    this.calculateTotalAmount(newExpense);
    return this.expenseRepository.save(newExpense);
  }

  findAll() {
    return this.expenseRepository.find();
  }

  findOne(id: number) {
    return this.expenseRepository.findOneBy({ id });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const toUpdate = await this.findOne(id);

    if (!toUpdate) {
      throw new NotFoundException("Can't find the expense to update.");
    }

    const updated = Object.assign(toUpdate, updateExpenseDto);

    return this.expenseRepository.save(updated);
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("Can't find the expense to delete");
    }

    return this.expenseRepository.delete(id);
  }

  calculateTotalAmount(newExpense) {
    console.log('Aqui: ' + newExpense);
    switch (newExpense.currency) {
      case NNK_CURRENCIES.BAM:
        newExpense.totalAmount = newExpense.amount * 0.51;
        break;
      case NNK_CURRENCIES.DINAR:
        newExpense.totalAmount = newExpense.amount * 0.0085;
        break;
      case NNK_CURRENCIES.HRK:
        newExpense.totalAmount = newExpense.amount / 7.4991;
        break;
      case NNK_CURRENCIES.EURO:
        newExpense.totalAmount = newExpense.amount;
        break;
    }
  }
}
