// Acquisition Page Data 
export const acquisitionMetrics = {
  totalSessions: { value: 124592, trend: '+12.4%', direction: 'up' as const, subtitle: 'vs last period' },
  avgSessionDuration: { value: '04:21', trend: '+0:15', direction: 'up' as const, subtitle: 'vs last period' },
  bounceRate: { value: '42.8%', trend: '+2.1%', direction: 'down' as const, subtitle: 'vs last period' },
};

export const dailySessionsData = [
  { day: 'Mon', newUsers: 2800, returning: 1400 },
  { day: 'Tue', newUsers: 3800, returning: 1900 },
  { day: 'Wed', newUsers: 4800, returning: 1200 },
  { day: 'Thu', newUsers: 3400, returning: 2400 },
  { day: 'Fri', newUsers: 5800, returning: 2900 },
  { day: 'Sat', newUsers: 6800, returning: 3800 },
  { day: 'Sun', newUsers: 5400, returning: 3400 },
];

export const topReferrers = [
  { domain: 'google.com', category: 'Organic Search', sessions: '45.2K', trend: '+8%', direction: 'up' as const, icon: 'travel_explore', color: 'primary' as const },
  { domain: 'instagram.com', category: 'Social Media', sessions: '28.1K', trend: '+12%', direction: 'up' as const, icon: 'photo_camera', color: 'secondary' as const },
  { domain: 'youtube.com', category: 'Video Platform', sessions: '15.8K', trend: '-3%', direction: 'down' as const, icon: 'play_circle', color: 'primary-dim' as const },
  { domain: 'Direct', category: 'Typed/Bookmarked', sessions: '12.4K', trend: '+1%', direction: 'up' as const, icon: 'link', color: 'on-surface-variant' as const },
];

export const channelSplitData = [
  { name: 'Organic', value: 45, color: 'var(--color-primary)' },
  { name: 'Social', value: 30, color: 'var(--color-secondary)' },
  { name: 'Direct', value: 15, color: 'var(--color-tertiary)' },
  { name: 'Paid', value: 10, color: 'var(--color-inverse-primary)' },
];

export const utmCampaigns = [
  { campaign: 'Q3_Feature_Launch', source: 'google', medium: 'cpc', sessions: 12405, convRate: 4.2, positive: true },
  { campaign: 'IG_Creator_Promo', source: 'instagram', medium: 'social', sessions: 8920, convRate: 3.8, positive: true },
  { campaign: 'Weekly_Newsletter_Oct', source: 'newsletter', medium: 'email', sessions: 5102, convRate: 8.5, positive: true },
  { campaign: 'Summer_Sale_Retargeting', source: 'facebook', medium: 'cpc', sessions: 3450, convRate: 1.2, positive: false },
];

// SEO & Organic Performance Data
export const seoMetrics = {
  searchVisibility: { value: '34.2%', trend: '+4.8%', direction: 'up' as const, subtitle: 'Google SERP visibility' },
  domainAuthority: { value: '52', trend: '+3', direction: 'up' as const, subtitle: 'Moz DA score' },
  indexedPages: { value: '1,284', trend: '+142', direction: 'up' as const, subtitle: 'vs last month' },
  avgPosition: { value: '12.8', trend: '-2.3', direction: 'up' as const, subtitle: 'Improved rank' },
};

export const coreWebVitals = [
  { metric: 'LCP', label: 'Largest Contentful Paint', value: 1.8, unit: 's', threshold: 2.5, status: 'Good' as const, color: 'var(--color-tertiary)' },
  { metric: 'INP', label: 'Interaction to Next Paint', value: 142, unit: 'ms', threshold: 200, status: 'Good' as const, color: 'var(--color-tertiary)' },
  { metric: 'CLS', label: 'Cumulative Layout Shift', value: 0.04, unit: '', threshold: 0.1, status: 'Good' as const, color: 'var(--color-tertiary)' },
  { metric: 'FCP', label: 'First Contentful Paint', value: 1.2, unit: 's', threshold: 1.8, status: 'Good' as const, color: 'var(--color-tertiary)' },
  { metric: 'TTFB', label: 'Time to First Byte', value: 380, unit: 'ms', threshold: 800, status: 'Good' as const, color: 'var(--color-tertiary)' },
];

