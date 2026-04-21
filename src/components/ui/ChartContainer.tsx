import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  legend?: ReactNode;
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
}

export default function ChartContainer({
  title,
  subtitle,
  action,
  legend,
  children,
  className = '',
  colSpan,
}: ChartContainerProps) {
  const spanClass =
    colSpan === 2
      ? 'lg:col-span-2'
      : colSpan === 3
        ? 'lg:col-span-3'
        : '';

  return (
    <div
      className={`bg-surface-container-high rounded-xl p-6 ghost-border flex flex-col ${spanClass} ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-headline font-semibold text-on-surface">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm font-body text-on-surface-variant mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {legend}
          {action}
        </div>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
