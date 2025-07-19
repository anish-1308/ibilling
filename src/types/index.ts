export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: string[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  fax?: string;
  address?: string;
  contactPerson?: string;
  companySize?: string;
  image?: string;
  type: 'B2B' | 'B2C';
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  fax?: string;
  image?: string;
  type: 'B2B' | 'B2C';
  amountDue: number;
  amountPaid: number;
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  emirate: string;
  category: 'kids' | 'adult' | 'romantic' | 'staycation' | 'adventure';
  thumbnail: string;
  gallery: string[];
  whatsappContact: string;
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'flight' | 'visa' | 'chauffeur' | 'rental' | 'adventure' | 'pickup' | 'custom';
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  supplier: string;
  supplierId?: string;
  itemType?: 'Activities' | 'Hotel' | 'Flights' | 'Other';
  pricePerChild?: number;
  pricePerAdult?: number;
  pricePerNight?: number;
  price?: number;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
}

export interface InvoiceItem {
  id: string;
  type: 'flight' | 'activity';
  guestName?: string;
  travelDate?: Date;
  source?: string;
  destination?: string;
  passportNo?: string;
  buyPrice?: number;
  sellPrice?: number;
  itemName?: string;
  supplier?: string;
  childQty?: number;
  adultQty?: number;
  childPrice?: number;
  adultPrice?: number;
  tax?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  invoiceType?: 'activities' | 'hotel' | 'flights';
  customerId: string;
  customerName: string;
  customerContact: string;
  customerEmail: string;
  guests: number;
  representative: string;
  invoiceDate: Date;
  tourStartDate: Date;
  tourEndDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  amountDue: number;
  amountPaid: number;
  notes: string;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: Date;
  modifiedAt: Date;
  createdBy: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  notes: string;
  createdAt: Date;
  createdBy: string;
}

export interface CompanyConfig {
  name: string;
  email: string;
  phone: string;
  address: string;
  ownerName: string;
  ownerEmail: string;
  logo: string;
  taxRate: number;
}

export interface SalesReport {
  date: string;
  sales: number;
  profit: number;
  expenses: number;
}

export interface DashboardStats {
  dailySales: number;
  dailyProfit: number;
  totalIncome: number;
  totalExpenses: number;
  weeklySales: SalesReport[];
  reminders: string[];
}