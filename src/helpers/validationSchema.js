import * as yup from "yup";

const celebrityFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is Required")
    .matches(/^[a-zA-Z ]+$/, "Should contain only Alphabets"),
  imageUrl: yup
    .string()
    .required("ImageUrl is Required")
    .url("Invalid url format"),
  about: yup.string().required("About the celebrity is Required"),
  wikiUrl: yup
    .string()
    .required("Wikiurl is Required")
    .url("Invalid url format"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email"),

  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
});

const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
  confirmPassword: yup
    .string()
    .test("", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const signupSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password should contain atleast one uppercase, one lowercase and one special character"
    ),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email"),
});

export {
  celebrityFormSchema,
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  changePasswordSchema,
};
