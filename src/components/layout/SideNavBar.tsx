import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface SideNavBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/acquisition', label: 'Acquisition', icon: 'insights' },
  { path: '/activation', label: 'Activation', icon: 'bolt' },
  { path: '/conversion', label: 'Conversion', icon: 'shopping_cart' },
  { path: '/retention', label: 'Retention', icon: 'loop' },
  { path: '/referral', label: 'Referral', icon: 'share' },
  { path: '/revenue', label: 'Revenue', icon: 'payments' },
  { path: '/ab-testing', label: 'A/B Testing', icon: 'science' },
  { path: '/system-logs', label: 'System Logs', icon: 'terminal' },
];

const bottomItems = [
  { label: 'Support', icon: 'help_outline', action: '#' },
  { label: 'Sign Out', icon: 'logout', action: '#' },
];

export default function SideNavBar({ isOpen, onClose }: SideNavBarProps) {
  return (
    <nav
      className={clsx(
        'fixed md:static z-40 flex flex-col h-screen w-64 bg-surface-container-low py-4 transition-transform duration-300 ease-out flex-shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'md:flex'
      )}
    >
      {/* Brand */}
      <div className="px-6 mb-8">
        <h1 className="text-lg font-bold font-headline text-on-surface">
          PhotoApp Admin
        </h1>
        <p className="text-xs text-on-surface-variant mt-1 tracking-wide uppercase font-label">
          Global Monitoring
        </p>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium tracking-wide transition-all duration-150',
                isActive
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high'
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx(
                    'material-symbols-outlined text-[20px]',
                    isActive && 'filled'
                  )}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Items */}
      <div className="px-3 mt-auto space-y-1 pt-4">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium tracking-wide text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high transition-all duration-150 w-full text-left"
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
