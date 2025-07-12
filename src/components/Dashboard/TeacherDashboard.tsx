import React from 'react';
import { Users, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeacherDashboard: React.FC = () => {
  const chartData = {
    labels: ['Grade 7A', 'Grade 7B', 'Grade 8A', 'Grade 8B', 'Grade 9A'],
    datasets: [
      {
        label: 'Class Average',
        data: [85, 88, 82, 90, 87],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
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
        text: 'Class Performance Overview',
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

  const alerts = [
    { student: 'Alice Johnson', issue: 'Declining grades in Mathematics', priority: 'high' },
    { student: 'Bob Smith', issue: 'Frequent absences', priority: 'medium' },
    { student: 'Carol Davis', issue: 'Missing assignments', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value="127"
          icon={Users}
          color="bg-blue-500"
        />
        <DashboardCard
          title="Classes Teaching"
          value="5"
          icon={BookOpen}
          color="bg-green-500"
        />
        <DashboardCard
          title="Pending Grades"
          value="23"
          icon={AlertTriangle}
          color="bg-yellow-500"
        />
        <DashboardCard
          title="Completed Assessments"
          value="45"
          icon={CheckCircle}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{alert.student}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                    alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{alert.issue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;