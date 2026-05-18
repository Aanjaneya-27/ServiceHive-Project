import express from 'express';
import { Register, Login } from '../controllers/userControllers';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);


export default router;