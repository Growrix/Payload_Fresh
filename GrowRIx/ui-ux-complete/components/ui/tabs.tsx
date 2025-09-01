import React from 'react';
export const Tabs = ({ children, className, ...rest }: any) => <div className={className} {...rest}>{children}</div>;
export const TabsContent = ({ children, className, ...rest }: any) => <div className={className} {...rest}>{children}</div>;
export const TabsList = ({ children, className, ...rest }: any) => <div className={className} {...rest}>{children}</div>;
export const TabsTrigger = ({ children, className, ...rest }: any) => <button className={className} {...rest}>{children}</button>;
