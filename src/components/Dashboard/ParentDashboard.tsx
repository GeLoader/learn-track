import React from 'react';
import { User, BookOpen, Calendar, TrendingUp } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ParentDashboard: React.FC = () => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Mathematics',
        data: [85, 88, 87, 92, 90, 93],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Science',
        data: [82, 85, 88, 86, 89, 91],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'English',
        data: [90, 92, 88, 94, 93, 95],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'John\'s Academic Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 70,
        max: 100,
      },
    },
  };

  const upcomingEvents = [
    { event: 'Parent-Teacher Conference', date: '2024-01-25', time: '2:00 PM' },
    { event: 'Mathematics Quiz', date: '2024-01-22', time: '10:00 AM' },
    { event: 'Science Project Due', date: '2024-01-20', time: '11:59 PM' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome back, Robert!</h3>
        <p className="text-blue-700">Here's an overview of John's academic progress this quarter.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Overall Average"
          value="90.5"
          icon={TrendingUp}
          color="bg-blue-500"
          trend={{ value: 2.5, isPositive: true }}
        />
        <DashboardCard
          title="Attendance Rate"
          value="96%"
          icon={Calendar}
          color="bg-green-500"
          trend={{ value: 1.2, isPositive: true }}
        />
        <DashboardCard
          title="Subjects"
          value="8"
          icon={BookOpen}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Class Rank"
          value="3rd"
          icon={User}
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Progress</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{event.event}</p>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;