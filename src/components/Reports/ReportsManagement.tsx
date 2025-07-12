import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, BarChart3, Users, BookOpen } from 'lucide-react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

const ReportsManagement: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('academic');
  const [dateRange, setDateRange] = useState('quarter');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const reportTypes = [
    { id: 'academic', name: 'Academic Performance', icon: BarChart3 },
    { id: 'attendance', name: 'Attendance Report', icon: Calendar },
    { id: 'student', name: 'Student Progress', icon: Users },
    { id: 'grade', name: 'Grade Distribution', icon: BookOpen },
  ];

  const academicData = {
    labels: ['Mathematics', 'Science', 'English', 'Filipino', 'History', 'PE'],
    datasets: [
      {
        label: 'Class Average',
        data: [85, 88, 92, 87, 89, 94],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance Rate (%)',
        data: [95, 94, 96, 93, 95, 97],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
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

  const generateReport = () => {
    const reportData = {
      type: selectedReport,
      dateRange,
      grade: selectedGrade,
      subject: selectedSubject,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReport}-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const exportToPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const exportToExcel = () => {
    alert('Excel export functionality would be implemented here');
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'academic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Overall Average</h4>
                <p className="text-2xl font-bold text-blue-600">88.5%</p>
                <p className="text-sm text-blue-700">+2.3% from last quarter</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Top Performing Subject</h4>
                <p className="text-2xl font-bold text-green-600">PE</p>
                <p className="text-sm text-green-700">94% average</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Needs Improvement</h4>
                <p className="text-2xl font-bold text-yellow-600">Mathematics</p>
                <p className="text-sm text-yellow-700">85% average</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold mb-4">Subject Performance</h4>
              <Bar data={academicData} options={{ responsive: true }} />
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900">Present</h4>
                <p className="text-2xl font-bold text-green-600">92%</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-900">Absent</h4>
                <p className="text-2xl font-bold text-red-600">5%</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-900">Late</h4>
                <p className="text-2xl font-bold text-yellow-600">2%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900">Excused</h4>
                <p className="text-2xl font-bold text-blue-600">1%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold mb-4">Attendance Trend</h4>
              <Line data={attendanceData} options={{ responsive: true }} />
            </div>
          </div>
        );

      case 'grade':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-semibold mb-4">Grade Distribution</h4>
                <Doughnut data={gradeDistributionData} options={{ responsive: true }} />
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-semibold mb-4">Grade Statistics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Honor Roll Students:</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students with B or Higher:</span>
                    <span className="font-medium">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students Needing Support:</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Class Median:</span>
                    <span className="font-medium">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'student':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold mb-4">Top Performing Students</h4>
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

            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold mb-4">Students Needing Support</h4>
              <div className="space-y-3">
                {[
                  { name: 'Alex Johnson', grade: '7B', average: 68.5, subjects: ['Mathematics', 'Science'] },
                  { name: 'Sarah Wilson', grade: '8A', average: 72.1, subjects: ['English'] },
                  { name: 'Mike Brown', grade: '9A', average: 69.8, subjects: ['Mathematics', 'History'] },
                ].map((student, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">Grade {student.grade}</p>
                        <p className="text-sm text-red-600">Struggling in: {student.subjects.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">{student.average}%</p>
                        <p className="text-sm text-gray-500">Average</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a report type to view data</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="quarter">Current Quarter</option>
              <option value="semester">Current Semester</option>
              <option value="year">Academic Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Grades</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="filipino">Filipino</option>
              <option value="history">History</option>
              <option value="pe">Physical Education</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={generateReport}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h3>
          <div className="space-y-2">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedReport === type.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          {renderReportContent()}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Weekly Summary</h4>
            <p className="text-sm text-gray-600 mt-1">Generate weekly performance summary</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Parent Report Cards</h4>
            <p className="text-sm text-gray-600 mt-1">Generate report cards for parents</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium text-gray-900">Administrative Summary</h4>
            <p className="text-sm text-gray-600 mt-1">Generate administrative overview</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;