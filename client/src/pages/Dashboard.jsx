import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentPosts from '../components/dashboard/RecentPosts';
import CreatePostButton from '../components/dashboard/CreatePostButton';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
          <p className="mt-2 text-lg text-gray-600">
            Here's what's happening with your blog today
          </p>
        </div>

        <DashboardStats />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>
          <div>
            <CreatePostButton />
            <RecentPosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
