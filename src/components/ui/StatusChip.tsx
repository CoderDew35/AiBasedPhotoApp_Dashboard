import clsx from 'clsx';

interface StatusChipProps {
  status: 'High Growth' | 'Stable' | 'Declining' | 'Running' | 'Completed' | 'Significant' | 'Not Significant' | 'Good' | 'Needs Work';
}

const chipStyles: Record<string, string> = {
  'High Growth': 'bg-secondary-container text-on-secondary-container',
  'Stable': 'bg-surface-container-highest text-on-surface',
  'Declining': 'bg-error-container text-on-error-container',
  'Running': 'bg-tertiary/15 text-tertiary',
  'Completed': 'bg-surface-container-highest text-on-surface-variant',
  'Significant': 'bg-tertiary/15 text-tertiary',
  'Not Significant': 'bg-surface-container-highest text-on-surface-variant',
  'Good': 'bg-tertiary/15 text-tertiary',
  'Needs Work': 'bg-error/15 text-error',
};

export default function StatusChip({ status }: StatusChipProps) {
  return (
    <span
      className={clsx(
        'px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wide inline-block',
        chipStyles[status] || 'bg-surface-container-highest text-on-surface'
      )}
    >
      {status}
    </span>
  );
}
