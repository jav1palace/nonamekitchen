import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerField = ({ name, value, onChange }) => {
  return (
    <DatePicker
      className="form-control"
      name={name}
      id={name}
      selected={(value && new Date(value)) || new Date()}
      onChange={(val) => {
        onChange(name, val);
      }}
    />
  );
};
