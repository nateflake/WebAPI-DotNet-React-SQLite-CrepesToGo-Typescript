import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('required'),
  brand: yup.string().required('required'),
  type: yup.string().required('required'),
  price: yup.number().required().min(0),
  quantityInStock: yup.number().required().min(0),
  description: yup.string().required('required'),
  file: yup.mixed().when('pictureUrl', {
    is: (value: string) => !value,
    then: yup.mixed().required('required')
  })
})