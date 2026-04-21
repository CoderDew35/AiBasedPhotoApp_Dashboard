import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface TopAppBarProps {
  onMenuClick: () => void;
}

// Reusable dropdown wrapper — closes on outside click
function Dropdown({ isOpen, onClose, children, align = 'right' }: {
  isOpen: boolean; onClose: () => void; children: React.ReactNode; align?: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 ${align === 'right' ? 'right-0' : 'left-0'} z-50 min-w-[280px] bg-surface-container-low rounded-xl ghost-border shadow-2xl overflow-hidden`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Notification items
const notifications = [
  { id: 1, icon: 'science', color: 'tertiary', title: 'A/B Test Reached Significance', desc: 'Paywall Placement Timing has reached 96.4% significance.', time: '2h ago', unread: true },
  { id: 2, icon: 'trending_up', color: 'primary', title: 'MRR Milestone', desc: 'Monthly recurring revenue passed $95K target.', time: '5h ago', unread: true },
  { id: 3, icon: 'warning', color: 'error', title: 'Bounce Rate Spike', desc: 'Landing page bounce rate increased to 42.8% (+2.1%).', time: '1d ago', unread: false },
  { id: 4, icon: 'person_add', color: 'secondary', title: 'Cohort Apr 2026 Loaded', desc: '21,150 users entered the April cohort.', time: '2d ago', unread: false },
];

export default function TopAppBar({ onMenuClick }: TopAppBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex justify-between items-center w-full px-4 md:px-6 lg:px-8 h-16 bg-surface flex-shrink-0 z-10">
      {/* Mobile: hamburger + brand */}
      <div className="flex items-center md:hidden">
        <button
          onClick={onMenuClick}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface/70 hover:bg-surface-bright transition-colors mr-2"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-lg font-extrabold font-headline tracking-tight text-on-surface">
          Synthetic Eye
        </h1>
      </div>

      {/* Desktop: search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            className="w-full bg-surface-container-highest text-on-surface placeholder-on-surface-variant rounded-md py-2 pl-10 pr-4 border-none focus:ring-0 focus:outline-none transition-all text-sm"
            placeholder="Search metrics..."
            type="text"
          />
          <div className="absolute left-0 top-0 w-[2px] h-full bg-primary rounded-l-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />

        {/* ── Notifications ── */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setSettingsOpen(false); setProfileOpen(false); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors relative ${notifOpen ? 'bg-surface-bright text-primary' : 'text-on-surface/70 hover:bg-surface-bright'}`}
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <Dropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)}>
            <div className="p-4 border-b border-outline-variant/10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-on-surface font-headline">Notifications</h3>
                <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline uppercase tracking-wider">
                  Mark all read
                </span>
              </div>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-surface-container-highest transition-colors cursor-pointer ${n.unread ? 'bg-primary/3' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    n.color === 'tertiary' ? 'bg-tertiary/15' :
                    n.color === 'primary' ? 'bg-primary/15' :
                    n.color === 'error' ? 'bg-error/15' :
                    n.color === 'secondary' ? 'bg-secondary/15' : 'bg-primary/15'
                  }`}>
                    <span className={`material-symbols-outlined text-[16px] ${
                      n.color === 'tertiary' ? 'text-tertiary' :
                      n.color === 'primary' ? 'text-primary' :
                      n.color === 'error' ? 'text-error' :
                      n.color === 'secondary' ? 'text-secondary' : 'text-primary'
                    }`}>{n.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium text-on-surface truncate">{n.title}</p>
                      {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-2">{n.desc}</p>
                    <p className="text-[10px] text-on-surface-variant/60 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-outline-variant/10 text-center">
              <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View all notifications</span>
            </div>
          </Dropdown>
        </div>

        {/* ── Settings ── */}
        <div className="relative">
          <button
            onClick={() => { setSettingsOpen(v => !v); setNotifOpen(false); setProfileOpen(false); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${settingsOpen ? 'bg-surface-bright text-primary' : 'text-on-surface/70 hover:bg-surface-bright'}`}
            aria-label="Settings"
          >
            <motion.span
              className="material-symbols-outlined"
              animate={{ rotate: settingsOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              settings
            </motion.span>
          </button>
          <Dropdown isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
            <div className="p-4 border-b border-outline-variant/10">
              <h3 className="text-sm font-bold text-on-surface font-headline">Dashboard Settings</h3>
            </div>
            <div className="p-2">
              {[
                { icon: 'palette', label: 'Appearance', desc: 'Theme, colors, density' },
                { icon: 'notifications_active', label: 'Alert Rules', desc: 'Metric thresholds & triggers' },
                { icon: 'download', label: 'Export Data', desc: 'CSV, PDF, JSON exports' },
                { icon: 'integration_instructions', label: 'API Keys', desc: 'Manage integrations' },
                { icon: 'group', label: 'Team Access', desc: 'Roles & permissions' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-on-surface">{item.label}</p>
                    <p className="text-[10px] text-on-surface-variant">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-outline-variant/10">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-highest">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">info</span>
                  <span className="text-[10px] text-on-surface-variant">Dashboard v1.0.0</span>
                </div>
                <span className="text-[10px] text-tertiary font-bold">Up to date</span>
              </div>
            </div>
          </Dropdown>
        </div>

        {/* ── Profile Avatar ── */}
        <div className="relative">
          <div
            onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); setSettingsOpen(false); }}
            className={`w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold ml-1 cursor-pointer transition-all ${profileOpen ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary'}`}
          >
            PM
          </div>
          <Dropdown isOpen={profileOpen} onClose={() => setProfileOpen(false)}>
            <div className="p-4 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                  PM
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Product Manager</p>
                  <p className="text-[11px] text-on-surface-variant">pm@photoapp.com</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              {[
                { icon: 'person', label: 'Profile', shortcut: '⌘P' },
                { icon: 'dashboard_customize', label: 'My Dashboards', shortcut: '⌘D' },
                { icon: 'bookmark', label: 'Saved Reports', shortcut: '⌘S' },
                { icon: 'history', label: 'Activity Log', shortcut: '' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-highest transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">{item.icon}</span>
                    <span className="text-xs text-on-surface">{item.label}</span>
                  </div>
                  {item.shortcut && (
                    <span className="text-[10px] text-on-surface-variant bg-surface-container-highest px-1.5 py-0.5 rounded font-mono">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-outline-variant/10">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-error/10 transition-colors text-left">
                <span className="material-symbols-outlined text-[16px] text-error">logout</span>
                <span className="text-xs text-error font-medium">Sign Out</span>
              </button>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
