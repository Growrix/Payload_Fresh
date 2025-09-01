'use client';

import { motion } from 'framer-motion';

interface AdminMainPanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AdminMainPanel({ 
  children, 
  title, 
  subtitle 
}: AdminMainPanelProps) {
  return (
    <div className="flex-1 bg-background overflow-auto">
      <div className="p-6">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {title && (
              <h1 className="text-2xl font-space-grotesk font-bold text-text mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-subtext">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
