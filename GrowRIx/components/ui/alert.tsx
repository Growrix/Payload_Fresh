import React from 'react';
export const Alert = ({ children, className, ...rest }: any) => (
  <div role="alert" className={className} {...rest}>{children}</div>
);
export const AlertDescription = ({ children, className, ...rest }: any) => (
  <div className={className} {...rest}>{children}</div>
);
