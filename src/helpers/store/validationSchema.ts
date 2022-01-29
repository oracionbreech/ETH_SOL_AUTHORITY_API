import * as yup from 'yup';

export const addStoreSchema = yup.object({
  body: yup.object({
    name: yup.string().required('Store name is required.'),
    description: yup.string().required('Description is required.')
  })
});
