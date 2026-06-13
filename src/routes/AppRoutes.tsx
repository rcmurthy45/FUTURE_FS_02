import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLeads } from '../hooks/useLeads';
import LoginPage from '../pages/LoginPage';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import LeadsPage from '../pages/LeadsPage';
import AddLeadPage from '../pages/AddLeadPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes() {
  const { isAuthenticated, login, logout } = useAuth();
  const leadsState = useLeads();

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<LoginPage onLogin={login} addLead={leadsState.addLead} />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<DashboardLayout onLogout={logout} />}>
            <Route path="/dashboard" element={<DashboardPage stats={leadsState.stats} />} />
            <Route path="/leads" element={<LeadsPage {...leadsState} />} />
            <Route path="/add-lead" element={<AddLeadPage addLead={leadsState.addLead} />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
