import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Users, Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

const CustomersPage: React.FC = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    fax: '',
    address: '',
    contactPerson: '',
    companySize: '',
    type: 'B2C' as 'B2B' | 'B2C',
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    return matchesSearch && matchesType && !customer.isDeleted;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer({
        ...formData,
        createdBy: 'admin',
        modifiedBy: 'admin',
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      fax: '',
      address: '',
      contactPerson: '',
      companySize: '',
      type: 'B2C',
    });
    setEditingCustomer(null);
    setIsModalOpen(false);
  };

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      fax: customer.fax || '',
      address: customer.address || '',
      contactPerson: customer.contactPerson || '',
      companySize: customer.companySize || '',
      type: customer.type,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage your B2B and B2C customer database</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setFormData({ ...formData, type: 'B2B' });
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add B2B Customer
          </Button>
          <Button onClick={() => {
            setFormData({ ...formData, type: 'B2C' });
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Add B2C Customer
          </Button>
        </div>
      </div>

      {/* Customer Type Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">B2B Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.type === 'B2B' && !c.isDeleted).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">B2C Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.type === 'B2C' && !c.isDeleted).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => !c.isDeleted).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="B2B">Business (B2B)</option>
            <option value="B2C">Individual (B2C)</option>
          </select>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {customer.type === 'B2B' ? (
                    <div className="text-purple-600 font-bold text-lg">B2B</div>
                  ) : (
                    <div className="text-green-600 font-bold text-lg">B2C</div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    customer.type === 'B2B' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {customer.type === 'B2B' ? 'Business Customer' : 'Individual Customer'}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(customer)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              {customer.type === 'B2B' && customer.contactPerson && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Contact: {customer.contactPerson}
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Added: {customer.createdAt.toLocaleDateString()}
                </div>
                <div className={`text-xs font-medium ${
                  customer.type === 'B2B' ? 'text-purple-600' : 'text-green-600'
                }`}>
                  {customer.type === 'B2B' ? '🏢 Business' : '👤 Individual'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Add your first customer to get started.</p>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingCustomer 
          ? `Edit ${editingCustomer.type} Customer` 
          : `Add New ${formData.type} Customer`
        }
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={formData.type === 'B2B' ? 'Company Name' : 'Customer Name'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'B2B' | 'B2C' })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="B2C">Individual (B2C)</option>
                <option value="B2B">Business (B2B)</option>
              </select>
            </div>
          </div>

          {formData.type === 'B2B' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Person"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="Primary contact person"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fax (Optional)"
              value={formData.fax}
              onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
            />
            <Input
              label={formData.type === 'B2B' ? 'Company Address' : 'Address (Optional)'}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Customer Type Info */}
          <div className={`p-4 rounded-lg ${
            formData.type === 'B2B' ? 'bg-purple-50 border border-purple-200' : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                formData.type === 'B2B' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
              }`}>
                {formData.type}
              </div>
              <div className="ml-3">
                <p className={`font-medium ${
                  formData.type === 'B2B' ? 'text-purple-800' : 'text-green-800'
                }`}>
                  {formData.type === 'B2B' ? 'Business Customer' : 'Individual Customer'}
                </p>
                <p className={`text-sm ${
                  formData.type === 'B2B' ? 'text-purple-600' : 'text-green-600'
                }`}>
                  {formData.type === 'B2B' 
                    ? 'Corporate client with potential for bulk bookings and special rates'
                    : 'Individual traveler with personal booking requirements'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingCustomer ? 'Update Customer' : `Add ${formData.type} Customer`}
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

export default CustomersPage;