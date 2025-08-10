import express from 'express';
import { 
  getAllEvents, 
  getEventById, 
  registerForEvent, 
  cancelRegistration 
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', getAllEvents);

// Get event by ID
router.get('/:id', authenticateToken, getEventById);

// Register for event (requires authentication)
router.post('/:id/register', authenticateToken, registerForEvent);

// Cancel registration (requires authentication)
router.delete('/:id/register', authenticateToken, cancelRegistration);

export default router;
