import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { type Event } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../hooks/useEvents';
import api from '../utils/api';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const { registerForEvent, cancelRegistration } = useEvents();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (id && !authLoading) { 
      fetchEvent(parseInt(id));
    }
  }, [id, authLoading]);

  const fetchEvent = async (eventId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${eventId}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {
    if (!event || !user) return;

    setRegistering(true);
    let success = false;

    if (event.is_registered) {
      success = await cancelRegistration(event.id);
    } else {
      success = await registerForEvent(event.id);
    }

    if (success) {
      await fetchEvent(event.id);
    }
    setRegistering(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded mb-6 w-1/3"></div>
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <div className="aspect-video bg-gray-700 rounded-t-xl"></div>
              <div className="p-8">
                <div className="h-8 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 bg-gray-700 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">The event you're looking for doesn't exist.</p>
          <Link
            to="/events"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 inline-flex items-center font-semibold"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= new Date();
  const spotsLeft = event.max_attendees - (event.current_attendees * 0.5);
  const isFull = spotsLeft <= 0; 

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/events"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 mb-6 transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Events
        </Link>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
          {/* Event Header */}
          <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-green-500 text-black p-8">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <p className="text-gray-800 text-lg leading-relaxed">{event.description}</p>
              </div>
              
              <div className="ml-8 text-right">
                {isUpcoming ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-800 border border-green-500/30 mb-2">
                    Upcoming
                  </span>
                ) : null}
                {event.is_registered ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-800 border border-yellow-500/30 block">
                    Registered
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">Event Details</h2>
                
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{eventDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-3 text-yellow-500" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Users className="h-5 w-5 mr-3 text-green-500" />
                  <span>{event.current_attendees * 0.5}/{event.max_attendees} registered</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">Speaker</h2>
                
                <div className="flex items-start">
                  <User className="h-5 w-10 mr-3 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white text-lg">{event.speaker}</h3>
                    <p className="text-gray-400 mt-1">{event.speaker_bio}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Section */}
            <div className="border-t border-gray-700 pt-8">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    {isFull && !event.is_registered ? (
                      <div className="flex items-center text-red-400">
                        <XCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">Event is full</span>
                      </div>
                    ) : spotsLeft <= 10 && spotsLeft > 0 ? (
                      <div className="flex items-center text-yellow-400">
                        <Users className="h-5 w-5 mr-2" />
                        <span className="font-medium">Only {spotsLeft} spots left!</span>
                      </div>
                    ) : event.is_registered ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">You're registered for this event</span>
                      </div>
                    ) : spotsLeft > 10 ? ( 
                      <div className="flex items-center text-gray-300">
                        <Users className="h-5 w-5 mr-2" />
                        <span>{spotsLeft} spots available</span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    {isUpcoming && (
                      <button
                        onClick={handleRegistration}
                        disabled={registering || (isFull && !event.is_registered)}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                          event.is_registered
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : isFull
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-500 text-black hover:bg-yellow-600'
                        }`}
                      >
                        {registering
                          ? 'Processing...'
                          : event.is_registered
                          ? 'Cancel Registration'
                          : isFull
                          ? 'Event Full'
                          : 'Register Now'
                        }
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Registration Required
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Please log in or create an account to register for this event.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link
                      to="/login"
                      className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-black transition-colors duration-200 font-semibold"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
