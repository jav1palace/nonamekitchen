import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';

import styles from './expense-input.module.css';

export function ExpenseForm() {
  const [error] = useState('');

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
          expenseDate: '',
          team: '',
          category: '',
          concept: '',
          amount: '',
          currency: '',
          donor: '',
          notes: '',
        }}
        onSubmit={(credentials: any, { setSubmitting }: FormikHelpers<any>) => {
          setTimeout(() => {
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
              placeholder="Expense Date"
              data-provide="datepicker"
              aria-describedby="expenseDateHelp"
              type="date"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="team"
              name="team"
              placeholder="Team"
              aria-describedby="teamHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="category"
              name="category"
              placeholder="Category"
              aria-describedby="categoryHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="concept"
              name="concept"
              placeholder="Concept"
              aria-describedby="conceptHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="amount"
              name="amount"
              placeholder="Amount"
              aria-describedby="amountHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="currency"
              name="currency"
              placeholder="Currency"
              aria-describedby="currencyHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="donor"
              name="donor"
              placeholder="Donor"
              aria-describedby="donorHelp"
            />
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
