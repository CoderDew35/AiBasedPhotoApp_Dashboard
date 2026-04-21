import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MetricCard from '../components/ui/MetricCard';
import ChartContainer from '../components/ui/ChartContainer';
import CohortHeatmap from '../components/ui/CohortHeatmap';
import {
  retentionMetrics,
  cohortHeatmapData,
  churnReasons,
  retentionTrajectory,
} from '../data/mockData';

export default function RetentionPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Retention Analysis
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Evaluating user stickiness and long-term cohort value.
          </p>
        </div>
        <button className="px-4 py-2 rounded-md font-medium text-sm btn-primary flex items-center gap-2 self-start">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export CSV
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Average D1 Retention"
          value={retentionMetrics.avgD1.value}
          trend={retentionMetrics.avgD1.trend}
          direction={retentionMetrics.avgD1.direction}
          index={0}
        />
        <MetricCard
          label="Average D30 Retention"
          value={retentionMetrics.avgD30.value}
          trend={retentionMetrics.avgD30.trend}
          direction={retentionMetrics.avgD30.direction}
          index={1}
        />
        <MetricCard
          label="Monthly Churn Rate"
          value={retentionMetrics.monthlyChurn.value}
          trend={retentionMetrics.monthlyChurn.trend}
          direction={retentionMetrics.monthlyChurn.direction}
          index={2}
        />
        <MetricCard
          label="Estimated LTV"
          value={retentionMetrics.estimatedLTV.value}
          trend={retentionMetrics.estimatedLTV.trend}
          direction={retentionMetrics.estimatedLTV.direction}
          index={3}
        />
      </div>

      {/* Heatmap + Churn/Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cohort Retention Heatmap */}
        <ChartContainer
          title="Cohort Retention Heatmap"
          colSpan={2}
          legend={
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span>Lower</span>
              <div className="flex gap-0.5">
                <div className="w-4 h-3 rounded-sm bg-surface-container-lowest" />
                <div className="w-4 h-3 rounded-sm bg-primary/15" />
                <div className="w-4 h-3 rounded-sm bg-tertiary/15" />
                <div className="w-4 h-3 rounded-sm bg-tertiary/25" />
                <div className="w-4 h-3 rounded-sm bg-tertiary/40" />
              </div>
              <span>Higher</span>
            </div>
          }
        >
          <CohortHeatmap data={cohortHeatmapData} />
        </ChartContainer>

        {/* Right Column: Churn Reasons + Trajectory */}
        <div className="space-y-6">
          {/* Top Churn Reasons */}
          <div className="bg-surface-container-high rounded-xl p-6 ghost-border">
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-4">
              Top Churn Reasons
            </h3>
            <div className="space-y-4">
              {churnReasons.map((reason) => (
                <div key={reason.reason}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface">{reason.reason}</span>
                    <span className="font-bold text-on-surface">{reason.percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${reason.percentage}%`,
                        backgroundColor: reason.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D1 vs D30 Trajectory */}
          <ChartContainer title="D1 vs D30 Trajectory">
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={retentionTrajectory} barSize={36}>
                <XAxis
                  dataKey="period"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Retention']}
                  contentStyle={{
                    backgroundColor: 'var(--surface-container-high)',
                    border: '1px solid var(--outline-variant)',
                    borderRadius: '0.375rem',
                    color: 'var(--on-surface)',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" fill="var(--secondary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
