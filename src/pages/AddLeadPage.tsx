import { Lead } from '../data/sampleLeads';
import LeadForm from '../components/LeadForm';

interface AddLeadPageProps {
  addLead: (lead: Omit<Lead, 'id' | 'date'>) => void;
}

export default function AddLeadPage({ addLead }: AddLeadPageProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <LeadForm onSubmit={addLead} />
    </div>
  );
}
