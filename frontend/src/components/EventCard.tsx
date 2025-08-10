import React from 'react';
import { Link } from 'react-router-dom';
import { type Event } from '../types';
import { Calendar, Clock, MapPin, Users, User } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= new Date();
  const spotsLeft = event.max_attendees - (event.current_attendees * 0.5);

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-700 hover:border-yellow-500/40 transition-all duration-300">
      <div className="aspect-video bg-gradient-to-br from-yellow-500 via-yellow-600 to-green-500 rounded-t-xl flex items-center justify-center">
        <div className="text-black text-center p-6">
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-gray-800 text-sm line-clamp-2">{event.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{eventDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <User className="h-4 w-4 mr-2 text-green-500" />
            <span>Speaker: <span className="text-white font-medium">{event.speaker}</span></span>
          </div>
          
          <div className="flex items-center text-gray-300 text-sm">
            <Users className="h-4 w-4 mr-2 text-green-500" />
            <span>{event.current_attendees * 0.5}/{event.max_attendees} registered</span>
            {spotsLeft <= 10 && spotsLeft > 0 ? (
              <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30">
                {spotsLeft} spots left
              </span>
            ) : null}
            {spotsLeft === 0 ? (
              <span className="ml-2 text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                Full
              </span>
            ) : null}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isUpcoming ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                Upcoming
              </span>
            ) : null}
            {event.is_registered ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                Registered
              </span>
            ) : null}
          </div>
          
          <Link
            to={`/events/${event.id}`}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 text-sm font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
