import React from 'react'
import { cn } from '@/lib/utils'

export const Button = ({ className, children, ...rest }: any) => (
  <button className={cn('px-3 py-2 rounded bg-blue-600 text-white', className)} {...rest}>
    {children}
  </button>
)
