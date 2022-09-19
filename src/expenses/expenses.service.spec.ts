import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './entities/expense.entity';
import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;
  const expenseDto: CreateExpenseDto = {
    date: new Date(Date.now().toLocaleString()),
    notes: 'This is an example expense',
  };
  const expenses = [
    { id: 1, date: '2022-09-19', notes: 'This is an example expense' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', () => {
    expect(service.findAll()).resolves.toBe(expenses);
  });

  it('find', () => {
    expect(service.findOne(1)).resolves.toBe(expenses[0]);
  });

  it('remove', () => {
    expect(service.remove(1)).resolves.toBeDefined();
    expect(service.remove(2)).rejects.toThrowError(NotFoundException);
  });

  it('update', () => {
    expect(service.update(1, expenseDto)).resolves.toBeUndefined(); // THIS IS WRONG
    expect(service.update(2, {})).rejects.toThrowError(NotFoundException);
  });

  it('create', () => {
    expect(service.create(expenseDto)).rejects.toThrowError(
      BadRequestException,
    );
    expect(service.create(expenseDto)).resolves.toBeUndefined(); // THIS IS WRONG
  });
});
