import { FiUsers, FiUserPlus, FiPhone, FiCheckCircle } from 'react-icons/fi';
import StatsCard from '../components/StatsCard';
import { useLeads } from '../hooks/useLeads';

interface DashboardPageProps {
  stats: { total: number; new: number; contacted: number; converted: number };
}

export default function DashboardPage({ stats }: DashboardPageProps) {
  const cards = [
    { title: 'Total Leads', value: stats.total, icon: FiUsers, color: '#3b82f6' },
    { title: 'New Leads', value: stats.new, icon: FiUserPlus, color: '#8b5cf6' },
    { title: 'Contacted', value: stats.contacted, icon: FiPhone, color: '#f59e0b' },
    { title: 'Converted', value: stats.converted, icon: FiCheckCircle, color: '#22c55e' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <StatsCard key={card.title} {...card} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New lead added', name: 'Emily Rodriguez', time: '2 hours ago', color: '#3b82f6' },
              { action: 'Lead contacted', name: 'Michael Chen', time: '4 hours ago', color: '#f59e0b' },
              { action: 'Lead converted', name: 'James Wilson', time: '1 day ago', color: '#22c55e' },
              { action: 'Follow-up scheduled', name: 'Sarah Johnson', time: '1 day ago', color: '#8b5cf6' },
              { action: 'Lead qualified', name: 'Robert Martinez', time: '2 days ago', color: '#06b6d4' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/30 hover:bg-dark-700/50 transition-colors">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{item.action}</p>
                  <p className="text-xs text-slate-400">{item.name}</p>
                </div>
                <span className="text-xs text-slate-500 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Conversion Rate</span>
                <span className="text-success-400 font-medium">38.9%</span>
              </div>
              <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                <div className="h-full rounded-full bg-success-500" style={{ width: '38.9%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Response Rate</span>
                <span className="text-primary-400 font-medium">72%</span>
              </div>
              <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                <div className="h-full rounded-full bg-primary-500" style={{ width: '72%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Avg. Response Time</span>
                <span className="text-accent-400 font-medium">2.4 hrs</span>
              </div>
              <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                <div className="h-full rounded-full bg-accent-500" style={{ width: '60%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">Pipeline Value</span>
                <span className="text-cyan-400 font-medium">$124K</span>
              </div>
              <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                <div className="h-full rounded-full bg-cyan-500" style={{ width: '55%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
