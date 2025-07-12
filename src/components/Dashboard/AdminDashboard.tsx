import React from 'react';
import { Users, GraduationCap, AlertTriangle, TrendingUp } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard: React.FC = () => {
  const performanceData = {
    labels: ['Grade 7', 'Grade 8', 'Grade 9'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 88, 82],
        backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(34, 197, 94, 0.8)', 'rgba(168, 85, 247, 0.8)'],
        borderColor: ['rgb(59, 130, 246)', 'rgb(34, 197, 94)', 'rgb(168, 85, 247)'],
        borderWidth: 1,
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent', 'Late', 'Excused'],
    datasets: [
      {
        data: [85, 8, 4, 3],
        backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#6B7280'],
        borderWidth: 0,
      },
    ],
  };

  const systemAlerts = [
    { type: 'Academic', message: '12 students below 75% average', priority: 'high' },
    { type: 'Attendance', message: '8 students with attendance < 90%', priority: 'medium' },
    { type: 'System', message: 'Quarterly reports due in 3 days', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value="485"
          icon={GraduationCap}
          color="bg-blue-500"
          trend={{ value: 3.2, isPositive: true }}
        />
        <DashboardCard
          title="Active Teachers"
          value="24"
          icon={Users}
          color="bg-green-500"
        />
        <DashboardCard
          title="Overall Average"
          value="85.2"
          icon={TrendingUp}
          color="bg-purple-500"
          trend={{ value: 1.8, isPositive: true }}
        />
        <DashboardCard
          title="Active Alerts"
          value="23"
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Level Performance</h3>
            <Bar data={performanceData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Distribution</h3>
          <Doughnut data={attendanceData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
        <div className="space-y-3">
          {systemAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{alert.type}</p>
                <p className="text-sm text-gray-600">{alert.message}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {alert.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;