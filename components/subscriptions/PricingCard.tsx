import React from 'react';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  onSelect: () => void;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  isPopular = false,
  onSelect,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 ${
        isPopular
          ? 'bg-primary-dark text-white shadow-xl scale-105 border-2 border-secondary z-10'
          : 'bg-white dark:bg-surface-container-low border border-outline-variant/30 text-on-surface hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary text-on-secondary text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
          Recommended
        </span>
      )}

      <div className="space-y-6">
        <div>
          <h3 className={`font-title-lg text-lg font-bold ${isPopular ? 'text-white' : 'text-primary'}`}>
            {name}
          </h3>
          <p className={`text-xs mt-2 leading-relaxed ${isPopular ? 'text-white/80' : 'text-on-surface-variant/80'}`}>
            {description}
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-headline-md text-3xl font-extrabold">{price}</span>
          {price !== '0 DA' && (
            <span className={`text-xs ${isPopular ? 'text-white/60' : 'text-on-surface-variant/60'}`}>
              /month
            </span>
          )}
        </div>

        <ul className="space-y-3.5 border-t pt-6 border-outline-variant/10">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-tight">
              <span
                className={`material-symbols-outlined text-[18px] shrink-0 ${
                  isPopular ? 'text-secondary' : 'text-primary'
                }`}
              >
                check_circle
              </span>
              <span className={isPopular ? 'text-white/90' : 'text-on-surface-variant'}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onSelect}
        className={`w-full py-3.5 rounded-full font-label-md text-label-md transition-all active:scale-95 cursor-pointer mt-8 ${
          isPopular
            ? 'bg-secondary text-on-secondary shadow-md hover:bg-secondary-dark hover:shadow-lg'
            : 'bg-primary text-on-primary shadow-sm hover:bg-primary-dark hover:shadow-md'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}
