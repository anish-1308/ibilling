import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Modal from '../components/UI/Modal';
import Button from '../components/UI/Button';

const Tours: React.FC = () => {
  const { tours } = useData();
  const [selectedEmirate, setSelectedEmirate] = useState<string>('Dubai');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const emirates = [
    { value: 'Dubai', label: 'Dubai', count: tours.filter(t => t.emirate === 'Dubai').length },
    { value: 'Abu Dhabi', label: 'Abu Dhabi', count: tours.filter(t => t.emirate === 'Abu Dhabi').length },
    { value: 'Sharjah', label: 'Sharjah', count: tours.filter(t => t.emirate === 'Sharjah').length },
    { value: 'Ajman', label: 'Ajman', count: tours.filter(t => t.emirate === 'Ajman').length },
    { value: 'Ras Al Khaimah', label: 'Ras Al Khaimah', count: tours.filter(t => t.emirate === 'Ras Al Khaimah').length },
    { value: 'Fujairah', label: 'Fujairah', count: tours.filter(t => t.emirate === 'Fujairah').length },
    { value: 'Umm Al Quwain', label: 'Umm Al Quwain', count: tours.filter(t => t.emirate === 'Umm Al Quwain').length },
  ];

  const categories = [
    { value: 'all', label: 'All Activities', icon: '🎯' },
    { value: 'kids', label: 'Kids Activities', icon: '🧸' },
    { value: 'adult', label: 'Adult Activities', icon: '🎭' },
    { value: 'romantic', label: 'Romantic Locations', icon: '💕' },
    { value: 'staycation', label: 'Staycations', icon: '🏨' },
    { value: 'adventure', label: 'Adventures', icon: '🏔️' },
  ];

  const filteredTours = tours.filter(tour => {
    const emirateMatch = tour.emirate === selectedEmirate;
    const categoryMatch = selectedCategory === 'all' || tour.category === selectedCategory;
    return emirateMatch && categoryMatch;
  });

  const openTourDetails = (tour: any) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleWhatsAppContact = (tour: any) => {
    const message = `Hi! I'm interested in the ${tour.title} tour. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${tour.whatsappContact.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore UAE Tours</h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Discover amazing experiences across all seven emirates
          </p>
        </div>
      </section>

      {/* Emirates Tabs */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 min-w-full">
              {emirates.map((emirate) => (
                <button
                  key={emirate.value}
                  onClick={() => {
                    setSelectedEmirate(emirate.value);
                    setSelectedCategory('all');
                  }}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                    selectedEmirate === emirate.value
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{emirate.label}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {emirate.count} {emirate.count === 1 ? 'tour' : 'tours'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Tabs */}
      <section className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-2">
            <div className="flex space-x-2 min-w-full">
              {categories.map((category) => {
                const categoryCount = tours.filter(tour => 
                  tour.emirate === selectedEmirate && 
                  (category.value === 'all' || tour.category === category.value)
                ).length;

                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedCategory === category.value
                          ? 'bg-blue-500 text-blue-100'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {categoryCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedEmirate} Tours
                </h2>
                <p className="text-gray-600">
                  {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} available
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">
                    ${Math.min(...filteredTours.map(t => t.price)) || 0}
                  </div>
                  <div>From</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">4.8★</div>
                  <div>Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div 
                key={tour.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img 
                    src={tour.thumbnail} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tour.emirate}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center">
                      {categories.find(c => c.value === tour.category)?.icon}
                      <span className="ml-1">{tour.category}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                      📸 {tour.gallery.length} photos
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{tour.emirate}</span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-xs text-gray-500 ml-1">(124)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-blue-600">
                      ${tour.price}
                      <span className="text-sm text-gray-500 font-normal">/person</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Full Day
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => openTourDetails(tour)}
                      variant="outline"
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleWhatsAppContact(tour)}
                      className="flex-1"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600 mb-4">
                No tours available in {selectedEmirate} for {categories.find(c => c.value === selectedCategory)?.label}.
              </p>
              <Button
                onClick={() => setSelectedCategory('all')}
                variant="outline"
              >
                View All Activities
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Tour Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTour?.title || ''}
        size="xl"
      >
        {selectedTour && (
          <div className="space-y-6">
            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedTour.gallery.map((image: string, index: number) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${selectedTour.title} ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedTour.emirate}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center">
                    {categories.find(c => c.value === selectedTour.category)?.icon}
                    <span className="ml-1">{selectedTour.category}</span>
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${selectedTour.price}
                  <span className="text-sm text-gray-500 font-normal">/person</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{selectedTour.description}</p>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Full Day</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Max 15 people</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                  <span>4.8 (124 reviews)</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">What's Included:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Professional tour guide</li>
                  <li>• Transportation</li>
                  <li>• Entry tickets</li>
                  <li>• Refreshments</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 border-t">
              <Button
                onClick={() => handleWhatsAppContact(selectedTour)}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact via WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Styles for scrollbar-hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Tours;