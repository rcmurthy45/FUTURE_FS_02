import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Lead } from '../data/sampleLeads';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  Qualified: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Converted: 'bg-green-500/15 text-green-400 border-green-500/20',
  Lost: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  return (
    <AnimatePresence>
      {lead && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-strong rounded-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Lead Details</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-lg">{lead.fullName}</p>
                  <p className="text-slate-400 text-sm">{lead.company}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <p className="text-sm text-slate-300">{lead.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Phone</p>
                  <p className="text-sm text-slate-300">{lead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Source</p>
                  <p className="text-sm text-slate-300">{lead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Date Added</p>
                  <p className="text-sm text-slate-300">{lead.date}</p>
                </div>
              </div>

              {lead.notes && (
                <div>
                  <p className="text-xs text-slate-500 mb-1">Notes</p>
                  <p className="text-sm text-slate-300 bg-dark-700/40 rounded-xl p-3">{lead.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
