import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
  body: yup.object({
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], `Passwords don't match.`),
    password: yup.string().required('Password is required.'),
    email: yup.string().email('Invalid email.').required('Email is required.'),
    middleName: yup.string().required('Middle name is required.'),
    lastName: yup.string().required('Last name is required.'),
    firstName: yup.string().required('First name is required.')
  })
});

export const signInValidationSchema = yup.object({
  body: yup.object({
    password: yup.string().required('Password is required.'),
    username: yup.string().required('Username or Email is required.')
  })
});
