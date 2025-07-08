import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', views: 4000, likes: 2400 },
  { name: 'Feb', views: 3000, likes: 1398 },
  { name: 'Mar', views: 2000, likes: 9800 },
  { name: 'Apr', views: 2780, likes: 3908 },
  { name: 'May', views: 1890, likes: 4800 },
  { name: 'Jun', views: 2390, likes: 3800 },
  { name: 'Jul', views: 3490, likes: 4300 },
];

const AnalyticsChart = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Engagement Analytics</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#F59E0B" />
            <Bar dataKey="likes" fill="#EC4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;