import React from 'react'
import { cn } from '@/lib/utils'

export const Card = ({ className, children, ...rest }: any) => (
  <div
    className={cn('rounded border', className)}
    style={{ backgroundColor: '#181818', borderColor: '#2a2a2a' }}
    {...rest}
  >
    {children}
  </div>
)

export const CardHeader = ({ className, children, ...rest }: any) => (
  <div className={cn('p-3 border-b', className)} style={{ borderColor: '#2a2a2a' }} {...rest}>
    {children}
  </div>
)

export const CardTitle = ({ className, children, ...rest }: any) => (
  <h3 className={cn('font-semibold text-lg', className)} style={{ color: 'white' }} {...rest}>
    {children}
  </h3>
)

export const CardContent = ({ className, children, ...rest }: any) => (
  <div className={cn('p-3', className)} style={{ color: 'white' }} {...rest}>
    {children}
  </div>
)
