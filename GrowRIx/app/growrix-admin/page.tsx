'use client';

import { motion } from 'framer-motion';
import { FileText, Monitor, ShoppingBag, TrendingUp, Users, Eye } from 'lucide-react';
import AdminMainPanel from '@/components/admin/AdminMainPanel';

interface DashboardCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Blog Posts',
    value: '12',
    description: 'Published articles',
    icon: FileText,
    color: 'bg-blue-500/10 border-blue-500/20',
    trend: '+2 this month'
  },
  {
    title: 'Demo Projects',
    value: '8',
    description: 'Live showcases',
    icon: Monitor,
    color: 'bg-accent/10 border-accent/20',
    trend: '+1 this week'
  },
  {
    title: 'Shop Products',
    value: '24',
    description: 'Available items',
    icon: ShoppingBag,
    color: 'bg-green-500/10 border-green-500/20',
    trend: '+5 this month'
  }
];

const recentActivity = [
  { action: 'New blog post published', time: '2 hours ago', type: 'post' },
  { action: 'Demo project updated', time: '4 hours ago', type: 'demo' },
  { action: 'Product added to shop', time: '1 day ago', type: 'product' },
  { action: 'User profile updated', time: '2 days ago', type: 'user' }
];

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <AdminMainPanel
      title="Welcome to Growrix Admin"
      subtitle="Manage your agency website content and settings"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Dashboard Cards */}
        <motion.div 
          variants={cardVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`
                  p-6 rounded-xl border backdrop-blur-sm
                  ${card.color}
                  hover:shadow-lg transition-all duration-300
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-text">{card.title}</h3>
                    </div>
                    <div className="text-3xl font-bold text-text mb-1">
                      {card.value}
                    </div>
                    <p className="text-sm text-subtext">{card.description}</p>
                    {card.trend && (
                      <div className="flex items-center mt-3 text-xs text-green-400">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {card.trend}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={cardVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-panel border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-accent" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/30 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text">{activity.action}</p>
                    <p className="text-xs text-subtext">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-panel border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-accent/10 border border-accent/20 rounded-lg text-center hover:bg-accent/20 transition-all duration-200"
              >
                <FileText className="w-6 h-6 mx-auto mb-2 text-accent" />
                <span className="text-sm text-text">New Post</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center hover:bg-blue-500/20 transition-all duration-200"
              >
                <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <span className="text-sm text-text">Add Demo</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center hover:bg-green-500/20 transition-all duration-200"
              >
                <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <span className="text-sm text-text">New Product</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center hover:bg-purple-500/20 transition-all duration-200"
              >
                <Users className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <span className="text-sm text-text">Manage Users</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-accent/10 to-blue-500/10 border border-accent/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-text mb-2">
            🚀 Welcome to your Admin Dashboard
          </h3>
          <p className="text-subtext">
            Everything is set up and ready to go. Use the sidebar to navigate between different sections, 
            or use the quick actions above to get started with content creation.
          </p>
        </motion.div>
      </motion.div>
    </AdminMainPanel>
  );
}
