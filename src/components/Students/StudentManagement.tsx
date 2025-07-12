import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, Upload } from 'lucide-react';

interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  parentName: string;
  parentContact: string;
  address: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      studentId: 'STU001',
      name: 'John Doe',
      email: 'john.doe@sjcsi.edu',
      grade: '7',
      section: 'A',
      parentName: 'Robert Doe',
      parentContact: '+63 912 345 6789',
      address: '123 Main St, Manila',
      enrollmentDate: '2024-06-15',
      status: 'active'
    },
    {
      id: '2',
      studentId: 'STU002',
      name: 'Jane Smith',
      email: 'jane.smith@sjcsi.edu',
      grade: '8',
      section: 'B',
      parentName: 'Mary Smith',
      parentContact: '+63 912 345 6790',
      address: '456 Oak Ave, Quezon City',
      enrollmentDate: '2024-06-15',
      status: 'active'
    },
    {
      id: '3',
      studentId: 'STU003',
      name: 'Bob Johnson',
      email: 'bob.johnson@sjcsi.edu',
      grade: '9',
      section: 'A',
      parentName: 'David Johnson',
      parentContact: '+63 912 345 6791',
      address: '789 Pine St, Makati',
      enrollmentDate: '2024-06-15',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  const [newStudent, setNewStudent] = useState({
    studentId: '',
    name: '',
    email: '',
    grade: '7',
    section: 'A',
    parentName: '',
    parentContact: '',
    address: '',
    enrollmentDate: new Date().toISOString().split('T')[0]
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.studentId) {
      const student: Student = {
        id: Date.now().toString(),
        ...newStudent,
        status: 'active'
      };
      setStudents([...students, student]);
      setNewStudent({
        studentId: '',
        name: '',
        email: '',
        grade: '7',
        section: 'A',
        parentName: '',
        parentContact: '',
        address: '',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      grade: student.grade,
      section: student.section,
      parentName: student.parentName,
      parentContact: student.parentContact,
      address: student.address,
      enrollmentDate: student.enrollmentDate
    });
    setShowAddForm(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent && newStudent.name && newStudent.email && newStudent.studentId) {
      setStudents(students.map(s => 
        s.id === editingStudent.id 
          ? { ...s, ...newStudent }
          : s
      ));
      setEditingStudent(null);
      setNewStudent({
        studentId: '',
        name: '',
        email: '',
        grade: '7',
        section: 'A',
        parentName: '',
        parentContact: '',
        address: '',
        enrollmentDate: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const exportStudents = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Email', 'Grade', 'Section', 'Parent Name', 'Parent Contact', 'Address', 'Enrollment Date', 'Status'],
      ...students.map(student => [
        student.studentId,
        student.name,
        student.email,
        student.grade,
        student.section,
        student.parentName,
        student.parentContact,
        student.address,
        student.enrollmentDate,
        student.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  const filteredStudents = students.filter(student =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGrade === '' || student.grade === selectedGrade)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportStudents}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                value={newStudent.studentId}
                onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                value={newStudent.grade}
                onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select
                value={newStudent.section}
                onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name</label>
              <input
                type="text"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter parent name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Contact</label>
              <input
                type="text"
                value={newStudent.parentContact}
                onChange={(e) => setNewStudent({...newStudent, parentContact: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={newStudent.address}
                onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
              <input
                type="date"
                value={newStudent.enrollmentDate}
                onChange={(e) => setNewStudent({...newStudent, enrollmentDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingStudent(null);
                setNewStudent({
                  studentId: '',
                  name: '',
                  email: '',
                  grade: '7',
                  section: 'A',
                  parentName: '',
                  parentContact: '',
                  address: '',
                  enrollmentDate: new Date().toISOString().split('T')[0]
                });
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingStudent ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Grades</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredStudents.length} of {students.length} students
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade & Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent/Guardian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Grade {student.grade} - {student.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.parentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.parentContact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingStudent(student)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Edit Student"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
                <button
                  onClick={() => setViewingStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Student ID:</span> {viewingStudent.studentId}</p>
                    <p><span className="font-medium">Name:</span> {viewingStudent.name}</p>
                    <p><span className="font-medium">Email:</span> {viewingStudent.email}</p>
                    <p><span className="font-medium">Grade:</span> {viewingStudent.grade}</p>
                    <p><span className="font-medium">Section:</span> {viewingStudent.section}</p>
                    <p><span className="font-medium">Address:</span> {viewingStudent.address}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Parent/Guardian Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {viewingStudent.parentName}</p>
                    <p><span className="font-medium">Contact:</span> {viewingStudent.parentContact}</p>
                    <p><span className="font-medium">Enrollment Date:</span> {viewingStudent.enrollmentDate}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        viewingStudent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {viewingStudent.status.charAt(0).toUpperCase() + viewingStudent.status.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;