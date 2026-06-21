import React from 'react';

const COMPARISON_ROWS = [
  { feature: 'Monthly Price', free: '0 DA', basic: '2,000 DA', pro: '4,500 DA' },
  { feature: 'Portfolio Images', free: 'Up to 10', basic: 'Up to 30', pro: 'Unlimited' },
  { feature: 'Portfolio Videos', free: 'no', basic: 'Up to 10', pro: 'Unlimited' },
  { feature: 'Search Visibility', free: 'Standard', basic: 'Enhanced', pro: 'Priority' },
  { feature: 'Profile Visitors', free: 'no', basic: 'Limited', pro: 'Full' },
  { feature: 'Analytics', free: 'Very Basic', basic: 'Basic', pro: 'Advanced' },
  { feature: 'Verified Badge', free: 'no', basic: 'no', pro: 'yes' },
  { feature: 'Priority Support', free: 'no', basic: 'no', pro: 'yes' },
];

export function ComparisonTable() {
  const renderValue = (val: string, highlight = false) => {
    if (val === 'yes') {
      return (
        <span className={`material-symbols-outlined text-[18px] ${highlight ? 'text-secondary' : 'text-primary'}`}>
          check_circle
        </span>
      );
    }
    if (val === 'no') {
      return (
        <span className="material-symbols-outlined text-[18px] text-outline/20">
          cancel
        </span>
      );
    }
    return <span className={`text-[13px] font-bold ${highlight ? 'text-primary' : 'text-on-surface-variant'}`}>{val}</span>;
  };

  return (
    <div className="space-y-6">
      
      {/* Desktop/Tablet Table Layout (Hidden on mobile) */}
      <div className="hidden md:block bg-white dark:bg-surface-container-low rounded-[24px] border border-outline-variant/20 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-outline-variant/10">
          <h3 className="font-title-lg text-lg text-primary font-serif">Detailed Plan Comparison</h3>
          <p className="text-xs text-on-surface-variant/70 mt-1">Review features and capabilities across all plans.</p>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest/50 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">
              <th className="py-4 px-6">Feature</th>
              <th className="py-4 px-6 text-center">Free</th>
              <th className="py-4 px-6 text-center">Premium Basic</th>
              <th className="py-4 px-6 text-center bg-primary/5 text-primary">Premium Pro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 font-sans">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-surface-container-lowest/30 transition-colors">
                <td className="py-4 px-6 text-xs text-on-surface font-semibold">{row.feature}</td>
                <td className="py-4 px-6 text-center">{renderValue(row.free)}</td>
                <td className="py-4 px-6 text-center">{renderValue(row.basic)}</td>
                <td className="py-4 px-6 text-center bg-primary/5">{renderValue(row.pro, true)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards Layout (Hidden on desktop) */}
      <div className="block md:hidden space-y-6">
        <h3 className="font-title-lg text-md text-primary font-serif text-center px-4">
          Detailed Feature Comparison
        </h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Free stacked card */}
          <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
            <h4 className="font-title-lg text-sm text-primary font-bold border-b border-outline-variant/10 pb-2">
              Free Plan
            </h4>
            <div className="space-y-3">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-[12px]">
                  <span className="text-on-surface-variant/80 font-medium">{row.feature}</span>
                  <span>{renderValue(row.free)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Basic stacked card */}
          <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
            <h4 className="font-title-lg text-sm text-primary font-bold border-b border-outline-variant/10 pb-2">
              Premium Basic Plan
            </h4>
            <div className="space-y-3">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-[12px]">
                  <span className="text-on-surface-variant/80 font-medium">{row.feature}</span>
                  <span>{renderValue(row.basic)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Pro stacked card */}
          <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl border-2 border-secondary shadow-md space-y-4 relative">
            <span className="absolute -top-3 right-4 px-2 py-0.5 bg-secondary text-on-secondary text-[9px] font-bold uppercase tracking-wider rounded">
              Recommended
            </span>
            <h4 className="font-title-lg text-sm text-primary font-bold border-b border-outline-variant/10 pb-2">
              Premium Pro Plan
            </h4>
            <div className="space-y-3">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-[12px]">
                  <span className="text-on-surface-variant/80 font-medium">{row.feature}</span>
                  <span>{renderValue(row.pro, true)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
