import { FiMenu, FiBell, FiSearch } from 'react-icons/fi';

interface NavbarProps {
  onMenuClick: () => void;
  title: string;
}

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-white/5">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <FiMenu size={18} />
          </button>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-dark-700/50 rounded-xl px-3 py-2 border border-white/5">
            <FiSearch className="text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-48"
            />
          </div>
          <button className="relative w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-500" />
          </button>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
