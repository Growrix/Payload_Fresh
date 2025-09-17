'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  User,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  Bell,
  LogOut,
  Search,
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Menu,
  X,
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in with a small delay to ensure localStorage is ready
    const checkAuth = () => {
      const userData = localStorage.getItem('user')

      if (!userData) {
        router.push('/')
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user') // Clear corrupted data
        router.push('/')
      }
    }

    // Add a small delay to ensure localStorage is available
    const timeoutId = setTimeout(checkAuth, 100)

    return () => clearTimeout(timeoutId)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const sidebarItems = [
    { icon: BarChart3, label: 'Overview', active: true },
    { icon: Users, label: 'Team', active: false },
    { icon: FileText, label: 'Projects', active: false },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ]

  const stats = [
    {
      icon: DollarSign,
      label: 'Revenue',
      value: '$12,345',
      change: '+12%',
      color: 'text-green-400',
    },
    { icon: Users, label: 'Active Users', value: '1,234', change: '+8%', color: 'text-blue-400' },
    {
      icon: TrendingUp,
      label: 'Growth Rate',
      value: '23%',
      change: '+5%',
      color: 'text-purple-400',
    },
    { icon: Activity, label: 'Engagement', value: '87%', change: '+3%', color: 'text-orange-400' },
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#181818] border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold font-['Space_Grotesk']">G</span>
            </div>
            <span className="ml-3 text-xl font-bold font-['Space_Grotesk']">GrowRix</span>
          </div>

          {/* User Profile */}
          <div className="mb-8 p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9C6BFF] to-[#7C4DFF] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-sm font-medium font-['Inter'] truncate">
                  {user.name || user.email}
                </div>
                <div className="text-xs text-gray-400 font-['Inter']">Pro Member</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.label}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all font-['Inter'] ${
                  item.active
                    ? 'bg-[#9C6BFF] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 mt-8 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all font-['Inter']"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <motion.header
          className="bg-[#181818] border-b border-gray-800 p-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-4 p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-2xl font-bold font-['Space_Grotesk']">Dashboard</h1>
                <p className="text-gray-400 font-['Inter']">
                  Welcome back, {user.name || 'there'}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 bg-[#2A2A2A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9C6BFF] font-['Inter']"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Add Button */}
              <motion.button
                className="flex items-center px-4 py-2 bg-[#9C6BFF] hover:bg-[#8A5FE6] rounded-lg transition-colors font-['Inter'] font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-[#181818] border border-gray-800 rounded-xl p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg bg-opacity-20 ${
                      stat.color.includes('green')
                        ? 'bg-green-500'
                        : stat.color.includes('blue')
                          ? 'bg-blue-500'
                          : stat.color.includes('purple')
                            ? 'bg-purple-500'
                            : 'bg-orange-500'
                    }`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.color} font-['Inter']`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm font-['Inter']">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <motion.div
              className="lg:col-span-2 bg-[#181818] border border-gray-800 rounded-xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold font-['Space_Grotesk']">Revenue Overview</h3>
                <select className="bg-[#2A2A2A] border border-gray-600 rounded-lg px-3 py-1 text-sm font-['Inter']">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              {/* Mock Chart */}
              <div className="h-64 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-[#9C6BFF] mx-auto mb-2" />
                  <p className="text-gray-400 font-['Inter']">Chart visualization would go here</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-[#181818] border border-gray-800 rounded-xl p-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-6">Recent Activity</h3>

              <div className="space-y-4">
                {[
                  { action: 'New user registered', time: '2 minutes ago', color: 'bg-green-500' },
                  { action: 'Project completed', time: '1 hour ago', color: 'bg-blue-500' },
                  { action: 'Payment received', time: '3 hours ago', color: 'bg-purple-500' },
                  { action: 'Team meeting', time: '1 day ago', color: 'bg-orange-500' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-2 h-2 ${activity.color} rounded-full mr-3`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium font-['Inter']">{activity.action}</p>
                      <p className="text-xs text-gray-400 font-['Inter']">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mt-8 bg-[#181818] border border-gray-800 rounded-xl p-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-6">Quick Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: FileText, label: 'Create Project', desc: 'Start a new project' },
                { icon: Users, label: 'Invite Team', desc: 'Add team members' },
                { icon: BarChart3, label: 'View Analytics', desc: 'Check performance' },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  className="p-4 bg-[#2A2A2A] hover:bg-[#3A3A3A] rounded-lg text-left transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <action.icon className="w-8 h-8 text-[#9C6BFF] mb-3" />
                  <h4 className="font-medium font-['Inter'] mb-1">{action.label}</h4>
                  <p className="text-sm text-gray-400 font-['Inter']">{action.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
