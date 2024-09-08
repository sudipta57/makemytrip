import { body, validationResult } from "express-validator";

const registerValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/^(?=.*\d).{6,}$/)
      .withMessage("Password must contain at least one number"),
  ];
};
const loginValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};
const Errorvalidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { registerValidationRules, loginValidationRules, Errorvalidate };
