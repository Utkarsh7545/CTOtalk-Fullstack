import React from 'react';
import { Users, Target, Award, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About <span className="text-yellow-500">CTOTalk</span></h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Connecting technology leaders and innovators through meaningful conversations 
              and knowledge sharing experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We believe that the future of technology is shaped by the conversations we have today. 
              CTOTalk creates a platform where technology leaders can share insights, learn from each other, 
              and build the networks that drive innovation forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-800 border border-yellow-500/20 hover:bg-gray-700 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400">
                Building a strong network of technology leaders and innovators
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800 border border-green-500/20 hover:bg-gray-700 hover:border-green-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Focus</h3>
              <p className="text-gray-400">
                Curated events and discussions on cutting-edge technology topics
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800 border border-yellow-500/20 hover:bg-gray-700 hover:border-yellow-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 via-yellow-600 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
              <p className="text-gray-400">
                High-quality content and speakers from leading technology companies
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800 border border-green-500/20 hover:bg-gray-700 hover:border-green-500/40 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global</h3>
              <p className="text-gray-400">
                Connecting leaders across industries and geographical boundaries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Story</h2>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8 md:p-12">
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-300 mb-6">
                CTOTalk was born from a simple observation: the most valuable insights in technology 
                often come from casual conversations between experienced leaders. These unguarded moments 
                of sharing real challenges, solutions, and lessons learned are where true innovation happens.
              </p>

              <p className="text-gray-300 mb-6">
                Founded in 2024, we set out to create a platform that would facilitate these meaningful 
                exchanges on a larger scale. What started as small meetups in Mumbai has grown into a 
                vibrant community of <span className="text-yellow-500 font-semibold">CTOs, VPs of Engineering</span>, and senior technology leaders from 
                companies of all sizes.
              </p>

              <p className="text-gray-300 mb-6">
                Today, CTOTalk hosts regular events featuring industry experts discussing everything 
                from technical architecture and team management to emerging technologies and industry trends. 
                Our events are designed to be intimate enough for real dialogue, yet impactful enough 
                to drive meaningful change in how we approach <span className="text-green-500 font-semibold">technology leadership</span>.
              </p>

              <p className="text-gray-300">
                Join us as we continue to build a community where technology leaders can learn, 
                share, and grow together. The future of technology is collaborative, and it starts 
                with the conversations we have today.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
