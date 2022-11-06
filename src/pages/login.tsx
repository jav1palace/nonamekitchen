import 'bootstrap/dist/css/bootstrap.css';

import Head from 'next/head';

import { LoginForm } from '../components/login/login-form';

import type { NextPage } from 'next';

const Login: NextPage = () => (
  <div>
    <Head>
      <title>Login Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main className="d-flex justify-content-center align-items-center">
      <LoginForm />
    </main>
  </div>
);

export default Login;
