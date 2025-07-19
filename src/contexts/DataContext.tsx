import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, Service, Customer, Supplier, Invoice, InventoryItem, CompanyConfig, DashboardStats } from '../types';

interface DataContextType {
  tours: Tour[];
  services: Service[];
  customers: Customer[];
  suppliers: Supplier[];
  invoices: Invoice[];
  inventory: InventoryItem[];
  companyConfig: CompanyConfig;
  dashboardStats: DashboardStats;
  addTour: (tour: Omit<Tour, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;
  addService: (service: Omit<Service, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNo' | 'createdAt' | 'modifiedAt'>) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  updateCompanyConfig: (config: Partial<CompanyConfig>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [companyConfig, setCompanyConfig] = useState<CompanyConfig>({
    name: 'UAE Tourism Company',
    email: 'info@uaetourism.com',
    phone: '+971-4-123-4567',
    address: 'Dubai, United Arab Emirates',
    ownerName: 'Ahmed Al Mansouri',
    ownerEmail: 'owner@uaetourism.com',
    logo: '/logo.png',
    taxRate: 5,
  });
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    dailySales: 15000,
    dailyProfit: 3500,
    totalIncome: 125000,
    totalExpenses: 45000,
    weeklySales: [
      { date: '2024-01-01', sales: 12000, profit: 2800, expenses: 4200 },
      { date: '2024-01-02', sales: 15000, profit: 3500, expenses: 5100 },
      { date: '2024-01-03', sales: 18000, profit: 4200, expenses: 6300 },
      { date: '2024-01-04', sales: 14000, profit: 3200, expenses: 4800 },
      { date: '2024-01-05', sales: 16000, profit: 3800, expenses: 5400 },
      { date: '2024-01-06', sales: 20000, profit: 4800, expenses: 6900 },
      { date: '2024-01-07', sales: 22000, profit: 5200, expenses: 7500 },
    ],
    reminders: [
      'Follow up with Al Habtoor Group booking',
      'Prepare monthly financial report',
      'Update tour packages for summer season',
    ],
  });

  useEffect(() => {
    // Initialize with mock data
    setTours([
      {
        id: '1',
        title: 'Burj Khalifa Sky Experience',
        description: 'Visit the world\'s tallest building and enjoy breathtaking views from the observation deck.',
        price: 150,
        emirate: 'Dubai',
        category: 'adult',
        thumbnail: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: [
          'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        whatsappContact: '+971501234567',
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: 'admin',
        modifiedBy: 'admin',
      },
      {
        id: '2',
        title: 'Desert Safari Adventure',
        description: 'Experience the thrill of dune bashing, camel riding, and traditional Bedouin entertainment.',
        price: 200,
        emirate: 'Dubai',
        category: 'adventure',
        thumbnail: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
        gallery: [
          'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        whatsappContact: '+971501234567',
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: 'admin',
        modifiedBy: 'admin',
      },
    ]);

    setServices([
      {
        id: '1',
        name: 'Flight Booking',
        description: 'Book domestic and international flights with competitive prices.',
        price: 50,
        category: 'flight',
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: 'admin',
        modifiedBy: 'admin',
      },
      {
        id: '2',
        name: 'Visa Services',
        description: 'Complete visa processing for UAE and international destinations.',
        price: 100,
        category: 'visa',
        createdAt: new Date(),
        modifiedAt: new Date(),
        createdBy: 'admin',
        modifiedBy: 'admin',
      },
    ]);
  }, []);

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const generateInvoiceNo = () => `INV-${Date.now()}`;

  const addTour = (tour: Omit<Tour, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newTour: Tour = {
      ...tour,
      id: generateId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    setTours(prev => [...prev, newTour]);
  };

  const updateTour = (id: string, tour: Partial<Tour>) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, ...tour, modifiedAt: new Date() } : t));
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
  };

  const addService = (service: Omit<Service, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newService: Service = {
      ...service,
      id: generateId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    setServices(prev => [...prev, newService]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service, modifiedAt: new Date() } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: generateId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      isDeleted: false,
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...customer, modifiedAt: new Date() } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isDeleted: true } : c));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: generateId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      isDeleted: false,
      amountDue: 0,
      amountPaid: 0,
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id: string, supplier: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...supplier, modifiedAt: new Date() } : s));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, isDeleted: true } : s));
  };

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNo' | 'createdAt' | 'modifiedAt'>) => {
    const newInvoice: Invoice = {
      ...invoice,
      id: generateId(),
      invoiceNo: generateInvoiceNo(),
      createdAt: new Date(),
      modifiedAt: new Date(),
      isDeleted: false,
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const updateInvoice = (id: string, invoice: Partial<Invoice>) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...invoice, modifiedAt: new Date() } : i));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, isDeleted: true } : i));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: generateId(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateInventoryItem = (id: string, item: Partial<InventoryItem>) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, ...item, modifiedAt: new Date() } : i));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(prev => prev.filter(i => i.id !== id));
  };

  const updateCompanyConfig = (config: Partial<CompanyConfig>) => {
    setCompanyConfig(prev => ({ ...prev, ...config }));
  };

  const value = {
    tours,
    services,
    customers,
    suppliers,
    invoices,
    inventory,
    companyConfig,
    dashboardStats,
    addTour,
    updateTour,
    deleteTour,
    addService,
    updateService,
    deleteService,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    updateCompanyConfig,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};