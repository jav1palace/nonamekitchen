import { CreateExpenseDto } from '../server/expenses/dto/create-expense.dto';
import { Credentials } from './interfaces/api.interface';
const POST_METHOD = 'POST';
const GET_METHOD = 'GET';

const doFetch = (
  url: string,
  method: string,
  payload: object,
  extraOptions: object,
) =>
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(payload && { body: JSON.stringify(payload) }),
    ...(extraOptions && { extraOptions }),
  });

const post = (
  url: string,
  payload: object,
  extraOptions: object,
  success: () => void,
  failure: (response: Response) => void,
) =>
  doFetch(url, POST_METHOD, payload, extraOptions).then(
    async (response: Response) => {
      processResponse(response, success, failure);
    },
  );

const get = (
  url: string,
  extraOptions: object,
  success: () => void,
  failure: (response: Response) => void,
) =>
  doFetch(url, GET_METHOD, null, extraOptions).then(
    async (response: Response) => {
      processResponse(response, success, failure);
    },
  );

const processResponse = async (
  response: Response,
  success: () => void,
  failure: (response: Response) => void,
) => {
  response.status < 300 ? success() : failure(response);
};

export const login = async (
  credentials: Credentials,
  success: () => void,
  failure: (response: Response) => void,
) => post('/auth/login', credentials, null, success, failure);

export const createExpense = async (
  expenseDTO: CreateExpenseDto,
  success: () => void,
  failure: (response: Response) => void,
) => post('/expenses', expenseDTO, null, success, failure);

export const getAllUsers = async () =>
  get('/users', { credentials: 'include' }, undefined, undefined);
