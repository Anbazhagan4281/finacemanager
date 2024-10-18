import { Router } from "express";
import { register } from "../controller/register";
import { login } from "../controller/login";

const router: Router = Router();

// Use the correct route and function name
router.post('/register', register);
router.post('/login', login);

export default router;
