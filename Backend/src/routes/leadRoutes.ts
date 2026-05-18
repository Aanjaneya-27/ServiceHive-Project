import express from 'express';
import authMiddleware from '../middleware/userMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import { createLead, getLeads, updateLead, deleteLead } from '../controllers/leadController';

const router = express.Router();

router.get('/', authMiddleware, getLeads);
router.post('/', authMiddleware, adminMiddleware, createLead);
router.put('/:id', authMiddleware, adminMiddleware, updateLead);
router.delete('/:id', authMiddleware, adminMiddleware, deleteLead);


export default router;