import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getPosts } from '../../services/postService';

const DashboardStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    avgReadTime: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPosts({ author: user.id });
        const posts = data.posts || [];

        const totalViews = posts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
        const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
        const avgReadTime = posts.length
          ? (posts.reduce((sum, post) => sum + (post.readTime || 0), 0) / posts.length).toFixed(1)
          : 0;

        setStats({
          totalPosts: posts.length,
          totalViews,
          totalLikes,
          avgReadTime,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchStats();
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading stats...</div>;
  }

  const statItems = [
    {
      name: 'Total Posts',
      value: stats.totalPosts,
      change: stats.totalPosts > 0 ? '+100%' : '0',
      changeType: 'positive',
      href: '/posts',
    },
    {
      name: 'Total Views',
      value: stats.totalViews,
      change: '+10%',
      changeType: 'positive',
      href: '/analytics',
    },
    {
      name: 'Total Likes',
      value: stats.totalLikes,
      change: '+3.2%',
      changeType: 'positive',
      href: '/analytics',
    },
    {
      name: 'Avg. Read Time',
      value: `${stats.avgReadTime} min`,
      change: '+1.2%',
      changeType: 'positive',
      href: '/analytics',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                <div className="h-6 w-6 text-white">{/* Icon placeholder */}</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.change}
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardStats;
