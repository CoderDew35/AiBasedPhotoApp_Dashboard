import ThemeToggle from './ThemeToggle';

interface TopAppBarProps {
  onMenuClick: () => void;
}

export default function TopAppBar({ onMenuClick }: TopAppBarProps) {
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
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface/70 hover:bg-surface-bright transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface/70 hover:bg-surface-bright transition-colors"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold ml-1 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
          PM
        </div>
      </div>
    </header>
  );
}
