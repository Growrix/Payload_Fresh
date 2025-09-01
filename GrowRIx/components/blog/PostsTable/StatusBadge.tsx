'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return {
          label: 'Published',
          bg: '#0b0b0b',
          color: 'white',
          dot: '#22c55e'
        };
      case 'draft':
        return {
          label: 'Draft',
          bg: '#181818',
          color: 'white',
          dot: '#9ca3af'
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          bg: '#181818',
          color: 'white',
          dot: '#60a5fa'
        };
      case 'private':
        return {
          label: 'Private',
          bg: '#181818',
          color: 'white',
          dot: '#a78bfa'
        };
      case 'trash':
        return {
          label: 'Trash',
          bg: '#181818',
          color: 'white',
          dot: '#ef4444'
        };
      default:
        return {
          label: status,
          bg: '#181818',
          color: 'white',
          dot: '#9ca3af'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? { padding: '2px 6px', fontSize: 12 } as const : { padding: '6px 10px', fontSize: 14 } as const;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, border: '1px solid #2a2a2a', backgroundColor: config.bg, color: config.color, fontWeight: 600, ...sizeClasses }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, backgroundColor: config.dot, display: 'inline-block', marginLeft: 8 }}></span>
      <span style={{ marginRight: 8 }}>{config.label}</span>
    </span>
  );
}
