import React from 'react';
import { cn } from '@/lib/utils';
export const Input = ({ className, ...rest }: any) => (
  <input className={cn('p-2 border rounded', className)} {...rest} />
);
