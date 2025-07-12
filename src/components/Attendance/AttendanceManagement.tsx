import React, { useState } from 'react';
import { Calendar, Users, Search, Download, Plus, Edit, Check, X } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'excused';
  subject?: string;
  notes?: string;
}

const AttendanceManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState('7A');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', studentId: 'STU001', studentName: 'John Doe', date: new Date(), status: 'present' },
    { id: '2', studentId: 'STU002', studentName: 'Jane Smith', date: new Date(), status: 'present' },
    { id: '3', studentId: 'STU003', studentName: 'Bob Johnson', date: new Date(), status: 'late' },
    { id: '4', studentId: 'STU004', studentName: 'Alice Brown', date: new Date(), status: 'absent', notes: 'Sick leave' },
    { id: '5', studentId: 'STU005', studentName: 'Charlie Wilson', date: new Date(), status: 'present' },
  ]);

  const students = [
    { id: 'STU001', name: 'John Doe', class: '7A' },
    { id: 'STU002', name: 'Jane Smith', class: '7A' },
    { id: 'STU003', name: 'Bob Johnson', class: '7A' },
    { id: 'STU004', name: 'Alice Brown', class: '7A' },
    { id: 'STU005', name: 'Charlie Wilson', class: '7A' },
    { id: 'STU006', name: 'Diana Davis', class: '7A' },
    { id: 'STU007', name: 'Edward Miller', class: '7A' },
  ];

  const updateAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceRecords(prev => {
      const existing = prev.find(r => r.studentId === studentId && isSameDay(r.date, selectedDate));
      if (existing) {
        return prev.map(r => 
          r.id === existing.id ? { ...r, status } : r
        );
      } else {
        const student = students.find(s => s.id === studentId);
        return [...prev, {
          id: Date.now().toString(),
          studentId,
          studentName: student?.name || '',
          date: selectedDate,
          status
        }];
      }
    });
  };

  const getAttendanceStatus = (studentId: string) => {
    const record = attendanceRecords.find(r => 
      r.studentId === studentId && isSameDay(r.date, selectedDate)
    );
    return record?.status || 'present';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const exportAttendance = () => {
    const csvContent = [
      ['Student Name', 'Date', 'Status', 'Notes'],
      ...attendanceRecords.map(record => [
        record.studentName,
        format(record.date, 'yyyy-MM-dd'),
        record.status,
        record.notes || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${format(selectedDate, 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    student.class === selectedClass
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportAttendance}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7A">Grade 7A</option>
              <option value="7B">Grade 7B</option>
              <option value="8A">Grade 8A</option>
              <option value="8B">Grade 8B</option>
              <option value="9A">Grade 9A</option>
              <option value="9B">Grade 9B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'daily' | 'weekly' | 'monthly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => {
                const status = getAttendanceStatus(student.id);
                return (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateAttendance(student.id, 'present')}
                          className={`p-1 rounded ${status === 'present' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-green-100'} transition-colors`}
                          title="Present"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateAttendance(student.id, 'absent')}
                          className={`p-1 rounded ${status === 'absent' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-red-100'} transition-colors`}
                          title="Absent"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateAttendance(student.id, 'late')}
                          className={`p-1 rounded ${status === 'late' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-yellow-100'} transition-colors`}
                          title="Late"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateAttendance(student.id, 'excused')}
                          className={`p-1 rounded ${status === 'excused' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-100'} transition-colors`}
                          title="Excused"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Present:</span>
              <span className="font-medium text-green-600">
                {attendanceRecords.filter(r => isSameDay(r.date, selectedDate) && r.status === 'present').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Absent:</span>
              <span className="font-medium text-red-600">
                {attendanceRecords.filter(r => isSameDay(r.date, selectedDate) && r.status === 'absent').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Late:</span>
              <span className="font-medium text-yellow-600">
                {attendanceRecords.filter(r => isSameDay(r.date, selectedDate) && r.status === 'late').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Excused:</span>
              <span className="font-medium text-blue-600">
                {attendanceRecords.filter(r => isSameDay(r.date, selectedDate) && r.status === 'excused').length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round((attendanceRecords.filter(r => isSameDay(r.date, selectedDate) && r.status === 'present').length / filteredStudents.length) * 100)}%
            </div>
            <p className="text-gray-600 mt-1">Overall attendance</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Mark All Present
            </button>
            <button className="w-full px-3 py-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Send Absence Notifications
            </button>
            <button className="w-full px-3 py-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;