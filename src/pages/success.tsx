import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import { Layout } from '../components/layout.tsx/layout';

// The component's props type
type SuccessProps = {
  path: string;
  message: string;
};

// extending the default next context type
type SuccessContext = NextPageContext & {
  query: SuccessProps;
};

// react component
const SuccessPage: NextPage<SuccessProps> = ({ path, message }) => (
  <Layout>
    <div className="d-flex flex-column align-items-center">
      <h1>{message}</h1>
      <img
        width="100"
        height="100"
        src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"
      />
      <Link href={path}>Create another one</Link>
    </div>
  </Layout>
);

// assigning the initial props to the component's props
SuccessPage.getInitialProps = (ctx: SuccessContext) => {
  return {
    message: ctx.query.message,
    path: ctx.query.path,
  };
};

export default SuccessPage;
