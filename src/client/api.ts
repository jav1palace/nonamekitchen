import { CreateExpenseDto } from '../server/expenses/dto/create-expense.dto';
import { Credentials } from './interfaces/api.interface';

export const login = async (credentials: Credentials) => {
  return fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export const createExpense = async (expenseDTO: CreateExpenseDto) => {
  return fetch('/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseDTO),
  });
};

export const getAllUsers = async () => {
  return fetch('/users', {
    method: 'GET',
    credentials: 'include',
  });
};
