import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText, Plus, Search, Edit, Trash2, Eye, Download, DollarSign, Calendar, User } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

const InvoicesPage: React.FC = () => {
  const { invoices, customers, addInvoice, updateInvoice, deleteInvoice } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [viewingInvoice, setViewingInvoice] = useState<any>(null);
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerContact: '',
    customerEmail: '',
    guests: 1,
    representative: '',
    invoiceType: 'activities' as 'activities' | 'hotel' | 'flights',
    tourStartDate: '',
    tourEndDate: '',
    items: [] as any[],
    notes: '',
    dueDate: '',
  });

  const activeCustomers = customers.filter(customer => !customer.isDeleted);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesType = typeFilter === 'all' || invoice.invoiceType === typeFilter;
    return matchesSearch && matchesStatus && matchesType && !invoice.isDeleted;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCustomer = activeCustomers.find(c => c.id === formData.customerId);
    
    // Calculate totals
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    
    const invoiceData = {
      ...formData,
      customerName: selectedCustomer?.name || formData.customerName,
      customerContact: selectedCustomer?.phone || formData.customerContact,
      customerEmail: selectedCustomer?.email || formData.customerEmail,
      invoiceDate: new Date(),
      tourStartDate: new Date(formData.tourStartDate),
      tourEndDate: new Date(formData.tourEndDate),
      dueDate: new Date(formData.dueDate),
      subtotal,
      tax,
      total,
      amountDue: total,
      amountPaid: 0,
      status: 'draft' as const,
    };

    if (editingInvoice) {
      updateInvoice(editingInvoice.id, invoiceData);
    } else {
      addInvoice({
        ...invoiceData,
        createdBy: 'admin',
        modifiedBy: 'admin',
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customerId: '',
      customerName: '',
      customerContact: '',
      customerEmail: '',
      guests: 1,
      representative: '',
      invoiceType: 'activities',
      tourStartDate: '',
      tourEndDate: '',
      items: [],
      notes: '',
      dueDate: '',
    });
    setEditingInvoice(null);
    setIsModalOpen(false);
  };

  const handleEdit = (invoice: any) => {
    setEditingInvoice(invoice);
    setFormData({
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      customerContact: invoice.customerContact,
      customerEmail: invoice.customerEmail,
      guests: invoice.guests,
      representative: invoice.representative,
      invoiceType: invoice.invoiceType || 'activities',
      tourStartDate: invoice.tourStartDate.toISOString().split('T')[0],
      tourEndDate: invoice.tourEndDate.toISOString().split('T')[0],
      items: invoice.items,
      notes: invoice.notes,
      dueDate: invoice.dueDate.toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleView = (invoice: any) => {
    setViewingInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activities':
        return '🎯';
      case 'hotel':
        return '🏨';
      case 'flights':
        return '✈️';
      default:
        return '📄';
    }
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      type: formData.invoiceType === 'flights' ? 'flight' : 'activity',
      itemName: '',
      supplier: '',
      childQty: 0,
      adultQty: 1,
      childPrice: 0,
      adultPrice: 0,
      tax: 0,
      total: 0,
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Recalculate total for the item
    const item = updatedItems[index];
    if (item.type === 'activity') {
      item.total = (item.childQty * item.childPrice) + (item.adultQty * item.adultPrice) + (item.tax || 0);
    } else {
      item.total = (item.sellPrice || 0) + (item.tax || 0);
    }
    
    setFormData({ ...formData, items: updatedItems });
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Create and manage customer invoices and billing</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${filteredInvoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredInvoices.filter(inv => inv.status === 'draft' || inv.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredInvoices.filter(inv => inv.status === 'overdue').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="activities">Activities</option>
            <option value="hotel">Hotel</option>
            <option value="flights">Flights</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.invoiceNo}</div>
                        <div className="text-sm text-gray-500">
                          {invoice.invoiceDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.customerName}</div>
                        <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      <span className="mr-1">{getTypeIcon(invoice.invoiceType || 'activities')}</span>
                      {(invoice.invoiceType || 'activities').charAt(0).toUpperCase() + (invoice.invoiceType || 'activities').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">${invoice.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">
                        Paid: ${invoice.amountPaid.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.dueDate.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(invoice)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(invoice)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(invoice.id)} className="text-red-600 hover:text-red-900">
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

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-600">Create your first invoice to get started.</p>
        </div>
      )}

      {/* Create/Edit Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select
                value={formData.customerId}
                onChange={(e) => {
                  const customer = activeCustomers.find(c => c.id === e.target.value);
                  setFormData({
                    ...formData,
                    customerId: e.target.value,
                    customerName: customer?.name || '',
                    customerContact: customer?.phone || '',
                    customerEmail: customer?.email || '',
                  });
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a customer...</option>
                {activeCustomers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.type === 'B2B' ? '🏢' : '👤'} {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Type</label>
              <select
                value={formData.invoiceType}
                onChange={(e) => setFormData({ ...formData, invoiceType: e.target.value as any })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="activities">Activities</option>
                <option value="hotel">Hotel</option>
                <option value="flights">Flights</option>
              </select>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Number of Guests"
              type="number"
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
              required
            />
            <Input
              label="Representative"
              value={formData.representative}
              onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          {/* Tour Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tour Start Date"
              type="date"
              value={formData.tourStartDate}
              onChange={(e) => setFormData({ ...formData, tourStartDate: e.target.value })}
              required
            />
            <Input
              label="Tour End Date"
              type="date"
              value={formData.tourEndDate}
              onChange={(e) => setFormData({ ...formData, tourEndDate: e.target.value })}
              required
            />
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                  <Button type="button" onClick={() => removeItem(index)} variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Item Name"
                    value={item.itemName}
                    onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                    required
                  />
                  <Input
                    label="Supplier"
                    value={item.supplier}
                    onChange={(e) => updateItem(index, 'supplier', e.target.value)}
                  />
                </div>

                {formData.invoiceType === 'activities' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Input
                      label="Child Qty"
                      type="number"
                      value={item.childQty}
                      onChange={(e) => updateItem(index, 'childQty', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Child Price"
                      type="number"
                      step="0.01"
                      value={item.childPrice}
                      onChange={(e) => updateItem(index, 'childPrice', parseFloat(e.target.value) || 0)}
                    />
                    <Input
                      label="Adult Qty"
                      type="number"
                      value={item.adultQty}
                      onChange={(e) => updateItem(index, 'adultQty', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Adult Price"
                      type="number"
                      step="0.01"
                      value={item.adultPrice}
                      onChange={(e) => updateItem(index, 'adultPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                )}

                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">
                    Total: ${item.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes or terms..."
            />
          </div>

          {/* Totals */}
          {formData.items.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${formData.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>${(formData.items.reduce((sum, item) => sum + item.total, 0) * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${(formData.items.reduce((sum, item) => sum + item.total, 0) * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Invoice ${viewingInvoice?.invoiceNo}`}
        size="lg"
      >
        {viewingInvoice && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Customer:</span>
                <p>{viewingInvoice.customerName}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Invoice Date:</span>
                <p>{viewingInvoice.invoiceDate.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Due Date:</span>
                <p>{viewingInvoice.dueDate.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900">Status:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingInvoice.status)}`}>
                  {viewingInvoice.status.charAt(0).toUpperCase() + viewingInvoice.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Invoice Items</h4>
              <div className="space-y-2">
                {viewingInvoice.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.itemName}</p>
                      <p className="text-sm text-gray-600">{item.supplier}</p>
                    </div>
                    <span className="font-medium">${item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${viewingInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${viewingInvoice.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${viewingInvoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {viewingInvoice.notes && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700">{viewingInvoice.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InvoicesPage;