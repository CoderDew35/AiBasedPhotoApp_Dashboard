interface InsightCalloutProps {
  text: string;
}

export default function InsightCallout({ text }: InsightCalloutProps) {
  return (
    <div className="glass-panel rounded-lg p-3 border-l-2 border-tertiary text-xs text-on-surface leading-relaxed">
      {text}
    </div>
  );
}
