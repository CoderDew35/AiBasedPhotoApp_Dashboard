import { useLocation } from 'react-router-dom';

export default function ComingSoonPage() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace('-', ' ');

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-xl bg-surface-container-high flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-primary">
          construction
        </span>
      </div>
      <h1 className="font-headline text-2xl font-bold text-on-surface mb-2 capitalize">
        {pageName}
      </h1>
      <p className="text-on-surface-variant text-sm max-w-md leading-relaxed">
        This module is currently under development. The full analytics suite will include
        this view in the next sprint cycle.
      </p>
      <div className="mt-6 flex gap-3">
        <span className="text-xs font-bold tracking-wide uppercase text-secondary bg-secondary/10 px-3 py-1.5 rounded-sm">
          Sprint 3 Backlog
        </span>
      </div>
    </div>
  );
}
