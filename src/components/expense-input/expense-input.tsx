import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
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
import { DatePickerField } from './date-picker/date-picker';
import styles from './expense-input.module.css';
import { FieldItem } from './item/item';
import { ExpenseSchema } from './schema/expense.schema';

export const ExpenseForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const initialValues: CreateExpenseDto = {
    expenseDate: new Date(),
    team: undefined,
    category: undefined,
    concept: undefined,
    amount: undefined,
    currency: undefined,
    donor: undefined,
    notes: undefined,
  };

  return (
    <div className={styles.login_box + ' p-3'}>
      {error ? (
        <div className="alert alert-danger" role="alert">
          <b>Error:</b> {error}
        </div>
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={ExpenseSchema}
        onSubmit={(
          expense: CreateExpenseDto,
          { setSubmitting }: FormikHelpers<CreateExpenseDto>,
        ) => {
          setError('');
          setTimeout(() => {
            const success = () =>
              router.push({
                pathname: '/success',
                query: {
                  path: '/input',
                  message: 'Your expense has been created successfully',
                },
              });
            const failure = async (response: Response) => {
              const responseJSON = await response.json();
              setError(responseJSON['message']);
              setSubmitting(false);
            };
            createExpense(expense, success, failure);
          }, 500);
        }}
      >
        {({
          values,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <Form>
            {isSubmitting ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-grow" role="status"></div>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <label> Expense Date</label>
                  <DatePickerField
                    name="expenseDate"
                    value={values.expenseDate}
                    onChange={setFieldValue}
                  />
                  {errors.expenseDate && touched.expenseDate && (
                    <div className="text-danger">
                      {String(errors.expenseDate)}
                    </div>
                  )}
                </div>

                <FieldItem
                  name="team"
                  as="select"
                  errors={errors}
                  touched={touched}
                  value={values.team}
                  onChange={setFieldValue}
                  options={NNK_TEAMS}
                />

                <FieldItem
                  name="category"
                  as="select"
                  errors={errors}
                  touched={touched}
                  value={values.category}
                  onChange={setFieldValue}
                  options={NNK_EXPENSES_CATEGORIES}
                />

                <FieldItem
                  name="concept"
                  as="select"
                  errors={errors}
                  touched={touched}
                  value={values.concept}
                  onChange={setFieldValue}
                  options={NNK_EXPENSES_CONCEPTS}
                />

                <FieldItem
                  name="amount"
                  type="number"
                  errors={errors}
                  touched={touched}
                  value={values.amount}
                  onChange={setFieldValue}
                />

                <FieldItem
                  name="currency"
                  as="select"
                  errors={errors}
                  touched={touched}
                  value={values.currency}
                  onChange={setFieldValue}
                  options={NNK_CURRENCIES}
                />

                <FieldItem
                  name="donor"
                  as="select"
                  errors={errors}
                  touched={touched}
                  value={values.donor}
                  onChange={setFieldValue}
                  options={NNK_DONORS}
                />

                <FieldItem
                  name="notes"
                  type="textarea"
                  errors={errors}
                  touched={touched}
                  value={values.notes}
                  onChange={setFieldValue}
                />

                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
