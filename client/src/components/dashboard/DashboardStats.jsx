import React from 'react';
import { Link } from 'react-router-dom';

const statItems = [
  { name: 'Total Posts', value: '24', change: '+12%', changeType: 'positive', href: '/posts' },
  { name: 'Engagement', value: '1.2K', change: '+4.5%', changeType: 'positive', href: '/analytics' },
  { name: 'New Followers', value: '56', change: '-2.3%', changeType: 'negative', href: '/followers' },
  { name: 'Avg. Read Time', value: '3.2 min', change: '+0.8%', changeType: 'positive', href: '/analytics' },
];

const DashboardStats = () => {
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
                {/* Icon would go here */}
                <div className="h-6 w-6 text-white"></div>
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