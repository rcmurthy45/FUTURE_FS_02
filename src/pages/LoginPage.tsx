import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiRefreshCw, FiFileText, FiBarChart2, FiUserPlus, FiX } from 'react-icons/fi';
import { Lead } from '../data/sampleLeads';
import LoginForm from '../components/LoginForm';
import LeadForm from '../components/LeadForm';

interface LoginPageProps {
  onLogin: (email: string, password: string) => { success: boolean; error?: string };
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
}

const features = [
  { icon: FiTarget, title: 'Lead Tracking', desc: 'Track every lead from first contact to close' },
  { icon: FiRefreshCw, title: 'Status Updates', desc: 'Real-time status changes and pipeline views' },
  { icon: FiFileText, title: 'Follow-Up Notes', desc: 'Never miss a follow-up with detailed notes' },
  { icon: FiBarChart2, title: 'Analytics Dashboard', desc: 'Data-driven insights for smarter decisions' },
];

export default function LoginPage({ onLogin, addLead }: LoginPageProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - CRM Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-600/20 items-center justify-center p-12">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary-400/5 rounded-full blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold text-white">CRM System</span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Client Lead<br />Management System
            </h1>
            <p className="text-slate-400 text-lg mb-10">
              Manage leads, track conversions, and grow your business efficiently.
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="glass rounded-xl p-4 hover:border-primary-500/20 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500/15 flex items-center justify-center mb-3 group-hover:bg-primary-500/25 transition-colors">
                    <f.icon className="text-primary-400" size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-16 glass rounded-xl p-3 opacity-60"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success-500" />
            <span className="text-xs text-slate-300">Lead Converted</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-32 left-16 glass rounded-xl p-3 opacity-60"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-xs text-slate-300">New Lead Added</span>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Login Card + Lead Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-dark-900 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <LoginForm onLogin={onLogin} />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <button
                onClick={() => setShowLeadForm(!showLeadForm)}
                className="flex items-center gap-2 px-4 py-1.5 bg-dark-900 text-slate-400 hover:text-primary-400 transition-colors rounded-lg"
              >
                {showLeadForm ? <FiX size={14} /> : <FiUserPlus size={14} />}
                {showLeadForm ? 'Close Form' : 'Quick Add Lead'}
              </button>
            </div>
          </div>

          {/* Lead Form - toggled below login */}
          <AnimatePresence>
            {showLeadForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LeadForm
                  onSubmit={(data) => {
                    addLead(data);
                    setShowLeadForm(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
