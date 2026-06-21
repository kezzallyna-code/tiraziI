import React, { useState } from 'react';
import { OnboardingData } from './types';

interface Step2Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AVAILABLE_ROLES = [
  'Fashion Designer',
  'Styliste',
  'Modéliste',
  'Tailor / Couturier',
  'Atelier de confection',
  'Crochet Artisan',
  'Embroidery Artisan',
  'Leather Artisan',
  'Clothing Repair Specialist',
  'Traditional Clothing Specialist',
];

export function Step2({ data, updateData, onNext, onPrev }: Step2Props) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(data.roles || []);
  const [error, setError] = useState<string | null>(null);

  const toggleRole = (role: string) => {
    setError(null);
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleNext = () => {
    if (selectedRoles.length === 0) {
      setError('At least one professional role is required.');
      return;
    }
    updateData({ roles: selectedRoles });
    onNext();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-3">
        <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider text-[11px] font-bold">
          What do you do?
        </label>
        <p className="text-[13px] text-on-surface-variant/70 leading-relaxed mb-4">
          Select all roles that describe your professional work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
          {AVAILABLE_ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role);
            return (
              <button
                key={role}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary shadow-sm font-bold'
                    : 'border-outline-variant/60 hover:border-primary/50 text-on-surface-variant hover:bg-surface-container-lowest'
                }`}
                type="button"
                onClick={() => toggleRole(role)}
              >
                <span className="font-body-md text-sm leading-tight">{role}</span>
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform ${
                    isSelected ? 'text-primary scale-100' : 'text-outline/30 scale-75'
                  }`}
                >
                  {isSelected ? 'check_circle' : 'add_circle'}
                </span>
              </button>
            );
          })}
        </div>

        {error && (
          <span className="text-xs text-error font-medium flex items-center gap-1 mt-2">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </span>
        )}
      </div>

      <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
        <button
          className="flex-1 border border-outline hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-4 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          type="button"
          onClick={() => {
            updateData({ roles: selectedRoles });
            onPrev();
          }}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
        <button
          className="flex-1 bg-primary text-white font-label-md text-label-md py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          type="button"
          onClick={handleNext}
        >
          Continue
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