export const keywordRankings = [
  { keyword: 'ai photo enhancer', volume: 33100, position: 3, change: 2, ctr: 12.4, difficulty: 72, intent: 'Commercial' as const },
  { keyword: 'enhance photo online free', volume: 22400, position: 5, change: -1, ctr: 8.2, difficulty: 65, intent: 'Transactional' as const },
  { keyword: 'ai video enhancer', volume: 18200, position: 8, change: 5, ctr: 4.1, difficulty: 58, intent: 'Commercial' as const },
  { keyword: 'upscale image ai', volume: 14800, position: 4, change: 1, ctr: 10.8, difficulty: 61, intent: 'Transactional' as const },
  { keyword: 'photo denoiser online', volume: 9900, position: 2, change: 3, ctr: 18.5, difficulty: 45, intent: 'Transactional' as const },
  { keyword: 'ai photo editor web', volume: 8100, position: 11, change: -2, ctr: 2.8, difficulty: 78, intent: 'Informational' as const },
  { keyword: 'video upscaling software', volume: 6600, position: 14, change: 4, ctr: 1.9, difficulty: 55, intent: 'Commercial' as const },
  { keyword: 'best ai image enhancement 2026', volume: 4400, position: 6, change: 0, ctr: 6.7, difficulty: 42, intent: 'Informational' as const },
];

export const organicLandingPages = [
  { page: '/enhance', sessions: 18420, convRate: 5.2, bounceRate: 38, avgTime: '3:45', topKeyword: 'ai photo enhancer' },
  { page: '/video-enhance', sessions: 8940, convRate: 3.8, bounceRate: 45, avgTime: '2:58', topKeyword: 'ai video enhancer' },
  { page: '/pricing', sessions: 6210, convRate: 12.4, bounceRate: 52, avgTime: '1:42', topKeyword: 'photoapp pricing' },
  { page: '/blog/best-ai-photo-tools', sessions: 4850, convRate: 1.8, bounceRate: 62, avgTime: '4:20', topKeyword: 'best ai photo tools' },
  { page: '/filters', sessions: 3620, convRate: 4.1, bounceRate: 41, avgTime: '3:12', topKeyword: 'ai photo filters online' },
];

export const organicTrafficTrend = [
  { month: 'Jan', sessions: 28000, clicks: 22400 },
  { month: 'Feb', sessions: 31000, clicks: 24800 },
  { month: 'Mar', sessions: 35000, clicks: 28000 },
  { month: 'Apr', sessions: 38500, clicks: 31200 },
  { month: 'May', sessions: 42000, clicks: 33600 },
  { month: 'Jun', sessions: 45200, clicks: 36100 },
];

// Activation Page Data
export const activationMetrics = {
  activationRate: { value: '68.4%', trend: '+2.1%', direction: 'up' as const, subtitle: '', icon: 'bolt' },
  firstUploadRate: { value: '82.1%', trend: '', direction: 'neutral' as const, subtitle: 'of signups', icon: 'cloud_upload' },
  meanTimeToEnhance: { value: '4m 12s', trend: '-45s', direction: 'up' as const, subtitle: '', icon: 'timer' },
  d1FeatureUsage: { value: '2.4', trend: '', direction: 'neutral' as const, subtitle: 'tools/user', icon: 'tune' },
};

export const userMilestones = [
  { step: 1, label: 'Signup Complete', users: 10420, percentage: 100, color: 'var(--color-primary)' },
  { step: 2, label: 'First Image Upload', users: 8554, percentage: 82, color: 'var(--color-primary)' },
  { step: 3, label: 'Preview Enhancement', users: 7422, percentage: 71, color: 'var(--color-secondary)' },
  { step: 4, label: 'Export High-Res', users: 6104, percentage: 58, color: 'var(--color-tertiary)' },
];

export const timeToValueData = [
  { range: '< 1m', users: 800 },
  { range: '1-3m', users: 2200 },
  { range: '3-5m', users: 3800 },
  { range: '5-10m', users: 2400 },
  { range: '> 10m', users: 1200 },
];

