import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { login } from '../../client/api';
import { Credentials } from '../../client/interfaces/api.interface';
import styles from './login-form.module.css';

export function LoginForm() {
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
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(
          credentials: Credentials,
          { setSubmitting }: FormikHelpers<Credentials>,
        ) => {
          setTimeout(() => {
            setSubmitting(false);

            login(credentials).then((response: Response) => {
              if (response.status < 300) {
                router.push('/input');
              } else {
                setError('Error');
              }
            });
          }, 500);
        }}
      >
        <Form>
          <div className="mb-3">
            <Field
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              aria-describedby="usernameHelp"
            />
          </div>

          <div className="mb-3">
            <Field
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
}
