import express from "express"
const router = express.Router()
import {register} from "../controllers/auth-controller.js"
import {login} from "../controllers/auth-controller.js"
import { loginSchema,signupSchema } from "../validators/auth-validator.js"
import validate from "../middlewares/validate-middleware.js"
router.post("/register",validate(signupSchema), register)
router.post("/login",validate(loginSchema),login)
export default router;
