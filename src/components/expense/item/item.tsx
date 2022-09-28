import { Field, FormikErrors, FormikTouched } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { CreateExpenseDto } from '../../../server/expenses/dto/create-expense.dto';
import { LoginDto } from '../../../server/users/dto/login.dto';
import {
  NNK_CURRENCIES,
  NNK_DONORS,
  NNK_EXPENSES_CATEGORIES,
  NNK_EXPENSES_CONCEPTS,
  NNK_TEAMS,
} from '../../../server/expenses/expenses.constants';

interface FieldItemProps {
  name: string;
  as?: string;
  type?: string;
  errors: FormikErrors<CreateExpenseDto | LoginDto>;
  touched: FormikTouched<any>;
  value: any;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  options?:
    | typeof NNK_CURRENCIES
    | typeof NNK_DONORS
    | typeof NNK_EXPENSES_CATEGORIES
    | typeof NNK_EXPENSES_CONCEPTS
    | typeof NNK_TEAMS;
}

export const FieldItem = ({
  name,
  as,
  type,
  errors,
  touched,
  value,
  onChange,
  options,
}: FieldItemProps) => {
  const getOptions = (options) => {
    if (options) {
      return (Object.keys(options) as Array<keyof typeof String>).map((key) => {
        return (
          <option key={key} value={options[key]}>
            {options[key]}
          </option>
        );
      });
    }
  };
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleOnChange = (event) => {
    const updateValue = event.currentTarget.value;
    let result = updateValue;
    if (name === 'amount' && updateValue) {
      result = parseFloat(updateValue);
    }

    onChange(name, result);
  };

  return (
    <div className="mb-3">
      <label>{capitalize(name)}</label>
      <Field
        as={as}
        className="form-control"
        id={name}
        name={name}
        type={type}
        placeholder={capitalize(name)}
        aria-describedby={name + 'Help'}
        selected={value}
        onChange={handleOnChange}
      >
        {options && (
          <>
            <option>Choose one {name}</option>
            {getOptions(options)}
          </>
        )}
      </Field>
      {errors[name] && touched[name] && (
        <div className="text-danger">{errors[name]}</div>
      )}
    </div>
  );
};
