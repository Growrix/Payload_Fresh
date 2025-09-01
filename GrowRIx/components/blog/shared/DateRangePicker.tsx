'use client';

import React, { useState } from 'react';

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onDateChange: (startDate: string, endDate: string) => void;
  placeholder?: string;
}

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function DateRangePicker({ 
  startDate, 
  endDate, 
  onDateChange, 
  placeholder = "All dates" 
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const presetRanges = [
    {
      label: 'All dates',
      getValue: () => ({ start: '', end: '' })
    },
    {
      label: 'Today',
      getValue: () => {
        const today = new Date().toISOString().split('T')[0];
        return { start: today, end: today };
      }
    },
    {
      label: 'Yesterday',
      getValue: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const date = yesterday.toISOString().split('T')[0];
        return { start: date, end: date };
      }
    },
    {
      label: 'Last 7 days',
      getValue: () => {
        const end = new Date().toISOString().split('T')[0];
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return { start: start.toISOString().split('T')[0], end };
      }
    },
    {
      label: 'Last 30 days',
      getValue: () => {
        const end = new Date().toISOString().split('T')[0];
        const start = new Date();
        start.setDate(start.getDate() - 30);
        return { start: start.toISOString().split('T')[0], end };
      }
    },
    {
      label: 'This month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        return { start, end };
      }
    },
    {
      label: 'Last month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
        const end = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
        return { start, end };
      }
    }
  ];

  const formatDateRange = () => {
    if (!startDate && !endDate) return placeholder;
    if (startDate === endDate) return new Date(startDate).toLocaleDateString();
    if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`;
    }
    if (startDate) return `From ${new Date(startDate).toLocaleDateString()}`;
    if (endDate) return `Until ${new Date(endDate).toLocaleDateString()}`;
    return placeholder;
  };

  const handlePresetSelect = (preset: typeof presetRanges[0]) => {
    const { start, end } = preset.getValue();
    onDateChange(start, end);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md min-w-[200px] justify-between"
        style={{ backgroundColor: '#181818', color: 'white', border: '1px solid #2a2a2a' }}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span className="truncate">{formatDateRange()}</span>
        </div>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-80 rounded-md shadow-lg z-50" style={{ backgroundColor: '#181818', border: '1px solid #2a2a2a', color: 'white' }}>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'white' }}>Start Date</label>
                <input
                  type="date"
                  value={startDate || ''}
                  onChange={(e) => onDateChange(e.target.value, endDate || '')}
                  className="w-full px-3 py-2 text-sm rounded"
                  style={{ backgroundColor: '#0b0b0b', color: 'white', border: '1px solid #2a2a2a' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'white' }}>End Date</label>
                <input
                  type="date"
                  value={endDate || ''}
                  onChange={(e) => onDateChange(startDate || '', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded"
                  style={{ backgroundColor: '#0b0b0b', color: 'white', border: '1px solid #2a2a2a' }}
                />
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-xs font-medium mb-2" style={{ color: 'white' }}>Quick ranges</p>
              <div className="space-y-1">
                {presetRanges.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetSelect(preset)}
                    className="block w-full text-left px-2 py-1 text-sm rounded"
                    style={{ color: 'white' }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-3 mt-3 border-t">
              <button
                onClick={() => {
                  onDateChange('', '');
                  setIsOpen(false);
                }}
                className="px-3 py-1 text-sm rounded"
                style={{ color: 'white' }}
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm rounded"
                style={{ backgroundColor: '#9333ea', color: 'white' }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
