import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';

const Home: React.FC = () => {
  const { events, loading } = useEvents();
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-yellow-500">CTOTalk</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with technology leaders, share insights, and build the future together 
              through our exclusive events and discussions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/events"
                className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center"
              >
                View Events <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition-colors duration-200"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Join CTOTalk?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover what makes our community the premier destination for technology leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-800 border border-yellow-500/20 hover:bg-gray-700 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Exclusive Events</h3>
              <p className="text-gray-400">
                Access to premium events with industry leaders, workshops, and networking opportunities
                that you won't find anywhere else.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-800 border border-green-500/20 hover:bg-gray-700 hover:border-green-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Elite Network</h3>
              <p className="text-gray-400">
                Connect with CTOs, Tech VPs, and senior engineering leaders from top companies 
                across various industries.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-800 border border-yellow-500/20 hover:bg-gray-700 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Knowledge Sharing</h3>
              <p className="text-gray-400">
                Learn from real-world experiences, case studies, and cutting-edge technologies 
                shared by industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't miss out on these exciting opportunities to learn and network
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-pulse">
                  <div className="aspect-video bg-gray-700 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/events"
                  className="bg-gradient-to-r from-yellow-500 to-green-500 text-black px-8 py-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-green-600 transition-all duration-200 inline-flex items-center shadow-lg"
                >
                  View All Events <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No Upcoming Events</h3>
              <p className="text-gray-400">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
