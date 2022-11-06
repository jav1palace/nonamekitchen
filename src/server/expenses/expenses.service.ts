import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { NNK_CURRENCIES } from './expenses.constants';
import { GoogleService } from '../google/google.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly googleService: GoogleService,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create(createExpenseDto);
    newExpense.totalAmount = this.calculateTotalAmount(
      newExpense.amount,
      newExpense.currency,
    );
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

  async uploadAttachment(expenseId: number, file: Express.Multer.File) {
    const attachment = await this.googleService.uploadAttachment(file);
    this.update(expenseId, {
      attachment
    })
  }

  calculateTotalAmount(amount: number, currency: string): number {
    let totalAmount: number;
    switch (currency) {
      case NNK_CURRENCIES.BAM:
        totalAmount = amount * 0.51;
        break;
      case NNK_CURRENCIES.DINAR:
        totalAmount = amount * 0.0085;
        break;
      case NNK_CURRENCIES.HRK:
        totalAmount = amount / 7.4991;
        break;
      case NNK_CURRENCIES.EURO:
        totalAmount = amount;
        break;
    }
    return parseFloat(totalAmount.toFixed(2));
  }
}
