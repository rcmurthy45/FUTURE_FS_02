import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads': 'Lead Management',
  '/add-lead': 'Add New Lead',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};

interface DashboardLayoutProps {
  onLogout: () => void;
}

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-dark-900">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={onLogout}
        />
      </div>

      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[240px]'}`}>
        <div className="lg:hidden">
          <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)} title={title} />
        </div>
        <div className="hidden lg:block">
          <Navbar onMenuClick={() => setCollapsed(!collapsed)} title={title} />
        </div>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
