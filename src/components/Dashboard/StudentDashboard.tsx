import React from 'react';
import { BookOpen, Calendar, TrendingUp, Award } from 'lucide-react';
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

const StudentDashboard: React.FC = () => {
  const chartData = {
    labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
    datasets: [
      {
        label: 'Overall Average',
        data: [85, 88, 92, 90],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
        text: 'Academic Performance Trend',
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

  const recentGrades = [
    { subject: 'Mathematics', grade: 92, date: '2024-01-15' },
    { subject: 'Science', grade: 88, date: '2024-01-12' },
    { subject: 'English', grade: 95, date: '2024-01-10' },
    { subject: 'History', grade: 87, date: '2024-01-08' },
  ];

  return (
    <div className="space-y-6">
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
          title="Subjects Enrolled"
          value="8"
          icon={BookOpen}
          color="bg-purple-500"
        />
        <DashboardCard
          title="Class Rank"
          value="3rd"
          icon={Award}
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{grade.subject}</p>
                  <p className="text-sm text-gray-500">{grade.date}</p>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  grade.grade >= 90 ? 'bg-green-100 text-green-800' :
                  grade.grade >= 80 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {grade.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;