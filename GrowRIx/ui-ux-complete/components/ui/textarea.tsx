import React from 'react';
import { cn } from '@/lib/utils';
export const Textarea = ({ className, ...rest }: any) => (
  <textarea className={cn('p-2 border rounded', className)} {...rest} />
);
