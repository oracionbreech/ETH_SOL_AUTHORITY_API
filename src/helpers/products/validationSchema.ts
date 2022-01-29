import * as yup from 'yup';

export const addProductSchema = yup.object({
  body: yup.object({
    name: yup.string().required('Product name is required.'),
    canteen: yup.string().required('Canteen is required.')
  })
});
