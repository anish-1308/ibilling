import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Package, Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

const InventoryPage: React.FC = () => {
  const { inventory, suppliers, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    supplierId: '',
    itemType: 'Activities' as 'Activities' | 'Hotel' | 'Flights' | 'Other',
    pricePerChild: 0,
    pricePerAdult: 0,
    pricePerNight: 0,
    price: 0,
    description: '',
  });

  const itemTypes = [
    {
      value: 'Activities',
      label: 'Activities',
      icon: '🎯',
      description: 'Tours, excursions, and adventure activities'
    },
    {
      value: 'Hotel',
      label: 'Hotel',
      icon: '🏨',
      description: 'Hotel bookings and accommodation services'
    },
    {
      value: 'Flights',
      label: 'Flights',
      icon: '✈️',
      description: 'Flight bookings and airline services'
    },
    {
      value: 'Other',
      label: 'Other',
      icon: '📦',
      description: 'Other inventory items and services'
    }
  ];

  const activeSuppliers = suppliers.filter(supplier => !supplier.isDeleted);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedSupplier = activeSuppliers.find(s => s.id === formData.supplierId);
    const supplierName = selectedSupplier ? selectedSupplier.name : '';
    
    // Calculate price per unit based on item type
    let pricePerUnit = 0;
    switch (formData.itemType) {
      case 'Activities':
        pricePerUnit = Math.max(formData.pricePerChild, formData.pricePerAdult);
        break;
      case 'Hotel':
        pricePerUnit = formData.pricePerNight;
        break;
      case 'Flights':
      case 'Other':
        pricePerUnit = formData.price;
        break;
    }
    
    const itemData = {
      name: formData.name,
      quantity: formData.quantity,
      pricePerUnit,
      supplier: supplierName,
      description: formData.description,
      itemType: formData.itemType,
      supplierId: formData.supplierId,
      pricePerChild: formData.pricePerChild,
      pricePerAdult: formData.pricePerAdult,
      pricePerNight: formData.pricePerNight,
      price: formData.price,
    };
    
    if (editingItem) {
      updateInventoryItem(editingItem.id, itemData);
    } else {
      addInventoryItem({
        ...itemData,
        createdBy: 'admin',
        modifiedBy: 'admin',
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      quantity: 0,
      supplierId: '',
      itemType: 'Activities',
      pricePerChild: 0,
      pricePerAdult: 0,
      pricePerNight: 0,
      price: 0,
      description: '',
    });
    setEditingItem(null);
    setIsModalOpen(false);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity,
      supplierId: item.supplierId || '',
      itemType: item.itemType || 'Activities',
      pricePerChild: item.pricePerChild || 0,
      pricePerAdult: item.pricePerAdult || 0,
      pricePerNight: item.pricePerNight || 0,
      price: item.price || 0,
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteInventoryItem(id);
    }
  };

  const getLowStockItems = () => inventory.filter(item => item.quantity < 10);

  const getItemTypeInfo = (itemType: string) => {
    return itemTypes.find(type => type.value === itemType) || itemTypes[0];
  };

  const renderPriceFields = () => {
    switch (formData.itemType) {
      case 'Activities':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price per Child"
              type="number"
              step="0.01"
              value={formData.pricePerChild}
              onChange={(e) => setFormData({ ...formData, pricePerChild: parseFloat(e.target.value) || 0 })}
              required
            />
            <Input
              label="Price per Adult"
              type="number"
              step="0.01"
              value={formData.pricePerAdult}
              onChange={(e) => setFormData({ ...formData, pricePerAdult: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>
        );
      case 'Hotel':
        return (
          <Input
            label="Price per Night"
            type="number"
            step="0.01"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: parseFloat(e.target.value) || 0 })}
            required
          />
        );
      case 'Flights':
      case 'Other':
        return (
          <Input
            label="Price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            required
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage your inventory items and stock levels</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Low Stock Alert */}
      {getLowStockItems().length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800 font-medium">
              {getLowStockItems().length} items are running low on stock
            </span>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search inventory items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price per Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      <span className="mr-1">{getItemTypeInfo(item.itemType || 'Other').icon}</span>
                      {getItemTypeInfo(item.itemType || 'Other').label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.quantity < 10 
                        ? 'bg-red-100 text-red-800' 
                        : item.quantity < 50 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.supplier || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(item.quantity * item.pricePerUnit).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Item Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          {/* Supplier Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <select
              value={formData.supplierId}
              onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a supplier...</option>
              {activeSuppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.type === 'B2B' ? '🏢' : '👤'} {supplier.name} ({supplier.type})
                </option>
              ))}
            </select>
            {activeSuppliers.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No suppliers available. Please add suppliers first.
              </p>
            )}
          </div>

          {/* Item Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Item Type</label>
            <div className="grid grid-cols-2 gap-3">
              {itemTypes.map((type) => (
                <div
                  key={type.value}
                  className={`relative cursor-pointer rounded-lg border p-3 hover:shadow-md transition-all ${
                    formData.itemType === type.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  onClick={() => setFormData({ ...formData, itemType: type.value as any })}
                >
                  <div className="flex items-center space-x-2">
                    <div className="text-lg">{type.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${
                        formData.itemType === type.value ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {type.label}
                      </h3>
                      <p className={`text-xs ${
                        formData.itemType === type.value ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {type.description}
                      </p>
                    </div>
                  </div>
                  {formData.itemType === type.value && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Pricing ({getItemTypeInfo(formData.itemType).label})
              </label>
              <div className="text-xs text-gray-500 mb-2">
                {getItemTypeInfo(formData.itemType).description}
              </div>
            </div>
          </div>
          
          {/* Dynamic Price Fields */}
          {renderPriceFields()}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Describe this ${formData.itemType.toLowerCase()} item...`}
            />
          </div>
          
          {/* Pricing Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Pricing Summary</h4>
            <div className="text-sm text-gray-600">
              {formData.itemType === 'Activities' && (
                <div className="space-y-1">
                  <div>Child Price: ${formData.pricePerChild.toFixed(2)}</div>
                  <div>Adult Price: ${formData.pricePerAdult.toFixed(2)}</div>
                  <div className="font-medium">Base Price: ${Math.max(formData.pricePerChild, formData.pricePerAdult).toFixed(2)}</div>
                </div>
              )}
              {formData.itemType === 'Hotel' && (
                <div>Price per Night: ${formData.pricePerNight.toFixed(2)}</div>
              )}
              {(formData.itemType === 'Flights' || formData.itemType === 'Other') && (
                <div>Price: ${formData.price.toFixed(2)}</div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingItem ? 'Update Item' : 'Add Item'}
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

export default InventoryPage;