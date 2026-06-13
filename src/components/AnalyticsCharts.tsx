import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { monthlyLeadsData, sourceData, conversionRateData } from '../data/analyticsData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-strong rounded-lg p-3 text-sm">
        <p className="text-white font-medium">{label}</p>
        {payload.map((item: any, i: number) => (
          <p key={i} style={{ color: item.color }} className="text-xs mt-1">
            {item.name}: {item.value}
            {item.name === 'rate' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-slate-400">{s.name} ({s.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Leads</h3>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={monthlyLeadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
              <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} name="leads" />
              <Bar dataKey="converted" fill="#22c55e" radius={[4, 4, 0, 0]} name="converted" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Conversion Rate Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={conversionRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} domain={[20, 50]} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6, fill: '#a78bfa' }}
              name="rate"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: '864', color: '#3b82f6' },
          { label: 'Converted', value: '336', color: '#22c55e' },
          { label: 'Avg Conversion', value: '38.9%', color: '#8b5cf6' },
          { label: 'Top Source', value: 'Website', color: '#06b6d4' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-strong rounded-2xl p-5 text-center"
          >
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
