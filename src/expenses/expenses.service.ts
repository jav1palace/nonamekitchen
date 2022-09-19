import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const newExpense = this.expenseRepository.create(createExpenseDto);
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
}
