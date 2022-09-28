import { NextPage } from 'next';
import { Layout } from '../components/layout.tsx/layout';

import { ExpenseForm } from '../components/expense-input/expense-input';

// react component
const InputPage: NextPage = ({}) => (
  <Layout>
    <ExpenseForm />
  </Layout>
);

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
