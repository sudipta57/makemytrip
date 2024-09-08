import express from "express";
import {
  UserExist,
  UserLogin,
  UserSignUp,
} from "../controllers/UserController.js"; // Use ES module import
import {
  registerValidationRules,
  Errorvalidate,
  loginValidationRules,
} from "../lib/validator.js"; // Use ES module import
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const app = express.Router();

app.post("/login", loginValidationRules(), Errorvalidate, UserLogin);
app.post("/signup", registerValidationRules(), Errorvalidate, UserSignUp);
app.get("/me", AuthMiddleware, UserExist);

export default app;
