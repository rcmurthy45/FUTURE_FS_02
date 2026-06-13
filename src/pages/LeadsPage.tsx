import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus, FiX } from 'react-icons/fi';
import { Lead } from '../data/sampleLeads';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';
import LeadDetailModal from '../components/LeadDetailModal';

interface LeadsPageProps {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

export default function LeadsPage({ leads, addLead, updateLead, deleteLead }: LeadsPageProps) {
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (data: Omit<Lead, 'id' | 'date'>) => {
    addLead(data);
    setShowForm(false);
  };

  const handleEdit = (data: Omit<Lead, 'id' | 'date'>) => {
    if (editLead) {
      updateLead(editLead.id, data);
      setEditLead(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Desktop: side-by-side layout */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <LeadTable
            leads={leads}
            onDelete={deleteLead}
            onEdit={(lead) => setEditLead(lead)}
            onView={(lead) => setViewLead(lead)}
          />
        </div>
        <div className="lg:sticky lg:top-20">
          {editLead ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Editing Lead</h3>
                <button
                  onClick={() => setEditLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>
              <LeadForm key={editLead.id} onSubmit={handleEdit} initialData={editLead} />
            </div>
          ) : (
            <LeadForm onSubmit={handleAdd} />
          )}
        </div>
      </div>

      {/* Mobile: stacked layout with toggle button */}
      <div className="lg:hidden space-y-4">
        <button
          onClick={() => { setShowForm(!showForm); setEditLead(null); }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
        >
          {showForm ? <FiX size={16} /> : <FiUserPlus size={16} />}
          {showForm ? 'Close Form' : 'Add New Lead'}
        </button>

        {(showForm || editLead) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {editLead ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">Editing Lead</h3>
                  <button
                    onClick={() => setEditLead(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <LeadForm key={editLead.id} onSubmit={handleEdit} initialData={editLead} />
              </div>
            ) : (
              <LeadForm onSubmit={handleAdd} />
            )}
          </motion.div>
        )}

        <LeadTable
          leads={leads}
          onDelete={deleteLead}
          onEdit={(lead) => { setEditLead(lead); setShowForm(false); }}
          onView={(lead) => setViewLead(lead)}
        />
      </div>

      <LeadDetailModal lead={viewLead} onClose={() => setViewLead(null)} />
    </div>
  );
}
