import * as eventService from '../services/eventService.js';
import { pool } from '../config/database.js';

export const getAllEvents = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const [events] = await eventService.fetchAllEvents(userId);
    res.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || null;

    const [events] = await eventService.fetchEventById(userId, id);

    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event: events[0] });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const [events] = await eventService.findEventById(id);
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = events[0];
    if (event.current_attendees >= event.max_attendees) {
      return res.status(400).json({ error: 'Event is full' });
    }

    const [activeRegistrations] = await eventService.checkExistingRegistration(id, userId);
    if (activeRegistrations.length > 0) {
      return res.status(400).json({ error: 'Already registered for this event' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      await eventService.registerUserForEvent(connection, id, userId);
      await connection.commit();
      res.json({ message: 'Successfully registered for event' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [registrations] = await eventService.checkExistingRegistration(id, userId);
    if (registrations.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      await eventService.cancelUserRegistration(connection, id, userId);
      await connection.commit();
      res.json({ message: 'Registration cancelled successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
