import { motion } from 'framer-motion';
import { FiUser, FiBell, FiShield, FiGlobe } from 'react-icons/fi';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      {[
        { icon: FiUser, title: 'Profile Settings', desc: 'Update your personal information and avatar' },
        { icon: FiBell, title: 'Notification Preferences', desc: 'Configure email and push notification settings' },
        { icon: FiShield, title: 'Security', desc: 'Manage password, two-factor authentication, and sessions' },
        { icon: FiGlobe, title: 'General', desc: 'Set timezone, language, and display preferences' },
      ].map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-500/15 flex items-center justify-center">
              <section.icon className="text-primary-400" size={20} />
            </div>
            <div>
              <h3 className="text-white font-semibold">{section.title}</h3>
              <p className="text-sm text-slate-400">{section.desc}</p>
            </div>
          </div>

          <div className="space-y-4 pl-14">
            {section.title === 'Profile Settings' && (
              <>
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">Display Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@crm.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-white text-sm outline-none focus:border-primary-500/50 transition-colors"
                  />
                </div>
              </>
            )}
            {section.title === 'Notification Preferences' && (
              <>
                {['Email notifications for new leads', 'Push notifications for status changes', 'Weekly summary reports'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-dark-700 text-primary-500 focus:ring-primary-500/30" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </label>
                ))}
              </>
            )}
            {section.title === 'Security' && (
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Change Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-white placeholder-slate-500 text-sm outline-none focus:border-primary-500/50 transition-colors"
                />
              </div>
            )}
            {section.title === 'General' && (
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">Timezone</label>
                <select className="w-full px-4 py-2.5 rounded-xl bg-dark-700/60 border border-white/10 text-slate-300 text-sm outline-none focus:border-primary-500/50 transition-colors">
                  <option>UTC (GMT+0)</option>
                  <option>EST (GMT-5)</option>
                  <option>PST (GMT-8)</option>
                  <option>IST (GMT+5:30)</option>
                </select>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300">
        Save Changes
      </button>
    </div>
  );
}
