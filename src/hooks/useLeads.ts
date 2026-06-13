import { useState, useCallback } from 'react';
import { Lead, sampleLeads } from '../data/sampleLeads';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(sampleLeads);

  const addLead = useCallback((lead: Omit<Lead, 'id' | 'date'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  }, []);

  const updateLead = useCallback((id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, []);

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    converted: leads.filter((l) => l.status === 'Converted').length,
  };

  return { leads, addLead, updateLead, deleteLead, stats };
}
