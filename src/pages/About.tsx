import React from 'react';
import { Award, Users, Globe, Heart, Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      number: '50,000+',
      label: 'Happy Customers',
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      number: '100+',
      label: 'Countries Served',
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      number: '15+',
      label: 'Years Experience',
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      number: '99%',
      label: 'Satisfaction Rate',
    },
  ];

  const team = [
    {
      name: 'Ahmed Al Mansouri',
      position: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Visionary leader with 20+ years in tourism industry',
    },
    {
      name: 'Sarah Johnson',
      position: 'Operations Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert in tour operations and customer experience',
    },
    {
      name: 'Mohammed Hassan',
      position: 'Tour Guide Manager',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Passionate about UAE culture and heritage',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About UAE Tourism</h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Your trusted partner in discovering the wonders of the United Arab Emirates
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2009, UAE Tourism Company began as a small family business with a simple mission: 
                  to share the incredible beauty and rich culture of the United Arab Emirates with visitors from around the world.
                </p>
                <p>
                  What started as a passion project has grown into one of the region's most trusted tourism companies, 
                  serving over 50,000 satisfied customers from more than 100 countries. Our success is built on our 
                  commitment to excellence, authentic experiences, and personalized service.
                </p>
                <p>
                  Today, we continue to innovate and expand our offerings while staying true to our core values: 
                  providing exceptional experiences that create lasting memories and showcase the true spirit of the UAE.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="UAE Tourism Company"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional tourism experiences that showcase the beauty, culture, and hospitality of the UAE 
                while creating unforgettable memories for our guests and contributing to the sustainable development of tourism in the region.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading tourism company in the UAE, recognized globally for our innovative services, 
                authentic experiences, and commitment to excellence in customer satisfaction and sustainable tourism practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">Numbers that speak for our commitment to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {achievement.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{achievement.number}</div>
                <div className="text-blue-100">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate professionals behind your amazing experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We strive for excellence in every aspect of our service, from planning to execution.',
                icon: '⭐',
              },
              {
                title: 'Authenticity',
                description: 'We provide genuine experiences that showcase the true culture and beauty of the UAE.',
                icon: '🏛️',
              },
              {
                title: 'Innovation',
                description: 'We continuously innovate to provide unique and memorable experiences for our guests.',
                icon: '💡',
              },
              {
                title: 'Sustainability',
                description: 'We are committed to sustainable tourism practices that preserve our environment.',
                icon: '🌱',
              },
              {
                title: 'Customer Focus',
                description: 'Our customers are at the heart of everything we do, and their satisfaction is our priority.',
                icon: '❤️',
              },
              {
                title: 'Integrity',
                description: 'We conduct our business with honesty, transparency, and ethical practices.',
                icon: '🤝',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;