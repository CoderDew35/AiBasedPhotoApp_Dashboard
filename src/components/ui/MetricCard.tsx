import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  direction?: 'up' | 'down' | 'neutral';
  icon?: string;
  subtitle?: string;
  progress?: number;
  progressColor?: string;
  extra?: string;
  target?: string;
  index?: number;
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numericMatch = value.match(/[\d,.]+/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const numStr = numericMatch[0];
    const hasComma = numStr.includes(',');
    const targetNum = parseFloat(numStr.replace(/,/g, ''));
    const prefix = value.substring(0, value.indexOf(numStr));
    const suffix = value.substring(value.indexOf(numStr) + numStr.length);

    if (isNaN(targetNum)) {
      setDisplay(value);
      return;
    }

    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out: 1 - (1-t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      let formatted: string;
      if (numStr.includes('.')) {
        const decimals = numStr.split('.')[1].length;
        formatted = current.toFixed(decimals);
      } else {
        formatted = Math.round(current).toString();
      }

      if (hasComma) {
        formatted = Number(formatted).toLocaleString();
      }

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function MetricCard({
  label,
  value,
  trend,
  direction = 'neutral',
  icon,
  subtitle,
  progress,
  progressColor,
  extra,
  target,
  index = 0,
}: MetricCardProps) {
  const trendIcon =
    direction === 'up'
      ? 'trending_up'
      : direction === 'down'
        ? 'trending_down'
        : '';

  const trendColor =
    direction === 'up'
      ? 'text-tertiary'
      : direction === 'down'
        ? 'text-error'
        : 'text-on-surface-variant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
      className="bg-surface-container-low rounded-xl p-5 ghost-border hover:bg-surface-container-high transition-colors duration-150 relative overflow-hidden group"
    >
      {/* Background icon decoration */}
      {icon && (
        <div className="absolute top-0 right-0 p-4 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
          <span className="material-symbols-outlined text-6xl text-primary">
            {icon}
          </span>
        </div>
      )}

      <div className="relative z-10">
        {/* Label */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-on-surface-variant uppercase tracking-wider font-label">
            {label}
          </span>
          {icon && (
            <span className={clsx('material-symbols-outlined text-xl', trendColor)}>
              {trendIcon || icon}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-2 mb-1">
          <h4 className="font-headline text-3xl font-bold text-on-surface">
            <AnimatedNumber value={value} />
          </h4>
          {trend && (
            <span className={clsx('text-xs font-medium', trendColor)}>
              {trend}
            </span>
          )}
        </div>

        {/* Subtitle or extra info */}
        {subtitle && (
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        )}

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="mt-4 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: progressColor || 'var(--color-primary)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        )}

        {/* Target + Extra */}
        {(target || extra) && (
          <div className="mt-4 text-xs text-on-surface-variant flex justify-between">
            {target && <span>Target: {target}</span>}
            {extra && <span className="text-tertiary">{extra}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
