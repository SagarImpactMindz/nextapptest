import * as yup from "yup";

const emailValidation = yup
  .string()
  .test("email", "Invalid email", function (value) {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  })
  .required("Email is required.");

const checkboxValidation = yup.boolean().oneOf([true], "You must agree to the Privacy Policy and Terms of Services.");

export const registrationValidation = yup.object({
  email: yup.string()
    .required("Please provide a valid email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address."
    ),
    company_name: yup.string()
    .required("Company_name name is required.")
    .min(3, "Company name must be at least 3 characters long.")
    .max(35, "Company name cannot exceed 35 characters."),

  // first_name: yup.string()
  //   .required("First name is required.")
  //   .min(3, "First name must be at least 3 characters long.")
  //   .max(35, "First name cannot exceed 35 characters."),

  // last_name: yup.string()
  //   .required("Last name is required.")
  //   .min(3, "Last name must be at least 3 characters long.")
  //   .max(35, "Last name cannot exceed 35 characters."),

  // username: yup.string()
  //   .required("Please provide a valid username.")
  //   .matches(/^[a-zA-Z0-9_-]*$/, "Username cannot contain spaces or special characters.")
  //   .min(4, "Username must be at least 4 characters long.")
  //   .max(35, "Username cannot exceed 35 characters."), // Optional adjustment for underscore or hyphen in the username

  password: yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character (@$!%*?&), and be at least 8 characters long.'
    ),

  confirm_password: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

export const loginValidation = yup.object({
  email: yup.string().required("Email is required."),
  password: yup.string().required("Password is required."),

});

export const forgetPassword = yup.object({
  email: yup.string().required("Email is required."),
});

export const conformPassword = yup.object({
  newPassword: yup.string().required("Password is required.").matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'The Password requires capital and lowercase letters, numbers, symbols (@$!%*?&) and be at least 8 characters long.'
  ),
  // newPassword: yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

export const registrationShopValidation = yup.object({
    shop_name: yup.string()
    .required("shop_name name is required.")
    .min(3, "Shop name must be at least 3 characters long.")
    .max(35, "Shop name cannot exceed 35 characters."),
});