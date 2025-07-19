import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Plane, Plus, Search, Edit, Trash2, MapPin, DollarSign, Eye } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

const ToursManagementPage: React.FC = () => {
  const { tours, addTour, updateTour, deleteTour } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    emirate: 'Dubai',
    category: 'adult' as 'kids' | 'adult' | 'romantic' | 'staycation' | 'adventure',
    thumbnail: '',
    whatsappContact: '+971501234567',
  });

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];
  const categories = [
    { value: 'kids', label: 'Kids Activities' },
    { value: 'adult', label: 'Adult Activities' },
    { value: 'romantic', label: 'Romantic Locations' },
    { value: 'staycation', label: 'Staycations' },
    { value: 'adventure', label: 'Adventures' },
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmirate = emirateFilter === 'all' || tour.emirate === emirateFilter;
    const matchesCategory = categoryFilter === 'all' || tour.category === categoryFilter;
    return matchesSearch && matchesEmirate && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tourData = {
      ...formData,
      gallery: [formData.thumbnail], // For now, use thumbnail as single gallery item
    };

    if (editingTour) {
      updateTour(editingTour.id, tourData);
    } else {
      addTour({
        ...tourData,
        createdBy: 'admin',
        modifiedBy: 'admin',
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      emirate: 'Dubai',
      category: 'adult',
      thumbnail: '',
      whatsappContact: '+971501234567',
    });
    setEditingTour(null);
    setIsModalOpen(false);
  };

  const handleEdit = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      price: tour.price,
      emirate: tour.emirate,
      category: tour.category,
      thumbnail: tour.thumbnail,
      whatsappContact: tour.whatsappContact,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      deleteTour(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tour Management</h1>
          <p className="text-gray-600">Create and manage tour packages and itineraries</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Tour
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={emirateFilter}
            onChange={(e) => setEmirateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Emirates</option>
            {emirates.map(emirate => (
              <option key={emirate} value={emirate}>{emirate}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={tour.thumbnail} 
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {tour.emirate}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded text-xs font-medium capitalize">
                  {tour.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tour.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{tour.emirate}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-semibold">{tour.price}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(tour)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(tour.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="text-center py-12">
          <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
          <p className="text-gray-600">Add your first tour to get started.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingTour ? 'Edit Tour' : 'Add New Tour'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Tour Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (USD)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emirate</label>
              <select
                value={formData.emirate}
                onChange={(e) => setFormData({ ...formData, emirate: e.target.value })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {emirates.map(emirate => (
                  <option key={emirate} value={emirate}>{emirate}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            <Input
              label="WhatsApp Contact"
              value={formData.whatsappContact}
              onChange={(e) => setFormData({ ...formData, whatsappContact: e.target.value })}
              required
            />
          </div>
          <Input
            label="Thumbnail Image URL"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            placeholder="https://example.com/image.jpg"
            required
          />
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingTour ? 'Update Tour' : 'Add Tour'}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ToursManagementPage;