import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: number;
  icon: IconType;
  color: string;
  index: number;
}

export default function StatsCard({ title, value, icon: Icon, color, index }: StatsCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / value), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-strong rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{count}</h3>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="text-xl" style={{ color }} />
        </div>
      </div>
      <div className="mt-4 h-1 rounded-full bg-dark-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}
