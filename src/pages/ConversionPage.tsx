import MetricCard from '../components/ui/MetricCard';
import FunnelWidget from '../components/ui/FunnelWidget';
import StatusChip from '../components/ui/StatusChip';
import {
  conversionFunnel,
  conversionMetrics,
  featureAdoption,
  topAcquisitionChannels,
  cohortRetentionSummary,
} from '../data/mockData';

export default function ConversionPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
            Conversion Overview
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Last 30 Days • Global Segment
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md font-medium text-sm text-primary hover:bg-surface-variant/30 transition-colors ghost-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Date Range
          </button>
          <button className="px-4 py-2 rounded-md font-medium text-sm btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Core User Funnel */}
      <FunnelWidget steps={conversionFunnel} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Free-to-Pro Rate"
          value={conversionMetrics.freeToPro.value}
          trend={conversionMetrics.freeToPro.trend}
          direction={conversionMetrics.freeToPro.direction}
          icon="trending_up"
          progress={conversionMetrics.freeToPro.progress}
          progressColor="var(--color-primary)"
          index={0}
        />
        <MetricCard
          label="Trial-to-Paid Rate"
          value={conversionMetrics.trialToPaid.value}
          trend={conversionMetrics.trialToPaid.trend}
          direction={conversionMetrics.trialToPaid.direction}
          icon="account_balance_wallet"
          progress={conversionMetrics.trialToPaid.progress}
          progressColor="var(--color-secondary)"
          index={1}
        />
        <MetricCard
          label="ARPU"
          value={conversionMetrics.arpu.value}
          trend={conversionMetrics.arpu.trend}
          direction={conversionMetrics.arpu.direction}
          icon="attach_money"
          target={conversionMetrics.arpu.target}
          extra={conversionMetrics.arpu.extra}
          index={2}
        />
        <MetricCard
          label="MRR"
          value={conversionMetrics.mrr.value}
          trend={conversionMetrics.mrr.trend}
          direction={conversionMetrics.mrr.direction}
          icon="monitoring"
          extra={conversionMetrics.mrr.extra}
          index={3}
        />
      </div>

      {/* Feature Adoption & Retention Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feature Adoption Table */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-6 ghost-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-semibold text-lg text-on-surface">
              Feature Adoption
            </h3>
            <button className="text-xs font-medium text-primary hover:text-primary-dim transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-on-surface-variant text-[11px] font-label uppercase tracking-widest">
                  <th className="pb-3 font-medium">Feature</th>
                  <th className="pb-3 font-medium">Usage % (Active)</th>
                  <th className="pb-3 font-medium">Sessions/User/Wk</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {featureAdoption.map((feature) => (
                  <tr key={feature.name} className="hover:bg-surface-container-highest transition-colors group">
                    <td className="py-4 flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--color-${feature.colorClass}) 15%, transparent)`,
                          color: `var(--color-${feature.colorClass})`,
                        }}
                      >
                        <span className="material-symbols-outlined text-[18px]">{feature.icon}</span>
                      </div>
                      <span className="font-medium text-on-surface">{feature.name}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-on-surface">{feature.usage}%</span>
                        <div className="w-16 h-1 bg-surface-container-highest rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${feature.usage}%`,
                              backgroundColor: `var(--color-${feature.colorClass})`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-on-surface-variant">{feature.sessionsPerWeek}</td>
                    <td className="py-4">
                      <StatusChip status={feature.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Retention & Acquisition Sidebar */}
        <div className="space-y-6">
          {/* Cohort Retention Mini */}
          <div className="bg-surface-container-low rounded-xl p-6 ghost-border hover:bg-surface-container-high transition-colors">
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-4">
              Cohort Retention
            </h3>
            <div className="space-y-4">
              {Object.entries(cohortRetentionSummary).map(([key, data]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">
                      {key.toUpperCase()} Retention
                    </span>
                    <span className="font-bold text-on-surface">{data.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${data.bar}%`,
                        backgroundColor:
                          key === 'd1' ? 'var(--color-tertiary)' :
                          key === 'd7' ? 'var(--color-primary)' :
                          'var(--color-secondary)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Acquisition Channels */}
          <div className="bg-surface-container-low rounded-xl p-6 ghost-border hover:bg-surface-container-high transition-colors">
            <h3 className="font-headline font-semibold text-sm text-on-surface mb-4">
              Top Acquisition Channels
            </h3>
            <ul className="space-y-3">
              {topAcquisitionChannels.map((ch) => (
                <li key={ch.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: `var(--color-${ch.color})` }}
                    />
                    <span className="text-on-surface-variant">{ch.name}</span>
                  </div>
                  <span className="font-medium text-on-surface">{ch.share}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
