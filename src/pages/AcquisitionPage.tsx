import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import MetricCard from '../components/ui/MetricCard';
import ChartContainer from '../components/ui/ChartContainer';
import {
  acquisitionMetrics,
  dailySessionsData,
  topReferrers,
  channelSplitData,
  utmCampaigns,
} from '../data/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-panel rounded-lg px-3 py-2 text-xs ghost-border">
      <p className="font-medium text-on-surface mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function AcquisitionPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Acquisition Overview
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Last 30 Days • All Channels
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md font-medium text-sm text-primary hover:bg-surface-variant/30 transition-colors ghost-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Last 30 Days
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Total Sessions"
          value="124,592"
          trend={acquisitionMetrics.totalSessions.trend}
          direction={acquisitionMetrics.totalSessions.direction}
          icon="groups"
          subtitle={acquisitionMetrics.totalSessions.subtitle}
          index={0}
        />
        <MetricCard
          label="Avg. Session Duration"
          value={acquisitionMetrics.avgSessionDuration.value}
          trend={acquisitionMetrics.avgSessionDuration.trend}
          direction={acquisitionMetrics.avgSessionDuration.direction}
          icon="timer"
          subtitle={acquisitionMetrics.avgSessionDuration.subtitle}
          index={1}
        />
        <MetricCard
          label="Bounce Rate"
          value={acquisitionMetrics.bounceRate.value}
          trend={acquisitionMetrics.bounceRate.trend}
          direction={acquisitionMetrics.bounceRate.direction}
          icon="exit_to_app"
          subtitle={acquisitionMetrics.bounceRate.subtitle}
          index={2}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Sessions Bar Chart */}
        <ChartContainer
          title="Daily Sessions"
          subtitle="New vs Returning Users"
          colSpan={2}
          legend={
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">New</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-secondary" />
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Returning</span>
              </div>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailySessionsData} barGap={2}>
              <XAxis
                dataKey="day"
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
              <Bar dataKey="newUsers" name="New" fill="var(--primary)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="var(--secondary)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Top Referrers */}
        <ChartContainer title="Top Referrers">
          <div className="flex flex-col gap-4">
            {topReferrers.map((ref) => (
              <div
                key={ref.domain}
                className="flex items-center justify-between group p-2 hover:bg-surface-container-highest rounded-lg transition-colors -mx-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center"
                    style={{ color: `var(--${ref.color})` }}>
                    <span className="material-symbols-outlined text-sm">{ref.icon}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{ref.domain}</div>
                    <div className="text-xs text-on-surface-variant">{ref.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-on-surface">{ref.sessions}</div>
                  <div className={`text-xs flex items-center justify-end ${ref.direction === 'up' ? 'text-tertiary' : 'text-error'}`}>
                    <span className="material-symbols-outlined text-[10px]">
                      {ref.direction === 'up' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                    {ref.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Bottom Row: Channel Split + UTM Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Split Donut */}
        <ChartContainer title="Channel Split">
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={channelSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {channelSplitData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, '']}
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
            <div className="flex gap-4 text-xs font-label uppercase tracking-wider mt-2">
              {channelSplitData.map((ch) => (
                <div key={ch.name} className="flex items-center gap-1 text-on-surface-variant">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
                  {ch.name}
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        {/* UTM Campaign Table */}
        <ChartContainer
          title="UTM Campaign Performance"
          colSpan={2}
          action={
            <button className="bg-surface-bright text-primary text-sm font-medium px-4 py-2 rounded-lg hover:bg-surface-container-highest transition-colors">
              Export CSV
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-on-surface-variant text-[11px] font-label uppercase tracking-widest">
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Source</th>
                  <th className="pb-3 font-medium">Medium</th>
                  <th className="pb-3 font-medium text-right">Sessions</th>
                  <th className="pb-3 font-medium text-right">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {utmCampaigns.map((c) => (
                  <tr key={c.campaign} className="hover:bg-surface-bright/50 transition-colors">
                    <td className="py-4 text-on-surface font-medium">{c.campaign}</td>
                    <td className="py-4 text-on-surface-variant">{c.source}</td>
                    <td className="py-4 text-on-surface-variant">{c.medium}</td>
                    <td className="py-4 text-right font-medium">{c.sessions.toLocaleString()}</td>
                    <td className={`py-4 text-right ${c.positive ? 'text-tertiary' : 'text-error-dim'}`}>
                      {c.convRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
