import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { expenseDto, expenses } from './expenses.mock';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        ExpensesService,
        {
          provide: getRepositoryToken(Expense),
          useValue: {
            find: jest.fn().mockResolvedValue(expenses),
            findOneBy: jest
              .fn()
              .mockResolvedValueOnce(expenses[0])
              .mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(new DeleteResult()),
            save: jest.fn().mockResolvedValue(expenses[0]),
            create: jest.fn().mockResolvedValue(expenses[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll', () => {
    expect(controller.findAll()).resolves.toBe(expenses);
  });

  it('find', () => {
    expect(controller.findOne(1)).resolves.toBe(expenses[0]);
  });

  it('remove', () => {
    expect(controller.remove(1)).resolves.toBeDefined();
    expect(controller.remove(2)).rejects.toThrowError(NotFoundException);
  });

  it('update', () => {
    expect(controller.update(1, expenseDto)).resolves.toEqual(expenses[0]);
    expect(controller.update(2, {})).rejects.toThrowError(NotFoundException);
  });

  it('create', () => {
    //expect(controller.create(expenseDto)).resolves.toEqual(expenses[0]);
  });
});
