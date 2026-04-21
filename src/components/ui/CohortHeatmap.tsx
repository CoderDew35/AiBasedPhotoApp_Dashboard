import clsx from 'clsx';

interface CohortRow {
  cohort: string;
  size: number;
  m0: number;
  m1: number | null;
  m2: number | null;
  m3: number | null;
}

interface CohortHeatmapProps {
  data: CohortRow[];
}

function getCellColor(value: number | null): string {
  if (value === null) return 'bg-surface-container-highest text-on-surface-variant';
  if (value >= 80) return 'bg-tertiary/40 text-on-surface';
  if (value >= 50) return 'bg-tertiary/25 text-on-surface';
  if (value >= 30) return 'bg-tertiary/15 text-on-surface';
  if (value >= 15) return 'bg-primary/15 text-on-surface';
  return 'bg-surface-container-lowest text-on-surface-variant';
}

export default function CohortHeatmap({ data }: CohortHeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-on-surface-variant text-[11px] font-label uppercase tracking-widest">
            <th className="pb-3 font-medium">Cohort</th>
            <th className="pb-3 font-medium text-right">Size</th>
            <th className="pb-3 font-medium text-center">M0</th>
            <th className="pb-3 font-medium text-center">M1</th>
            <th className="pb-3 font-medium text-center">M2</th>
            <th className="pb-3 font-medium text-center">M3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.cohort}
              className="hover:bg-surface-container-highest/50 transition-colors"
            >
              <td className="py-3 font-medium text-on-surface">{row.cohort}</td>
              <td className="py-3 text-right text-on-surface-variant">
                {row.size.toLocaleString()}
              </td>
              {[row.m0, row.m1, row.m2, row.m3].map((val, ci) => (
                <td key={ci} className="py-3 text-center px-1">
                  <span
                    className={clsx(
                      'inline-block px-3 py-1.5 rounded-sm text-xs font-bold min-w-[52px]',
                      getCellColor(val)
                    )}
                  >
                    {val !== null ? `${val}%` : '──'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
