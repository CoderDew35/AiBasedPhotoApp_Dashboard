import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import MetricCard from '../components/ui/MetricCard';
import ChartContainer from '../components/ui/ChartContainer';
import { activationMetrics, userMilestones, timeToValueData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-panel rounded-lg px-3 py-2 text-xs ghost-border">
      <p className="font-medium text-on-surface mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.value.toLocaleString()} users
        </p>
      ))}
    </div>
  );
};

export default function ActivationPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Activation
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Monitor user progression from initial signup to their first successful high-res export.
            Identifying bottlenecks in the "Time to Value" flow.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md font-medium text-sm text-primary hover:bg-surface-variant/30 transition-colors ghost-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Last 30 Days
          </button>
          <button className="px-4 py-2 rounded-md font-medium text-sm btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Activation Rate"
          value={activationMetrics.activationRate.value}
          trend={activationMetrics.activationRate.trend}
          direction={activationMetrics.activationRate.direction}
          icon="bolt"
          index={0}
        />
        <MetricCard
          label="First Upload Rate"
          value={activationMetrics.firstUploadRate.value}
          subtitle={activationMetrics.firstUploadRate.subtitle}
          icon="cloud_upload"
          index={1}
        />
        <MetricCard
          label="Mean Time to Enhance"
          value={activationMetrics.meanTimeToEnhance.value}
          trend={activationMetrics.meanTimeToEnhance.trend}
          direction={activationMetrics.meanTimeToEnhance.direction}
          icon="timer"
          index={2}
        />
        <MetricCard
          label="D1 Feature Usage"
          value={activationMetrics.d1FeatureUsage.value}
          subtitle={activationMetrics.d1FeatureUsage.subtitle}
          icon="tune"
          index={3}
        />
      </div>

      {/* Milestone Progress + TTV */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Milestone Progress */}
        <ChartContainer
          title="User Milestone Progress"
          colSpan={2}
          action={
            <span className="text-xs font-bold tracking-wide uppercase text-tertiary bg-tertiary/10 px-2 py-1 rounded-sm">
              Cohort A
            </span>
          }
        >
          <div className="space-y-6">
            {userMilestones.map((milestone, i) => (
              <div key={milestone.step}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-on-surface">
                    {milestone.step}. {milestone.label}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {milestone.users.toLocaleString()} ({milestone.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: milestone.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.percentage}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Time to Value Distribution */}
        <ChartContainer
          title="Time to Value (TTV)"
          subtitle="Distribution of time from signup to first successful export."
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timeToValueData}>
              <XAxis
                dataKey="range"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-container-highest)', opacity: 0.3 }} />
              <Bar dataKey="users" radius={[2, 2, 0, 0]}>
                {timeToValueData.map((_entry, index) => (
                  <Cell
                    key={index}
                    fill={index === 2 ? 'var(--tertiary)' : 'var(--secondary)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
