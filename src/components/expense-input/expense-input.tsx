import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { createExpense } from '../../client/api';
import { CreateExpenseDto } from '../../server/expenses/dto/create-expense.dto';
import {
  NNK_CURRENCIES,
  NNK_DONORS,
  NNK_EXPENSES_CATEGORIES,
  NNK_EXPENSES_CONCEPTS,
  NNK_TEAMS,
} from '../../server/expenses/expenses.constants';

import styles from './expense-input.module.css';

export function ExpenseForm() {
  const [error] = useState('');

  const getOptions = (options) => {
    return (Object.keys(options) as Array<keyof typeof String>).map((key) => {
      return (
        <option key={key} value={key}>
          {options[key]}
        </option>
      );
    });
  };
  return (
    <div className={styles.login_box + ' p-3'}>
      <h1 className="display-6 mb-3">New Expense</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : null}
      <Formik
        initialValues={{
          expenseDate: new Date().toISOString().split('T')[0],
          team: '',
          category: '',
          concept: '',
          amount: '',
          currency: '',
          donor: '',
          notes: '',
        }}
        onSubmit={(
          expense: CreateExpenseDto,
          { setSubmitting }: FormikHelpers<any>,
        ) => {
          setTimeout(() => {
            createExpense(expense);
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="expenseDate"
              name="expenseDate"
              aria-describedby="expenseDateHelp"
              type="date"
            />
          </div>

          <div className="mb-3">
            <Field
              as="select"
              className="form-control"
              id="team"
              name="team"
              placeholder="Team"
              aria-describedby="teamHelp"
            >
              <option>Choose one team</option>
              {getOptions(NNK_TEAMS)}
            </Field>
          </div>

          <div className="mb-3">
            <Field
              as="select"
              className="form-control"
              id="category"
              name="category"
              placeholder="Category"
              aria-describedby="categoryHelp"
            >
              <option>Choose one category</option>
              {getOptions(NNK_EXPENSES_CATEGORIES)}
            </Field>
          </div>

          <div className="mb-3">
            <Field
              as="select"
              className="form-control"
              id="concept"
              name="concept"
              placeholder="Concept"
              aria-describedby="conceptHelp"
            >
              <option>Choose one concept</option>
              {getOptions(NNK_EXPENSES_CONCEPTS)}
            </Field>
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              aria-describedby="amountHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              as="select"
              className="form-control"
              id="currency"
              name="currency"
              placeholder="Currency"
              aria-describedby="currencyHelp"
            >
              <option>Choose the currency</option>
              {getOptions(NNK_CURRENCIES)}
            </Field>
          </div>

          <div className="mb-3">
            <Field
              as="select"
              className="form-control"
              id="donor"
              name="donor"
              placeholder="Donor"
              aria-describedby="donorHelp"
            >
              <option>Choose a donor</option>
              {getOptions(NNK_DONORS)}
            </Field>
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="notes"
              name="notes"
              placeholder="Notes"
              aria-describedby="notesHelp"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
