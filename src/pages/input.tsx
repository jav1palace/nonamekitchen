import 'bootstrap/dist/css/bootstrap.css';

import { NextPage } from 'next';

import { ExpenseForm } from '../components/expense-input/expense-input';

// react component
const InputPage: NextPage = ({}) => {
  return (
    <main className="vh-100 d-flex justify-content-center align-items-center">
      <ExpenseForm />
    </main>
  );
};

export async function getServerSideProps(context) {
  let result = {};
  if (!context?.req?.user) {
    result = {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    ...result,
    props: {},
  };
}

export default InputPage;
