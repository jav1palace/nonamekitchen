import * as Yup from 'yup';

export const ExpenseSchema = Yup.object().shape({
  expenseDate: Yup.date()
    .default(() => new Date())
    .required('Required'),
  team: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  amount: Yup.number()
    .min(0.01, 'It must be at least 1 cent.')
    .required('Required'),
  currency: Yup.string().required('Required'),
  donor: Yup.string().required('Required'),
  notes: Yup.string(),
  attachment: Yup.mixed().required('Include a file'),
});
