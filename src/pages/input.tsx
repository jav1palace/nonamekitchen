import { NextPage, NextPageContext } from 'next';

// The component's props type
type InputProps = {
  title: string;
};

// extending the default next context type
type InputContext = NextPageContext & {
  query: InputProps;
};

// react component
const InputPage: NextPage<InputProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

// assigning the initial props to the component's props
InputPage.getInitialProps = (ctx: InputContext) => {
  return {
    title: ctx.query.title,
  };
};

export default InputPage;
