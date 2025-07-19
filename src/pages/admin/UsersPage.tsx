import React, { useState } from 'react';
import { UserCheck, Plus, Search, Edit, Trash2, Shield, User, Settings } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@tourism.com',
      role: 'admin',
      permissions: ['all'],
      status: 'active',
      lastLogin: new Date('2024-01-07T10:30:00'),
      createdAt: new Date('2024-01-01T00:00:00'),
    },
    {
      id: '2',
      name: 'John Manager',
      email: 'manager@tourism.com',
      role: 'manager',
      permissions: ['tours', 'customers', 'invoices'],
      status: 'active',
      lastLogin: new Date('2024-01-06T15:45:00'),
      createdAt: new Date('2024-01-02T00:00:00'),
    },
    {
      id: '3',
      name: 'Sarah Staff',
      email: 'staff@tourism.com',
      role: 'staff',
      permissions: ['customers', 'tours'],
      status: 'inactive',
      lastLogin: new Date('2024-01-05T09:15:00'),
      createdAt: new Date('2024-01-03T00:00:00'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff' as 'admin' | 'manager' | 'staff',
    permissions: [] as string[],
    status: 'active' as 'active' | 'inactive',
  });

  const roles = [
    {
      name: 'admin',
      label: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      color: 'red',
    },
    {
      name: 'manager',
      label: 'Manager',
      description: 'Manage tours, customers, and generate reports',
      permissions: ['tours', 'customers', 'invoices', 'reports'],
      color: 'blue',
    },
    {
      name: 'staff',
      label: 'Staff',
      description: 'Basic access to customers and tours',
      permissions: ['customers', 'tours'],
      color: 'green',
    },
  ];

  const availablePermissions = [
    'tours', 'customers', 'invoices', 'suppliers', 'inventory', 'reports', 'users', 'config'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      id: editingUser ? editingUser.id : Date.now().toString(),
      lastLogin: editingUser ? editingUser.lastLogin : new Date(),
      createdAt: editingUser ? editingUser.createdAt : new Date(),
    };

    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? userData : u));
    } else {
      setUsers(prev => [...prev, userData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'staff',
      permissions: [],
      status: 'active',
    });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const getRoleInfo = (role: string) => {
    return roles.find(r => r.name === role) || roles[2];
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User & Role Management</h1>
          <p className="text-gray-600">Manage system users and their permissions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsRoleModalOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Manage Roles
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="staff">Staff</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className={`h-4 w-4 mr-2 text-${roleInfo.color}-600`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${roleInfo.color}-100 text-${roleInfo.color}-800`}>
                          {roleInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastLogin.toLocaleDateString()} {user.lastLogin.toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => {
                  const role = e.target.value as 'admin' | 'manager' | 'staff';
                  const roleInfo = getRoleInfo(role);
                  setFormData({ 
                    ...formData, 
                    role,
                    permissions: roleInfo.permissions 
                  });
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map(role => (
                  <option key={role.name} value={role.name}>{role.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Role Management Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        title="Role Management"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-600">System roles and their permissions</p>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.name} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Shield className={`h-5 w-5 mr-2 text-${role.color}-600`} />
                    <h3 className="font-semibold text-gray-900">{role.label}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${role.color}-100 text-${role.color}-800`}>
                    {users.filter(u => u.role === role.name).length} users
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersPage;