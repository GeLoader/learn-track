import React, { useState } from 'react';
import { User, BookOpen, Calendar, TrendingUp, Eye, MessageCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface Child {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  overallAverage: number;
  attendanceRate: number;
  recentGrades: Array<{
    subject: string;
    grade: number;
    date: string;
  }>;
  upcomingEvents: Array<{
    event: string;
    date: string;
    time: string;
  }>;
}

const ChildrenManagement: React.FC = () => {
  const [children] = useState<Child[]>([
    {
      id: '1',
      studentId: 'STU001',
      name: 'John Doe',
      grade: '8',
      section: 'A',
      overallAverage: 90.5,
      attendanceRate: 96,
      recentGrades: [
        { subject: 'Mathematics', grade: 92, date: '2024-01-15' },
        { subject: 'Science', grade: 88, date: '2024-01-12' },
        { subject: 'English', grade: 95, date: '2024-01-10' },
        { subject: 'History', grade: 87, date: '2024-01-08' },
      ],
      upcomingEvents: [
        { event: 'Parent-Teacher Conference', date: '2024-01-25', time: '2:00 PM' },
        { event: 'Mathematics Quiz', date: '2024-01-22', time: '10:00 AM' },
        { event: 'Science Project Due', date: '2024-01-20', time: '11:59 PM' },
      ]
    },
    {
      id: '2',
      studentId: 'STU005',
      name: 'Emma Doe',
      grade: '7',
      section: 'B',
      overallAverage: 88.2,
      attendanceRate: 94,
      recentGrades: [
        { subject: 'Mathematics', grade: 85, date: '2024-01-15' },
        { subject: 'Science', grade: 90, date: '2024-01-12' },
        { subject: 'English', grade: 92, date: '2024-01-10' },
        { subject: 'Filipino', grade: 86, date: '2024-01-08' },
      ],
      upcomingEvents: [
        { event: 'Art Exhibition', date: '2024-01-24', time: '3:00 PM' },
        { event: 'English Essay Due', date: '2024-01-21', time: '11:59 PM' },
      ]
    }
  ]);

  const [selectedChild, setSelectedChild] = useState<Child | null>(children[0]);

  const getPerformanceData = (child: Child) => {
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [
        {
          label: 'Overall Average',
          data: [85, 87, 89, 88, 90, child.overallAverage],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${selectedChild?.name}'s Academic Progress`,
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

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'bg-green-100 text-green-800';
    if (grade >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Children</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>Contact Teacher</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Children</h3>
          <div className="space-y-3">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedChild?.id === child.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-500">Grade {child.grade}{child.section}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedChild && (
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Overall Average</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedChild.overallAverage}%</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedChild.attendanceRate}%</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Grade & Section</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedChild.grade}{selectedChild.section}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Student ID</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{selectedChild.studentId}</p>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100">
                    <User className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Progress</h3>
                <Line data={getPerformanceData(selectedChild)} options={chartOptions} />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
                <div className="space-y-3">
                  {selectedChild.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{grade.subject}</p>
                        <p className="text-sm text-gray-500">{grade.date}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(grade.grade)}`}>
                        {grade.grade}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {selectedChild.upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-gray-600" />
                      <span>View Detailed Report Card</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-5 w-5 text-gray-600" />
                      <span>Message Class Teacher</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <span>Schedule Parent Conference</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher's Notes</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-green-900">Excellent Progress in Mathematics</p>
                    <span className="text-sm text-green-600">Jan 15, 2024</span>
                  </div>
                  <p className="text-green-700">{selectedChild.name} has shown remarkable improvement in problem-solving skills and consistently participates in class discussions.</p>
                  <p className="text-sm text-green-600 mt-2">- Ms. Mary Smith, Mathematics Teacher</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-blue-900">Great Leadership Skills</p>
                    <span className="text-sm text-blue-600">Jan 10, 2024</span>
                  </div>
                  <p className="text-blue-700">{selectedChild.name} demonstrated excellent leadership during the group science project and helped classmates understand complex concepts.</p>
                  <p className="text-sm text-blue-600 mt-2">- Dr. James Wilson, Science Teacher</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildrenManagement;