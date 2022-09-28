import 'react-datepicker/dist/react-datepicker.css';

import { FormikErrors, FormikTouched } from 'formik';

import { CreateExpenseDto } from '../../../server/expenses/dto/create-expense.dto';
import styles from './attachment.module.css';

interface FieldAttachmentProps {
  name: string;
  errors: FormikErrors<CreateExpenseDto>;
  touched: FormikTouched<any>;
  value: any;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const FieldAttachment = ({
  name,
  errors,
  touched,
  value,
  onChange,
}: FieldAttachmentProps) => {
  return (
    <div className="mb-3">
      <label> Attachment</label>
      <div className="form-group">
        <input
          id={name}
          name={name}
          type="file"
          onChange={(event) => {
            onChange(name, {
              file: event.currentTarget.files[0],
              name: 'test',
            });
            console.log(value.attachment);
          }}
          className="form-control"
        />
        {value.attachment?.data && (<img
          className={styles.thumbnail}
          src={URL.createObjectURL(new Blob([value.attachment?.data]))}
        />)}
      </div>
      {errors.attachment && touched.attachment && (
        <div className="text-danger">{String(errors.attachment)}</div>
      )}
    </div>
  );
};
