import React, { useState, useEffect, useRef } from 'react';
import { OnboardingData } from './types';

interface Step4Props {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  onFinish: () => void;
  onPrev: () => void;
  onSubmit?: (data: OnboardingData) => Promise<void>;
  globalError?: string | null;
}

const PREMADE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256', // Designer
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256', // Tailor
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256', // Artisan
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256', // Weaver
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256', // Pattern Maker
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256', // Director
];

export function Step4({ data, updateData, onFinish, onPrev, onSubmit, globalError }: Step4Props) {
  const [bio, setBio] = useState(data.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(data.avatarUrl || PREMADE_AVATARS[0]);
  const [avatarFileName, setAvatarFileName] = useState(data.avatarFileName || '');
  const [avatarFile, setAvatarFile] = useState<File | undefined>(data.avatarFile);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.');
      return;
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    const newObjectUrl = URL.createObjectURL(file);
    setObjectUrl(newObjectUrl);
    setAvatarUrl(newObjectUrl);
    setAvatarFileName(file.name);
    setAvatarFile(file);
  };

  const selectPremadeAvatar = (url: string) => {
    setError(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setAvatarUrl(url);
    setAvatarFileName('');
    setAvatarFile(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ bio, avatarUrl, avatarFileName, avatarFile });
    
    if (onSubmit) {
      setIsSubmitting(true);
      setError(null);
      try {
        await onSubmit({ ...data, bio, avatarUrl, avatarFileName, avatarFile });
      } catch (err: any) {
        setError(err.message || 'An error occurred during registration.');
        setIsSubmitting(false);
      }
    } else {
      onFinish();
    }
  };

  return (
    <form onSubmit={handleFinish} className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-5">
        
        {/* Title */}
        <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider text-[11px] font-bold">
          Make your profile memorable
        </label>

        {/* Avatar Section */}
        <div className="space-y-3">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Profile Photo
          </label>
          <p className="text-[13px] text-on-surface-variant/70 leading-relaxed">
            Choose one of 6 elegant mock avatar options or upload a profile photo.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-surface-container/30 rounded-2xl border border-outline-variant/10">
            {/* Active Preview */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-surface shadow-md shrink-0 bg-surface-container">
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full space-y-3">
              {/* Pre-made choices */}
              <div className="flex flex-wrap gap-2">
                {PREMADE_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectPremadeAvatar(url)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                      avatarUrl === url && !avatarFileName
                        ? 'border-primary scale-110 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Custom Upload */}
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="avatar-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-outline-variant hover:border-primary text-on-surface hover:bg-surface-container-lowest rounded-full font-label-md text-[13px] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  Upload Photo
                </button>
                {avatarFileName && (
                  <span className="text-[12px] text-on-surface-variant truncate max-w-[150px]" title={avatarFileName}>
                    {avatarFileName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-baseline">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="bio">
              Short Bio
            </label>
            <span className="text-[11px] text-on-surface-variant/60">
              {bio.length}/200 chars
            </span>
          </div>
          <textarea
            className="w-full rounded-xl bg-surface-container-lowest py-3 px-4 font-body-md text-on-surface placeholder:text-outline/50 transition-all border border-outline-variant focus:border-primary focus:ring-primary focus:ring-1 min-h-[100px] resize-none"
            id="bio"
            placeholder="I create contemporary fashion patterns inspired by Algerian craftsmanship and modern silhouettes..."
            maxLength={200}
            value={bio}
            onChange={(e) => {
              setError(null);
              setBio(e.target.value);
            }}
          />
        </div>

        {error && (
          <span className="text-xs text-error font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">error</span>
            {error}
          </span>
        )}
      </div>

      <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
        <button
          className="flex-1 border border-outline hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-4 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            updateData({ bio, avatarUrl, avatarFileName, avatarFile });
            onPrev();
          }}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
        <button
          className="flex-grow bg-primary text-white font-label-md text-label-md py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Complete My Profile'}
          {!isSubmitting && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
        </button>
      </div>
    </form>
  );
}
