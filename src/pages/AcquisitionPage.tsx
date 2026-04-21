import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  AreaChart, Area, Line,
} from 'recharts';
import { motion } from 'framer-motion';
import MetricCard from '../components/ui/MetricCard';
import ChartContainer from '../components/ui/ChartContainer';
import StatusChip from '../components/ui/StatusChip';
import {
  acquisitionMetrics,
  dailySessionsData,
  topReferrers,
  channelSplitData,
  utmCampaigns,
  seoMetrics,
  coreWebVitals,
  keywordRankings,
  organicLandingPages,
  organicTrafficTrend,
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

function VitalGauge({ metric, label, value, unit, threshold, status }: {
  metric: string; label: string; value: number; unit: string; threshold: number; status: string;
}) {
  const pct = Math.min((value / threshold) * 100, 100);
  const isGood = status === 'Good';

  return (
    <motion.div
      className="bg-surface-container-highest rounded-lg p-4 ghost-border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold font-label uppercase tracking-widest text-on-surface-variant">{metric}</span>
        <StatusChip status={isGood ? 'Good' : 'Needs Work'} />
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-headline font-bold text-on-surface">{value}</span>
        <span className="text-xs text-on-surface-variant">{unit}</span>
      </div>
      <p className="text-[10px] text-on-surface-variant mb-3">{label}</p>
      <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden relative">
        <div className="absolute top-0 bottom-0 bg-on-surface-variant/20 rounded-full" style={{ width: '100%' }} />
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: isGood ? 'var(--color-tertiary)' : 'var(--color-error)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-on-surface-variant mt-1">
        <span>0</span>
        <span>Threshold: {threshold}{unit}</span>
      </div>
    </motion.div>
  );
}

function DifficultyBar({ value }: { value: number }) {
  const getColor = (v: number) => {
    if (v < 40) return 'var(--color-tertiary)';
    if (v < 60) return 'var(--color-secondary)';
    if (v < 75) return 'var(--color-primary)';
    return 'var(--color-error)';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: getColor(value) }} />
      </div>
      <span className="text-xs text-on-surface-variant">{value}</span>
    </div>
  );
}

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

      {/* ═══════════════════════════════════════════════════════════════
          SEO & ORGANIC PERFORMANCE SECTION
          ═══════════════════════════════════════════════════════════════ */}

      {/* SEO Section Divider */}
      <div className="flex items-center gap-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary">monitoring</span>
          </div>
          <div>
            <h2 className="font-headline text-xl font-bold text-on-surface">
              SEO & Organic Performance
            </h2>
            <p className="text-xs text-on-surface-variant">
              Search visibility, keyword rankings, Core Web Vitals, and organic traffic analysis
            </p>
          </div>
        </div>
      </div>

      {/* SEO Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Search Visibility"
          value={seoMetrics.searchVisibility.value}
          trend={seoMetrics.searchVisibility.trend}
          direction={seoMetrics.searchVisibility.direction}
          icon="visibility"
          subtitle={seoMetrics.searchVisibility.subtitle}
          index={0}
        />
        <MetricCard
          label="Domain Authority"
          value={seoMetrics.domainAuthority.value}
          trend={seoMetrics.domainAuthority.trend}
          direction={seoMetrics.domainAuthority.direction}
          icon="shield"
          subtitle={seoMetrics.domainAuthority.subtitle}
          index={1}
        />
        <MetricCard
          label="Indexed Pages"
          value={seoMetrics.indexedPages.value}
          trend={seoMetrics.indexedPages.trend}
          direction={seoMetrics.indexedPages.direction}
          icon="file_copy"
          subtitle={seoMetrics.indexedPages.subtitle}
          index={2}
        />
        <MetricCard
          label="Avg. Position"
          value={seoMetrics.avgPosition.value}
          trend={seoMetrics.avgPosition.trend}
          direction={seoMetrics.avgPosition.direction}
          icon="leaderboard"
          subtitle={seoMetrics.avgPosition.subtitle}
          index={3}
        />
      </div>

      {/* Organic Traffic Trend + Core Web Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organic Traffic Trend */}
        <ChartContainer
          title="Organic Traffic Growth"
          subtitle="Sessions & clicks from Google Search Console"
          colSpan={2}
          legend={
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-tertiary" />
                <span className="text-xs font-label text-on-surface-variant uppercase tracking-wider">Clicks</span>
              </div>
            </div>
          }
        >
          <div className="w-full h-full min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={organicTrafficTrend}>
                <defs>
                  <linearGradient id="gradSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
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
                  width={40}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sessions" name="Sessions" stroke="var(--primary)" fill="url(#gradSessions)" strokeWidth={2} />
                <Line type="monotone" dataKey="clicks" name="Clicks" stroke="var(--tertiary)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Core Web Vitals */}
        <ChartContainer title="Core Web Vitals" subtitle="PageSpeed Insights (Mobile)">
          <div className="flex flex-col gap-3">
            {coreWebVitals.map((vital) => (
              <VitalGauge key={vital.metric} {...vital} />
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Keyword Rankings Table */}
      <ChartContainer
        title="Top Keyword Rankings"
        subtitle="Google Search Console — Top 8 by search volume"
        action={
          <button className="bg-surface-bright text-primary text-sm font-medium px-4 py-2 rounded-lg hover:bg-surface-container-highest transition-colors">
            Full Report
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-on-surface-variant text-[11px] font-label uppercase tracking-widest">
                <th className="pb-3 font-medium">Keyword</th>
                <th className="pb-3 font-medium text-right">Volume</th>
                <th className="pb-3 font-medium text-right">Position</th>
                <th className="pb-3 font-medium text-right">Δ</th>
                <th className="pb-3 font-medium text-right">CTR</th>
                <th className="pb-3 font-medium">Difficulty</th>
                <th className="pb-3 font-medium">Intent</th>
              </tr>
            </thead>
            <tbody>
              {keywordRankings.map((kw) => (
                <tr key={kw.keyword} className="hover:bg-surface-bright/50 transition-colors">
                  <td className="py-3 text-on-surface font-medium">{kw.keyword}</td>
                  <td className="py-3 text-right text-on-surface-variant">{kw.volume.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold ${
                      kw.position <= 3 ? 'bg-tertiary/15 text-tertiary' :
                      kw.position <= 10 ? 'bg-primary/15 text-primary' :
                      'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {kw.position}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {kw.change !== 0 ? (
                      <span className={`text-xs flex items-center justify-end gap-0.5 ${kw.change > 0 ? 'text-tertiary' : 'text-error'}`}>
                        <span className="material-symbols-outlined text-[12px]">
                          {kw.change > 0 ? 'arrow_upward' : 'arrow_downward'}
                        </span>
                        {Math.abs(kw.change)}
                      </span>
                    ) : (
                      <span className="text-xs text-on-surface-variant">—</span>
                    )}
                  </td>
                  <td className="py-3 text-right text-on-surface">{kw.ctr}%</td>
                  <td className="py-3"><DifficultyBar value={kw.difficulty} /></td>
                  <td className="py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                      kw.intent === 'Transactional' ? 'bg-tertiary/10 text-tertiary' :
                      kw.intent === 'Commercial' ? 'bg-primary/10 text-primary' :
                      'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {kw.intent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>

      {/* Organic Landing Pages */}
      <ChartContainer
        title="Top Organic Landing Pages"
        subtitle="Highest-traffic entry points from search engines"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-on-surface-variant text-[11px] font-label uppercase tracking-widest">
                <th className="pb-3 font-medium">Page</th>
                <th className="pb-3 font-medium text-right">Organic Sessions</th>
                <th className="pb-3 font-medium text-right">Conv. Rate</th>
                <th className="pb-3 font-medium text-right">Bounce</th>
                <th className="pb-3 font-medium text-right">Avg. Time</th>
                <th className="pb-3 font-medium">Top Keyword</th>
              </tr>
            </thead>
            <tbody>
              {organicLandingPages.map((lp) => (
                <tr key={lp.page} className="hover:bg-surface-bright/50 transition-colors">
                  <td className="py-3 text-primary font-medium">{lp.page}</td>
                  <td className="py-3 text-right text-on-surface font-medium">{lp.sessions.toLocaleString()}</td>
                  <td className={`py-3 text-right ${lp.convRate >= 5 ? 'text-tertiary' : 'text-on-surface'}`}>
                    {lp.convRate}%
                  </td>
                  <td className={`py-3 text-right ${lp.bounceRate > 50 ? 'text-error-dim' : 'text-on-surface-variant'}`}>
                    {lp.bounceRate}%
                  </td>
                  <td className="py-3 text-right text-on-surface-variant">{lp.avgTime}</td>
                  <td className="py-3 text-xs text-on-surface-variant italic">{lp.topKeyword}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>
    </div>
  );
}
