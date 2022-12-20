import * as Yup from 'yup';

const schema = {
  recovery: {
    body: Yup.object({
      email: Yup.string().email().required(),
    }).noUnknown(),
  },

  token: {
    params: Yup.object({
      token: Yup.string().length(40).required(),
    }).noUnknown(),
  },

  change: {
    body: Yup.object({
      password: Yup.string().required('Please enter your password.').min(6, 'The password field must contain at least 6 characters!'),
      password_confirmation: Yup.string().required('Please retype your password.').oneOf([Yup.ref('password')], 'Your passwords do not match.'),
    }).noUnknown(),

    params: Yup.object({
      token: Yup.string().length(40).required(),
    }).noUnknown(),
  },
};

export default schema;
