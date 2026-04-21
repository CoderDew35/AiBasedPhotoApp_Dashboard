import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import InsightCallout from './InsightCallout';

interface FunnelStep {
  icon: string;
  label: string;
  percentage: number;
  users: number;
  color: string;
  insight?: string;
}

interface FunnelWidgetProps {
  steps: FunnelStep[];
  title?: string;
  badge?: string;
}

export default function FunnelWidget({ steps, title = 'Core User Funnel', badge = 'Global' }: FunnelWidgetProps) {
  const [activeInsight, setActiveInsight] = useState<number | null>(null);

  return (
    <section className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden group hover:bg-surface-container-high/50 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline font-semibold text-lg text-on-surface">{title}</h3>
        <span className="text-xs font-bold tracking-wide uppercase text-tertiary bg-tertiary/10 px-2 py-1 rounded-sm">
          {badge}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between w-full relative z-10">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const dropoff = i > 0 ? steps[i - 1].percentage - step.percentage : 0;

          return (
            <div key={step.label} className="contents">
              {/* Dropoff arrow (between steps) */}
              {i > 0 && (
                <div
                  className="hidden lg:flex flex-col items-center px-1 cursor-pointer relative"
                  onMouseEnter={() => step.insight ? setActiveInsight(i) : null}
                  onMouseLeave={() => setActiveInsight(null)}
                >
                  <span className="material-symbols-outlined text-error-dim text-sm">
                    arrow_right_alt
                  </span>
                  <span className="text-[10px] text-error-dim font-medium">
                    -{dropoff}%
                  </span>

                  {/* Insight tooltip */}
                  {activeInsight === i && step.insight && (
                    <div className="absolute top-full mt-2 z-50 w-72 left-1/2 -translate-x-1/2">
                      <InsightCallout text={step.insight} />
                    </div>
                  )}
                </div>
              )}

              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={clsx(
                  'flex-1 flex flex-col items-center p-4 rounded-lg ghost-border relative',
                  isLast
                    ? 'bg-surface-container-lowest border-primary/30 overflow-hidden'
                    : 'bg-surface-container-highest'
                )}
              >
                {isLast && <div className="absolute inset-0 bg-primary/5" />}
                <span
                  className={clsx(
                    'material-symbols-outlined mb-2 text-3xl relative z-10',
                    `text-${step.color}`
                  )}
                  style={
                    isLast
                      ? { fontVariationSettings: "'FILL' 1", color: 'var(--color-tertiary)' }
                      : { color: `var(--color-${step.color})` }
                  }
                >
                  {step.icon}
                </span>
                <span
                  className={clsx(
                    'text-2xl font-headline font-bold relative z-10',
                    isLast ? 'text-tertiary' : 'text-on-surface'
                  )}
                >
                  {step.percentage}%
                </span>
                <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mt-1 text-center relative z-10">
                  {step.label}
                </span>
                <div
                  className={clsx(
                    'text-xs mt-2 relative z-10',
                    isLast ? 'text-tertiary' : 'text-on-surface-variant'
                  )}
                >
                  {step.users.toLocaleString()} users
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile insights: show below funnel */}
      <div className="lg:hidden mt-6 space-y-3">
        {steps.filter(s => s.insight).map((step, i) => (
          <InsightCallout key={i} text={step.insight!} />
        ))}
      </div>
    </section>
  );
}