// Conversion Page Data
export const conversionFunnel = [
  { icon: 'login', label: 'Visit', percentage: 100, users: 1245000, color: 'primary', insight: '' },
  { icon: 'upload_file', label: 'Upload Initiated', percentage: 60, users: 747000, color: 'secondary', insight: '💡 40% drop-off before upload. Healthy if CTA is above the fold — test drag-and-drop UI and pre-upload preview.' },
  { icon: 'auto_fix_high', label: 'Enhancement Complete', percentage: 45, users: 560250, color: 'tertiary', insight: '💡 Model selection confusion causes 15% abandonment. "Smart Enhance" autopilot mode is the highest-leverage fix (A/B Test #2).' },
  { icon: 'credit_card', label: 'Paywall Shown', percentage: 30, users: 373500, color: 'primary', insight: '💡 Premature monetization interrupts flow. Delaying paywall to result screen is the single highest-impact intervention (A/B Test #1).' },
  { icon: 'person_add', label: 'Signup', percentage: 15, users: 186750, color: 'secondary', insight: '💡 Paywall-to-signup at 50%. Test three copy variants: urgency, social proof, and trust-first framing.' },
  { icon: 'workspace_premium', label: 'Export / Pay', percentage: 8, users: 99600, color: 'tertiary', insight: '💡 8-10% final conversion — recoverable with better framing and post-value gate strategy.' },
];

export const conversionMetrics = {
  freeToPro: { value: '4.2%', trend: '+0.3%', direction: 'up' as const, progress: 42 },
  trialToPaid: { value: '68%', trend: '+2.1%', direction: 'up' as const, progress: 68 },
  arpu: { value: '$12.40', trend: '-0.5%', direction: 'down' as const, target: '$13.00', extra: 'Avg LTV: $45' },
  mrr: { value: '$2.4M', trend: '+5.2%', direction: 'up' as const, extra: '+$118k' },
};

export const featureAdoption = [
  { name: 'AI Filter', icon: 'filter_vintage', usage: 78, sessionsPerWeek: 4.2, status: 'High Growth' as const, colorClass: 'tertiary' },
  { name: 'Video Enhance', icon: 'movie_edit', usage: 34, sessionsPerWeek: 1.8, status: 'Stable' as const, colorClass: 'primary' },
  { name: 'Face Retouch', icon: 'face_retouching_natural', usage: 62, sessionsPerWeek: 3.5, status: 'Stable' as const, colorClass: 'secondary' },
];

export const topAcquisitionChannels = [
  { name: 'Organic Search', share: '45%', color: 'tertiary' },
  { name: 'Paid Social', share: '30%', color: 'primary' },
  { name: 'Referral', share: '15%', color: 'secondary' },
  { name: 'Other', share: '10%', color: 'outline-variant' },
];

export const cohortRetentionSummary = {
  d1: { value: '42%', bar: 42 },
  d7: { value: '21%', bar: 21 },
  d30: { value: '9%', bar: 9 },
};

// Retention Page Data
export const retentionMetrics = {
  avgD1: { value: '42%', trend: '+2.4%', direction: 'up' as const },
  avgD30: { value: '12%', trend: '-0.5%', direction: 'down' as const },
  monthlyChurn: { value: '4.8%', trend: '—Stable', direction: 'neutral' as const },
  estimatedLTV: { value: '$48.20', trend: '+12%', direction: 'up' as const },
};

export const cohortHeatmapData = [
  { cohort: 'Jan 2026', size: 12450, m0: 100, m1: 42, m2: 28, m3: 15 },
  { cohort: 'Feb 2026', size: 14200, m0: 100, m1: 48, m2: 32, m3: 21 },
  { cohort: 'Mar 2026', size: 18900, m0: 100, m1: 40, m2: 22, m3: null },
  { cohort: 'Apr 2026', size: 21150, m0: 100, m1: 55, m2: null, m3: null },
  { cohort: 'May 2026', size: 8400, m0: 100, m1: null, m2: null, m3: null },
];

export const churnReasons = [
  { reason: 'Price Tolerance', percentage: 42, color: 'var(--color-primary)' },
  { reason: 'Feature Gap', percentage: 28, color: 'var(--color-secondary)' },
  { reason: 'Infrequent Need', percentage: 18, color: 'var(--color-surface-container-highest)' },
  { reason: 'Technical Issues', percentage: 12, color: 'var(--color-error-dim)' },
];

