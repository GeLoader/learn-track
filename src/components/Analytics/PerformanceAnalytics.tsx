import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceAnalytics: React.FC = () => {
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'School Average',
        data: [83, 85, 87, 86, 88, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Grade 7 Average',
        data: [81, 83, 85, 84, 86, 87],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Grade 8 Average',
        data: [85, 87, 89, 88, 90, 91],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const subjectData = {
    labels: ['Mathematics', 'Science', 'English', 'History', 'Filipino', 'Physical Education'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 88, 92, 87, 89, 94],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(20, 184, 166, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const gradeDistributionData = {
    labels: ['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (Below 60)'],
    datasets: [
      {
        data: [35, 45, 15, 4, 1],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#6B7280'],
        borderWidth: 0,
      },
    ],
  };

  const performanceMetrics = [
    { label: 'Students Above Average', value: '68%', change: '+5%', positive: true },
    { label: 'Students Below 75%', value: '12%', change: '-3%', positive: true },
    { label: 'Perfect Attendance', value: '23%', change: '+2%', positive: true },
    { label: 'Honor Roll Students', value: '35%', change: '+8%', positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Current Quarter</option>
            <option>Last Quarter</option>
            <option>Full Year</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Grades</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last quarter
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <Line data={trendData} options={{ responsive: true }} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
          <Bar data={subjectData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <Doughnut data={gradeDistributionData} options={{ responsive: true }} />
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Students</h3>
          <div className="space-y-3">
            {[
              { name: 'Maria Santos', grade: '9A', average: 96.5, rank: 1 },
              { name: 'John Dela Cruz', grade: '8B', average: 95.2, rank: 2 },
              { name: 'Anna Reyes', grade: '9B', average: 94.8, rank: 3 },
              { name: 'Carlos Garcia', grade: '7A', average: 94.1, rank: 4 },
              { name: 'Lisa Mendoza', grade: '8A', average: 93.7, rank: 5 },
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{student.rank}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Grade {student.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{student.average}%</p>
                  <p className="text-sm text-gray-500">Average</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;