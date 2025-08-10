import { useState, useEffect } from 'react';
import { type Event } from '../types';
import api from '../utils/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.events);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const registerForEvent = async (eventId: number): Promise<boolean> => {
    try {
      await api.post(`/events/${eventId}/register`);
      return true;
    } catch (error) {
      console.error('Error registering for event:', error);
      return false;
    }
  };

  const cancelRegistration = async (eventId: number): Promise<boolean> => {
    try {
      await api.delete(`/events/${eventId}/register`);
      return true;
    } catch (error) {
      console.error('Error cancelling registration:', error);
      return false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    registerForEvent,
    cancelRegistration,
  };
};