export const retentionTrajectory = [
  { period: 'D1', value: 42 },
  { period: 'D7', value: 21 },
  { period: 'D30', value: 9 },
];

// Revenue Page Data
export const revenueMetrics = {
  totalRevYTD: { value: '$1.2M', trend: '+14.2%', direction: 'up' as const, subtitle: 'vs last year' },
  arpu: { value: '$48.20', trend: '+5.8%', direction: 'up' as const, subtitle: 'vs last month' },
  mrr: { value: '$95K', trend: '+8.4%', direction: 'up' as const, subtitle: 'vs last month' },
  netRevRetention: { value: '112%', trend: '', direction: 'up' as const, subtitle: '✅ Target Met' },
};

export const revenueGrowthData = [
  { month: 'Jan', mrr: 12000, target: 25000 },
  { month: 'Feb', mrr: 18000, target: 28000 },
  { month: 'Mar', mrr: 28000, target: 32000 },
  { month: 'Apr', mrr: 35000, target: 38000 },
  { month: 'May', mrr: 55000, target: 45000 },
  { month: 'Jun', mrr: 62000, target: 52000 },
  { month: 'Jul', mrr: 68000, target: 60000 },
  { month: 'Aug', mrr: 75000, target: 68000 },
  { month: 'Sep', mrr: 82000, target: 75000 },
  { month: 'Oct', mrr: 95000, target: 82000 },
  { month: 'Nov', mrr: 108000, target: 90000 },
];

export const planDistribution = [
  { name: 'Pro Monthly', value: 60, revenue: '$57K', color: 'var(--color-primary)' },
  { name: 'Pro Annual', value: 25, revenue: '$24K', color: 'var(--color-secondary)' },
  { name: 'Enterprise', value: 15, revenue: '$14K', color: 'var(--color-tertiary)' },
];

export const revenueByFeature = [
  { feature: 'AI Filter Credits', revenue: '$42.5K', percentage: 46, icon: 'auto_awesome', color: 'var(--color-primary)' },
  { feature: 'Video Enhancement', revenue: '$31.8K', percentage: 34, icon: 'movie_edit', color: 'var(--color-tertiary)' },
  { feature: 'Storage Upsell', revenue: '$18.2K', percentage: 20, icon: 'cloud_upload', color: 'var(--color-secondary)' },
];

// A/B Testing Page Data
export const abTestExperiments = [
  {
    id: 'exp-001',
    name: 'Paywall Placement Timing',
    status: 'Running' as const,
    hypothesis: 'Showing the paywall before enhancement preview (after upload) will increase free-to-pro conversion by reducing "sunk effort" bias that leads to frustration when users see the paywall after waiting for processing.',
    startDate: 'Apr 1, 2026',
    daysRunning: 20,
    traffic: '50/50',
    control: {
      name: 'After Enhancement',
      description: 'Paywall shown after AI enhancement completes',
      conversion: 3.8,
      sampleSize: 24500,
    },
    variant: {
      name: 'Before Enhancement',
      description: 'Paywall shown immediately after upload, before processing',
      conversion: 5.1,
      sampleSize: 24200,
    },
    lift: '+34.2%',
    significance: 96.4,
    isSignificant: true,
    metricName: 'Free-to-Pro Conversion',
  },
  {
    id: 'exp-002',
    name: 'Model Selection UI',
    status: 'Running' as const,
    hypothesis: 'Simplifying model selection with a single "Smart Enhance" recommendation will lead to higher completion rates compared to presenting 6 model options upfront. Reducing decision fatigue at this high-friction step directly improves activation.',
    startDate: 'Apr 8, 2026',
    daysRunning: 13,
    traffic: '50/50',
    control: {
      name: '6-Model Grid',
      description: 'Current UI showing all available models in a grid layout',
      conversion: 45.2,
      sampleSize: 15800,
    },
    variant: {
      name: '"Smart Enhance" Default',
      description: 'Single CTA with "See all models" disclosure link',
      conversion: 62.8,
      sampleSize: 15600,
    },
    lift: '+38.9%',
    significance: 88.1,
    isSignificant: false,
    metricName: 'Enhancement Completion Rate',
  },
];
