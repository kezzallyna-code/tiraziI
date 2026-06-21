import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OnboardingData } from './types';

interface Step1Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export function Step1({ data, updateData, onNext }: Step1Props) {
  const [fullName, setFullName] = useState(data.fullName);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password || '');
  const [confirmPassword, setConfirmPassword] = useState(data.password || '');

  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const [touched, setTouched] = useState<{ fullName?: boolean; email?: boolean; password?: boolean; confirmPassword?: boolean }>({});

  useEffect(() => {
    validateForm();
  }, [fullName, email, password, confirmPassword]);

  const validateForm = () => {
    const tempErrors: typeof errors = {};
    if (!fullName.trim()) {
      tempErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      tempErrors.fullName = 'Full name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters.';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Confirm password is required.';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true });
    
    if (validateForm()) {
      updateData({ fullName, email, password });
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="full_name">
            Full Name
          </label>
          <input
            className={`w-full rounded-xl bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all border ${
              touched.fullName && errors.fullName
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-outline-variant focus:border-primary focus:ring-primary'
            } focus:ring-1`}
            id="full_name"
            placeholder="Amine Rahmani"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleBlur('fullName')}
          />
          {touched.fullName && errors.fullName && (
            <span className="text-xs text-error font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">
            Email Address
          </label>
          <input
            className={`w-full rounded-xl bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all border ${
              touched.email && errors.email
                ? 'border-error focus:border-error focus:ring-error'
                : 'border-outline-variant focus:border-primary focus:ring-primary'
            } focus:ring-1`}
            id="email"
            placeholder="amine@tirazy.dz"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {touched.email && errors.email && (
            <span className="text-xs text-error font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full rounded-xl bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all border ${
                touched.password && errors.password
                  ? 'border-error focus:border-error focus:ring-error'
                  : 'border-outline-variant focus:border-primary focus:ring-primary'
              } focus:ring-1`}
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
            />
            {touched.password && errors.password && (
              <span className="text-xs text-error font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirm_password">
              Confirm Password
            </label>
            <input
              className={`w-full rounded-xl bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all border ${
                touched.confirmPassword && errors.confirmPassword
                  ? 'border-error focus:border-error focus:ring-error'
                  : 'border-outline-variant focus:border-primary focus:ring-primary'
              } focus:ring-1`}
              id="confirm_password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="text-xs text-error font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button
          className="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          type="submit"
        >
          Continue
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <p className="text-center font-body-md text-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link className="text-primary font-bold hover:underline" href="/login">
            Log In
          </Link>
        </p>
      </div>
    </form>
  );
}
