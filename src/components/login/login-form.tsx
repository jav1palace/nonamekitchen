import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { login } from '../../client/api';
import { Credentials } from '../../client/interfaces/api.interface';
import { LoginDto } from '../../server/users/dto/login.dto';
import { FieldItem } from '../expense/item/item';
import styles from './login-form.module.css';

const initialValues: LoginDto = {
  username: '',
  password: '',
};

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className={styles.login_box + ' p-3'}>
      <h1 className="display-6 mb-3">Login</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : null}
      <Formik
        initialValues={initialValues}
        onSubmit={(
          credentials: Credentials,
          { setSubmitting }: FormikHelpers<Credentials>,
        ) => {
          setTimeout(() => {
            const success = () => router.push('/new');
            const failure = async (response: Response) => {
              const responseJSON = await response.json();
              setError(responseJSON['message']);
            };
            login(credentials, success, failure);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <FieldItem
              name="username"
              errors={errors}
              touched={touched}
              value={values.username}
              onChange={setFieldValue}
            />

            <FieldItem
              name="password"
              type="password"
              errors={errors}
              touched={touched}
              value={values.password}
              onChange={setFieldValue}
            />

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
