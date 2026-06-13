import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const navItems = [
  { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { to: '/leads', icon: FiUsers, label: 'Leads' },
  { to: '/add-lead', icon: FiUserPlus, label: 'Add Lead' },
  { to: '/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/settings', icon: FiSettings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle, onLogout }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen glass-strong z-40 flex flex-col border-r border-white/5"
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/5">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="font-semibold text-white whitespace-nowrap">CRM System</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-dark-600 transition-colors"
        >
          {collapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-dark-700/60'
              }`
            }
          >
            <item.icon size={20} className="shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap text-sm font-medium overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <FiLogOut size={20} className="shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
