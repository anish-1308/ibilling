import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Tours from './pages/Tours';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import InventoryPage from './pages/admin/InventoryPage';
import InvoicesPage from './pages/admin/InvoicesPage';
import CustomersPage from './pages/admin/CustomersPage';
import SuppliersPage from './pages/admin/SuppliersPage';
import ToursManagementPage from './pages/admin/ToursManagementPage';
import ServicesManagementPage from './pages/admin/ServicesManagementPage';
import ReportsPage from './pages/admin/ReportsPage';
import UsersPage from './pages/admin/UsersPage';
import ConfigPage from './pages/admin/ConfigPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

// Public Layout Component
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            } />
            <Route path="/tours" element={
              <PublicLayout>
                <Tours />
              </PublicLayout>
            } />
            <Route path="/services" element={
              <PublicLayout>
                <Services />
              </PublicLayout>
            } />
            <Route path="/about" element={
              <PublicLayout>
                <About />
              </PublicLayout>
            } />
            <Route path="/contact" element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Outlet />
                </AdminLayout>
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="suppliers" element={<SuppliersPage />} />
              <Route path="tours" element={<ToursManagementPage />} />
              <Route path="services" element={<ServicesManagementPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="config" element={<ConfigPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            
            {/* Redirect /admin to login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;