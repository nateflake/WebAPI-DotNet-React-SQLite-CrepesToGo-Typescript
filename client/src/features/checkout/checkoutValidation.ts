import * as yup from 'yup';

export const validationSchema =
  [
    yup.object(
      {
        fullName: yup.string().required('required field'),
        address1: yup.string().required('required field'),
        city: yup.string().required('required field'),
        state: yup.string().required('required field'),
        zip: yup.string().required('required field'),
        country: yup.string().required('required field')
      }),
    yup.object(),
    yup.object({
      nameOnCard: yup.string().required('required field')
    })
  ];