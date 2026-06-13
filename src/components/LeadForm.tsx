import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiRotateCcw } from 'react-icons/fi';
import { Lead, leadSources, statusOptions } from '../data/sampleLeads';
import { validateEmail, validatePhone, validateRequired } from '../utils/validation';

interface LeadFormProps {
  onSubmit: (lead: Omit<Lead, 'id' | 'date'>) => void;
  initialData?: Lead;
}

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  source: 'Website',
  status: 'New' as Lead['status'],
  notes: '',
};

export default function LeadForm({ onSubmit, initialData }: LeadFormProps) {
  const [form, setForm] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const nameErr = validateRequired(form.fullName, 'Full name');
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    const companyErr = validateRequired(form.company, 'Company name');
    if (nameErr) errs.fullName = nameErr;
    if (emailErr) errs.email = emailErr;
    if (phoneErr) errs.phone = phoneErr;
    if (companyErr) errs.company = companyErr;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setSuccess(true);
    if (!initialData) setForm(emptyForm);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleReset = () => {
    setForm(initialData || emptyForm);
    setErrors({});
    setSuccess(false);
  };

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-6">
        {initialData ? 'Edit Lead' : 'Add New Lead'}
      </h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
        >
          Lead {initialData ? 'updated' : 'added'} successfully!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border ${
                errors.fullName ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors`}
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="john@example.com"
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border ${
                errors.email ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border ${
                errors.phone ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Name</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Acme Inc."
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border ${
                errors.company ? 'border-red-500/50' : 'border-white/10'
              } text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors`}
            />
            {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Lead Source</label>
            <select
              value={form.source}
              onChange={(e) => update('source', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-slate-300 text-sm outline-none focus:border-primary-500/50 transition-colors"
            >
              {leadSources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-slate-300 text-sm outline-none focus:border-primary-500/50 transition-colors"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Add any relevant notes about this lead..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
          >
            <FiSave size={16} />
            {initialData ? 'Update Lead' : 'Save Lead'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-slate-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-dark-600 transition-colors"
          >
            <FiRotateCcw size={16} />
            Reset
          </button>
        </div>
      </form>
    </motion.div>
  );
}
