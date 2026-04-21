import { motion } from 'framer-motion';
import StatusChip from '../components/ui/StatusChip';
import InsightCallout from '../components/ui/InsightCallout';
import { abTestExperiments } from '../data/mockData';

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}

function SignificanceMeter({ value }: { value: number }) {
  const isSignificant = value >= 95;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-on-surface-variant">Statistical Significance</span>
          <span className={`font-bold ${isSignificant ? 'text-tertiary' : 'text-on-surface-variant'}`}>
            {value}%
          </span>
        </div>
        <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden relative">
          {/* 95% threshold marker */}
          <div className="absolute top-0 bottom-0 left-[95%] w-px bg-on-surface-variant/30 z-10" />
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: isSignificant ? 'var(--color-tertiary)' : 'var(--color-secondary)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-1">
          <span>0%</span>
          <span className="text-on-surface-variant/50">95% threshold</span>
          <span>100%</span>
        </div>
      </div>
      <StatusChip status={isSignificant ? 'Significant' : 'Not Significant'} />
    </div>
  );
}

export default function ABTestingPage() {
  const running = abTestExperiments.filter(e => e.status === 'Running').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            A/B Testing Lab
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Active experiments and statistical analysis for conversion optimization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold tracking-wide uppercase text-tertiary bg-tertiary/10 px-2 py-1 rounded-sm">
            {running} Running
          </span>
          <button className="px-4 py-2 rounded-md font-medium text-sm btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Experiment
          </button>
        </div>
      </div>

      {/* PM Context Callout */}
      <InsightCallout
        text="💡 These A/B tests address Case Section 4, Questions 4-5: 'What would be your first 2 A/B tests?' — Test 1 targets paywall placement timing (the largest conversion drop-off in our funnel), and Test 2 targets model selection UI to reduce decision fatigue and improve enhancement completion rates."
      />

      {/* Experiment Cards */}
      {abTestExperiments.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.15 }}
          className="bg-surface-container-low rounded-xl p-6 ghost-border space-y-6"
        >
          {/* Experiment Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">science</span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-lg text-on-surface">
                  {exp.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-0.5">
                  <span>Started: {exp.startDate}</span>
                  <span>•</span>
                  <span>{exp.daysRunning} days</span>
                  <span>•</span>
                  <span>Traffic: {exp.traffic}</span>
                </div>
              </div>
            </div>
            <StatusChip status={exp.status} />
          </div>

          {/* Hypothesis */}
          <div className="bg-surface-container-highest rounded-lg p-4">
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">
              Hypothesis
            </div>
            <p className="text-sm text-on-surface leading-relaxed">{exp.hypothesis}</p>
          </div>

          {/* Control vs Variant Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Control */}
            <div className="bg-surface-container-highest rounded-lg p-4 ghost-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-on-surface-variant" />
                <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                  Control
                </span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">{exp.control.name}</h3>
              <p className="text-xs text-on-surface-variant mb-4">{exp.control.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-on-surface">
                  {exp.control.conversion}%
                </span>
                <span className="text-xs text-on-surface-variant">{exp.metricName}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                n = {exp.control.sampleSize.toLocaleString()}
              </p>
            </div>

            {/* Variant */}
            <div className="bg-surface-container-highest rounded-lg p-4 border border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/3" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-label uppercase tracking-widest text-primary">
                    Variant
                  </span>
                  {exp.isSignificant && (
                    <span className="text-[10px] font-bold text-tertiary ml-auto">
                      🏆 Winner
                    </span>
                  )}
                </div>
                <h3 className="font-headline font-bold text-on-surface mb-1">{exp.variant.name}</h3>
                <p className="text-xs text-on-surface-variant mb-4">{exp.variant.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-headline font-bold text-primary">
                    {exp.variant.conversion}%
                  </span>
                  <span className="text-xs text-tertiary font-bold">{exp.lift} lift</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  n = {exp.variant.sampleSize.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Significance Meter */}
          <SignificanceMeter value={exp.significance} />

          {/* Visual comparison bar */}
          <div>
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2">
              {exp.metricName} Comparison
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-on-surface-variant w-16">Control</span>
                <div className="flex-1">
                  <ProgressBar
                    value={exp.control.conversion}
                    max={Math.max(exp.control.conversion, exp.variant.conversion) * 1.2}
                    color="var(--color-outline-variant)"
                  />
                </div>
                <span className="text-xs font-medium text-on-surface w-12 text-right">
                  {exp.control.conversion}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-primary w-16">Variant</span>
                <div className="flex-1">
                  <ProgressBar
                    value={exp.variant.conversion}
                    max={Math.max(exp.control.conversion, exp.variant.conversion) * 1.2}
                    color="var(--color-primary)"
                  />
                </div>
                <span className="text-xs font-bold text-primary w-12 text-right">
                  {exp.variant.conversion}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
