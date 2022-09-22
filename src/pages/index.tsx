import { NextPage, NextPageContext } from 'next';

// The component's props type
type UserProps = {
  title: string;
};

// extending the default next context type
type UserContext = NextPageContext & {
  query: UserProps;
};

// react component
const UserPage: NextPage<UserProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

// assigning the initial props to the component's props
UserPage.getInitialProps = (ctx: UserContext) => {
  return {
    title: ctx.query.title,
  };
};

export default UserPage;
