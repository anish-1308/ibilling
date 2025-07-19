import React from 'react';
import { Plane, FileText, Car, MapPin, Package, Truck, Settings } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Button from '../components/UI/Button';

const Services: React.FC = () => {
  const { services } = useData();

  const serviceIcons = {
    flight: <Plane className="h-8 w-8" />,
    visa: <FileText className="h-8 w-8" />,
    chauffeur: <Car className="h-8 w-8" />,
    rental: <Car className="h-8 w-8" />,
    adventure: <MapPin className="h-8 w-8" />,
    pickup: <Truck className="h-8 w-8" />,
    custom: <Settings className="h-8 w-8" />,
  };

  const serviceCategories = [
    {
      category: 'flight',
      title: 'Flight Booking',
      description: 'Book domestic and international flights with competitive prices and flexible options.',
      features: ['Best Price Guarantee', '24/7 Support', 'Flexible Booking', 'Multiple Airlines'],
      color: 'blue',
    },
    {
      category: 'visa',
      title: 'Visa Services',
      description: 'Complete visa processing for UAE and international destinations with expert guidance.',
      features: ['Fast Processing', 'Document Support', 'Multiple Visa Types', 'Expert Consultation'],
      color: 'green',
    },
    {
      category: 'chauffeur',
      title: 'Chauffeur Services',
      description: 'Professional chauffeur services with luxury vehicles and experienced drivers.',
      features: ['Luxury Vehicles', 'Professional Drivers', 'Airport Transfers', 'City Tours'],
      color: 'purple',
    },
    {
      category: 'rental',
      title: 'Car Rental',
      description: 'Wide range of vehicles available for short-term and long-term rental.',
      features: ['Economy to Luxury', 'Flexible Duration', 'Insurance Included', 'GPS Navigation'],
      color: 'orange',
    },
    {
      category: 'adventure',
      title: 'Adventure & Package Booking',
      description: 'Exciting adventure packages and customized tour experiences.',
      features: ['Desert Safari', 'Water Sports', 'Mountain Adventures', 'Cultural Tours'],
      color: 'red',
    },
    {
      category: 'pickup',
      title: 'Pick-up/Drop-off',
      description: 'Convenient transportation services for airports, hotels, and attractions.',
      features: ['Airport Transfers', 'Hotel Pickup', 'Attraction Visits', 'Scheduled Service'],
      color: 'teal',
    },
    {
      category: 'custom',
      title: 'Customized Packaging',
      description: 'Tailored travel packages designed to meet your specific requirements.',
      features: ['Personalized Itinerary', 'Flexible Pricing', 'Group Discounts', 'Special Occasions'],
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    teal: 'from-teal-500 to-teal-600',
    indigo: 'from-indigo-500 to-indigo-600',
  };

  const handleContactService = (serviceName: string) => {
    const message = `Hi! I'm interested in your ${serviceName} service. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/971501234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Comprehensive travel solutions for all your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Travel Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From flight bookings to customized packages, we provide everything you need for a perfect travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${colorClasses[service.color as keyof typeof colorClasses]} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {serviceIcons[service.category as keyof typeof serviceIcons]}
                    <Package className="h-6 w-6 opacity-70" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white text-opacity-90 text-sm">{service.description}</p>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleContactService(service.title)}
                      className="flex-1"
                    >
                      Get Quote
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleContactService(service.title)}
                      className="flex-1"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-gray-600">We're committed to providing exceptional service and value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support for all your travel needs',
                icon: '🕐',
              },
              {
                title: 'Best Prices',
                description: 'Competitive pricing with no hidden fees or charges',
                icon: '💰',
              },
              {
                title: 'Expert Team',
                description: 'Experienced professionals with deep local knowledge',
                icon: '👥',
              },
              {
                title: 'Quality Guarantee',
                description: 'We guarantee the quality of all our services',
                icon: '✅',
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Plan Your Trip?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your travel requirements and get a customized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleContactService('General Inquiry')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;