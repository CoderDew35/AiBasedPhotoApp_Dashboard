import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import MetricCard from '../components/ui/MetricCard';
import ChartContainer from '../components/ui/ChartContainer';
import {
  revenueMetrics,
  revenueGrowthData,
  planDistribution,
  revenueByFeature,
} from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-panel rounded-lg px-3 py-2 text-xs ghost-border">
      <p className="font-medium text-on-surface mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ${(p.value / 1000).toFixed(0)}K
        </p>
      ))}
    </div>
  );
};

export default function RevenuePage() {
  const totalActive = planDistribution.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Revenue Intelligence
          </h1>
          <p className="text-on-surface-variant text-sm mt-1 uppercase tracking-wider font-label">
            Financial Performance Matrix
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md font-medium text-sm text-primary hover:bg-surface-variant/30 transition-colors ghost-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Last 12 Months
          </button>
          <button className="px-4 py-2 rounded-md font-medium text-sm btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Revenue (YTD)"
          value={revenueMetrics.totalRevYTD.value}
          trend={revenueMetrics.totalRevYTD.trend}
          direction={revenueMetrics.totalRevYTD.direction}
          subtitle={revenueMetrics.totalRevYTD.subtitle}
          icon="account_balance"
          index={0}
        />
        <MetricCard
          label="ARPU"
          value={revenueMetrics.arpu.value}
          trend={revenueMetrics.arpu.trend}
          direction={revenueMetrics.arpu.direction}
          subtitle={revenueMetrics.arpu.subtitle}
          icon="person"
          index={1}
        />
        <MetricCard
          label="MRR"
          value={revenueMetrics.mrr.value}
          trend={revenueMetrics.mrr.trend}
          direction={revenueMetrics.mrr.direction}
          subtitle={revenueMetrics.mrr.subtitle}
          icon="trending_up"
          index={2}
        />
        <MetricCard
          label="Net Rev Retention"
          value={revenueMetrics.netRevRetention.value}
          subtitle={revenueMetrics.netRevRetention.subtitle}
          direction={revenueMetrics.netRevRetention.direction}
          icon="autorenew"
          index={3}
        />
      </div>

      {/* Revenue Growth Velocity */}
      <ChartContainer
        title="Revenue Growth Velocity"
        colSpan={3}
        legend={
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">MRR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-secondary opacity-50" />
              <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Target</span>
            </div>
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueGrowthData}>
            <defs>
              <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
              width={50}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="target"
              stroke="var(--secondary)"
              strokeDasharray="5 5"
              strokeWidth={2}
              fill="none"
              name="Target"
            />
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#mrrGradient)"
              name="MRR"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Plan Distribution + Revenue by Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Distribution Donut */}
        <ChartContainer title="Plan Distribution">
          <div className="flex items-center justify-center gap-8">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: 'var(--surface-container-high)',
                      border: '1px solid var(--outline-variant)',
                      borderRadius: '0.375rem',
                      color: 'var(--on-surface)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-headline text-on-surface">3.2k</span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-label">Total Active</span>
              </div>
            </div>
            <div className="space-y-3">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: plan.color }} />
                  <div>
                    <div className="text-sm font-medium text-on-surface">{plan.name}</div>
                    <div className="text-xs text-on-surface-variant">{plan.value}% • {plan.revenue} MRR</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        {/* Revenue by Feature Add-on */}
        <ChartContainer title="Revenue by Feature Add-on">
          <div className="space-y-5">
            {revenueByFeature.map((feat, i) => (
              <div key={feat.feature}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]" style={{ color: feat.color }}>
                      {feat.icon}
                    </span>
                    <span className="text-sm font-medium text-on-surface">{feat.feature}</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface">{feat.revenue}</span>
                </div>
                <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: feat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${feat.percentage}%` }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
