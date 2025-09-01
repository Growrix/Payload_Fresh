'use client';

import React, { useState } from 'react';

interface PublishBoxProps {
  status: 'draft' | 'published' | 'scheduled' | 'private';
  onStatusChange: (status: 'draft' | 'published' | 'scheduled' | 'private') => void;
  onSave: () => void;
  onPublish: () => void;
  onSchedule: (date: string) => void;
  isLoading?: boolean;
  isDirty?: boolean;
  lastSaved?: string;
}

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function PublishBox({
  status,
  onStatusChange,
  onSave,
  onPublish,
  onSchedule,
  isLoading = false,
  isDirty = false,
  lastSaved
}: PublishBoxProps) {
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private' | 'password'>('public');
  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);

  const getStatusInfo = () => {
    switch (status) {
      case 'published':
        return {
          label: 'Published',
          description: 'Visible to everyone',
          icon: <EyeIcon />
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          description: 'Will be published later',
          icon: <ClockIcon />
        };
      case 'private':
        return {
          label: 'Private',
          description: 'Only visible to you',
          icon: <LockIcon />
        };
      case 'draft':
      default:
        return {
          label: 'Draft',
          description: 'Not published',
          icon: <EyeIcon />
        };
    }
  };

  const statusInfo = getStatusInfo();

  const handleScheduleSubmit = () => {
    if (scheduleDate && scheduleTime) {
      const datetime = `${scheduleDate}T${scheduleTime}`;
      onSchedule(datetime);
      setShowScheduler(false);
    }
  };

  const getVisibilityIcon = () => {
    switch (visibility) {
      case 'private':
        return <LockIcon />;
      case 'password':
        return <LockIcon />;
      default:
        return <EyeIcon />;
    }
  };

  const getMainButtonText = () => {
    if (status === 'published') {
      return isDirty ? 'Update' : 'Published';
    } else if (status === 'scheduled') {
      return 'Scheduled';
    } else {
      return 'Publish';
    }
  };

  return (
    <>
      <style jsx>{`
        /* Force SVG stroke color to white inside publish box */
        .publishbox-svg path { stroke: #ffffff; }
        /* WebKit native date/time picker calendar & clock color inversion */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1) grayscale(1) brightness(2);
        }
        /* Ensure input icons are visible on dark background */
        .publishbox-input::-webkit-calendar-picker-indicator { opacity: 1; }
      `}</style>

      <div style={{ backgroundColor: '#181818' }} className="border border-gray-800 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 rounded-t-lg" style={{ backgroundColor: '#181818' }}>
        <h3 className="text-sm font-medium text-white">Publish</h3>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
              <div className="text-white">
                <span className="publishbox-svg">{statusInfo.icon}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">{statusInfo.label}</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>{statusInfo.description}</div>
              </div>
          </div>
          <button
            onClick={() => {/* Handle status change */}}
            style={{ color: '#9333ea' }}
            className="text-xs hover:opacity-80"
          >
            Edit
          </button>
        </div>

        {/* Visibility */}
        <div className="relative">
          <button
            onClick={() => setShowVisibilityOptions(!showVisibilityOptions)}
            className="flex items-center justify-between w-full text-sm text-white"
          >
            <div className="flex items-center gap-2">
              <span className="publishbox-svg">{getVisibilityIcon()}</span>
              <span>Visibility: {visibility === 'public' ? 'Public' : visibility === 'private' ? 'Private' : 'Password protected'}</span>
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showVisibilityOptions && (
            <div className="absolute top-full left-0 mt-1 w-full rounded-md shadow-lg z-10" style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a' }}>
              <div className="py-1">
                <button
                  onClick={() => { setVisibility('public'); setShowVisibilityOptions(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-white`}
                  style={visibility === 'public' ? { backgroundColor: '#9333ea' } : { backgroundColor: 'transparent' }}
                >
                  <EyeIcon />
                  <span>Public</span>
                </button>
                <button
                  onClick={() => { setVisibility('private'); setShowVisibilityOptions(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-white`}
                  style={visibility === 'private' ? { backgroundColor: '#9333ea' } : { backgroundColor: 'transparent' }}
                >
                  <LockIcon />
                  <span>Private</span>
                </button>
                <button
                  onClick={() => { setVisibility('password'); setShowVisibilityOptions(false); }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-white`}
                  style={visibility === 'password' ? { backgroundColor: '#9333ea' } : { backgroundColor: 'transparent' }}
                >
                  <LockIcon />
                  <span>Password protected</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Schedule */}
        {status !== 'published' && (
          <div>
            <button
              onClick={() => setShowScheduler(!showScheduler)}
              style={{ color: '#9333ea' }}
              className="flex items-center gap-2 text-sm hover:opacity-80"
            >
              <span className="publishbox-svg"><CalendarIcon /></span>
              Schedule for later
            </button>

            {showScheduler && (
              <div className="mt-3 p-3 rounded" style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a' }}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Date</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded focus:outline-none publishbox-input"
                      style={{ backgroundColor: '#0b0b0b', color: '#ffffff', border: '1px solid #2a2a2a' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.85)' }}>Time</label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full px-2 py-1 text-sm rounded focus:outline-none publishbox-input"
                      style={{ backgroundColor: '#0b0b0b', color: '#ffffff', border: '1px solid #2a2a2a' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleScheduleSubmit}
                      className="px-3 py-1 text-xs text-white rounded"
                      style={{ backgroundColor: '#9333ea' }}
                      disabled={!scheduleDate || !scheduleTime}
                    >
                      Schedule
                    </button>
                    <button
                      onClick={() => setShowScheduler(false)}
                      className="px-3 py-1 text-xs rounded text-white"
                      style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a' }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Save status */}
        {lastSaved && (
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Last saved: {new Date(lastSaved).toLocaleTimeString()}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 pt-2 border-t border-gray-800">
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 px-3 py-2 text-sm rounded-md text-white disabled:opacity-50"
              style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a' }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Draft'}
            </button>
            
            <button
              onClick={() => {/* Handle preview */}}
              className="px-3 py-2 text-sm rounded-md text-white"
              style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a' }}
            >
              Preview
            </button>
          </div>

          <button
            onClick={status === 'published' ? onSave : onPublish}
            className={`w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none disabled:opacity-50 transition-all ${
              status === 'published' && !isDirty
                ? 'text-white cursor-default'
                : 'text-white'
            }`}
            style={status === 'published' && !isDirty ? { backgroundColor: '#181818', border: '1px solid #2a2a2a' } : { backgroundColor: '#9333ea' }}
            disabled={isLoading || (status === 'published' && !isDirty)}
          >
            {isLoading ? 'Publishing...' : getMainButtonText()}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
