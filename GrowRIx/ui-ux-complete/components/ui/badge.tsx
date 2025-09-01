import React from 'react';
export const Badge = ({ children, className, ...rest }: any) => (
  <span className={className} {...rest}>{children}</span>
);
