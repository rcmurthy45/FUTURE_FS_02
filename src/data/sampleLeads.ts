export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
  notes: string;
  date: string;
}

export const sampleLeads: Lead[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 234-5678',
    company: 'TechCorp Solutions',
    source: 'LinkedIn',
    status: 'Qualified',
    notes: 'Interested in enterprise plan. Follow up next week.',
    date: '2026-05-28',
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'm.chen@innovate.io',
    phone: '+1 (555) 345-6789',
    company: 'Innovate.io',
    source: 'Google Ads',
    status: 'Contacted',
    notes: 'Requested demo for team of 15.',
    date: '2026-05-30',
  },
  {
    id: '3',
    fullName: 'Emily Rodriguez',
    email: 'emily.r@designhub.com',
    phone: '+1 (555) 456-7890',
    company: 'DesignHub Creative',
    source: 'Website',
    status: 'New',
    notes: 'Submitted contact form on pricing page.',
    date: '2026-06-01',
  },
  {
    id: '4',
    fullName: 'James Wilson',
    email: 'jwilson@megastart.co',
    phone: '+1 (555) 567-8901',
    company: 'MegaStart Co',
    source: 'Referral',
    status: 'Converted',
    notes: 'Signed up for annual plan. Onboarding scheduled.',
    date: '2026-05-15',
  },
  {
    id: '5',
    fullName: 'Priya Patel',
    email: 'priya@cloudnext.in',
    phone: '+1 (555) 678-9012',
    company: 'CloudNext India',
    source: 'Facebook',
    status: 'Contacted',
    notes: 'Awaiting budget approval from management.',
    date: '2026-06-03',
  },
  {
    id: '6',
    fullName: 'David Kim',
    email: 'd.kim@samsungtech.kr',
    phone: '+1 (555) 789-0123',
    company: 'Samsung Tech KR',
    source: 'Instagram',
    status: 'Lost',
    notes: 'Chose competitor. Price was the main factor.',
    date: '2026-05-20',
  },
  {
    id: '7',
    fullName: 'Amanda Foster',
    email: 'afoster@greenleaf.org',
    phone: '+1 (555) 890-1234',
    company: 'GreenLeaf Foundation',
    source: 'Website',
    status: 'New',
    notes: 'Non-profit interested in discounted plans.',
    date: '2026-06-05',
  },
  {
    id: '8',
    fullName: 'Robert Martinez',
    email: 'rmartinez@luxbrands.com',
    phone: '+1 (555) 901-2345',
    company: 'LuxBrands International',
    source: 'LinkedIn',
    status: 'Qualified',
    notes: 'High-value lead. Schedule VIP demo.',
    date: '2026-06-07',
  },
  {
    id: '9',
    fullName: 'Lisa Thompson',
    email: 'lisa.t@edulearn.com',
    phone: '+1 (555) 012-3456',
    company: 'EduLearn Platform',
    source: 'Google Ads',
    status: 'Contacted',
    notes: 'Needs integration with existing LMS.',
    date: '2026-06-08',
  },
  {
    id: '10',
    fullName: 'Ahmed Hassan',
    email: 'ahmed@globallogistics.ae',
    phone: '+1 (555) 123-4567',
    company: 'Global Logistics AE',
    source: 'Referral',
    status: 'Converted',
    notes: 'Closed deal. 3-year contract signed.',
    date: '2026-05-10',
  },
];

export const leadSources = ['Website', 'Facebook', 'Instagram', 'Google Ads', 'Referral', 'LinkedIn'] as const;

export const statusOptions = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] as const;
