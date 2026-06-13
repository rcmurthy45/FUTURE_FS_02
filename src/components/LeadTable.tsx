import { useState } from 'react';
import { Lead, statusOptions } from '../data/sampleLeads';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

interface LeadTableProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
  onView: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  Qualified: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Converted: 'bg-green-500/15 text-green-400 border-green-500/20',
  Lost: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function LeadTable({ leads, onDelete, onEdit, onView }: LeadTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const filtered = leads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || l.status === statusFilter;
    const matchesSource = !sourceFilter || l.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const sources = [...new Set(leads.map((l) => l.source))];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-slate-300 text-sm outline-none focus:border-primary-500/50 transition-colors"
          >
            <option value="">All Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-slate-300 text-sm outline-none focus:border-primary-500/50 transition-colors"
          >
            <option value="">All Sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-dark-700/40">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium hidden md:table-cell">Email</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium hidden lg:table-cell">Phone</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium hidden sm:table-cell">Source</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium hidden lg:table-cell">Date</th>
              <th className="text-center py-3 px-4 text-slate-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-white/5 hover:bg-dark-700/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white font-medium">{lead.fullName}</p>
                      <p className="text-slate-500 text-xs md:hidden">{lead.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300 hidden md:table-cell">{lead.email}</td>
                  <td className="py-3 px-4 text-slate-300 hidden lg:table-cell">{lead.phone}</td>
                  <td className="py-3 px-4 text-slate-300 hidden sm:table-cell">{lead.source}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 hidden lg:table-cell">{lead.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => onView(lead)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                      >
                        <FiEye size={15} />
                      </button>
                      <button
                        onClick={() => onEdit(lead)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">No leads found</div>
        )}
      </div>
    </div>
  );
}
