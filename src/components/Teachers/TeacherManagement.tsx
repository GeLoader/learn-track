import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Download, Mail, Phone } from 'lucide-react';

interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  classes: string[];
  hireDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      teacherId: 'TCH001',
      name: 'Mary Smith',
      email: 'mary.smith@sjcsi.edu',
      phone: '+63 912 345 6789',
      department: 'Mathematics',
      subjects: ['Algebra', 'Geometry'],
      classes: ['7A', '8B'],
      hireDate: '2020-08-15',
      status: 'active'
    },
    {
      id: '2',
      teacherId: 'TCH002',
      name: 'Dr. James Wilson',
      email: 'james.wilson@sjcsi.edu',
      phone: '+63 912 345 6790',
      department: 'Science',
      subjects: ['Biology', 'Chemistry'],
      classes: ['8A', '9A'],
      hireDate: '2019-06-10',
      status: 'active'
    },
    {
      id: '3',
      teacherId: 'TCH003',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@sjcsi.edu',
      phone: '+63 912 345 6791',
      department: 'English',
      subjects: ['English Literature', 'Creative Writing'],
      classes: ['7B', '9B'],
      hireDate: '2021-01-20',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

  const [newTeacher, setNewTeacher] = useState({
    teacherId: '',
    name: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    subjects: [''],
    classes: [''],
    hireDate: new Date().toISOString().split('T')[0]
  });

  const departments = ['Mathematics', 'Science', 'English', 'Filipino', 'Social Studies', 'Physical Education', 'Arts'];

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email && newTeacher.teacherId) {
      const teacher: Teacher = {
        id: Date.now().toString(),
        ...newTeacher,
        subjects: newTeacher.subjects.filter(s => s.trim() !== ''),
        classes: newTeacher.classes.filter(c => c.trim() !== ''),
        status: 'active'
      };
      setTeachers([...teachers, teacher]);
      resetForm();
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher({
      teacherId: teacher.teacherId,
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      subjects: teacher.subjects,
      classes: teacher.classes,
      hireDate: teacher.hireDate
    });
    setShowAddForm(true);
  };

  const handleUpdateTeacher = () => {
    if (editingTeacher && newTeacher.name && newTeacher.email && newTeacher.teacherId) {
      setTeachers(teachers.map(t => 
        t.id === editingTeacher.id 
          ? { 
              ...t, 
              ...newTeacher,
              subjects: newTeacher.subjects.filter(s => s.trim() !== ''),
              classes: newTeacher.classes.filter(c => c.trim() !== '')
            }
          : t
      ));
      setEditingTeacher(null);
      resetForm();
    }
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  const resetForm = () => {
    setNewTeacher({
      teacherId: '',
      name: '',
      email: '',
      phone: '',
      department: 'Mathematics',
      subjects: [''],
      classes: [''],
      hireDate: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const addSubjectField = () => {
    setNewTeacher({
      ...newTeacher,
      subjects: [...newTeacher.subjects, '']
    });
  };

  const removeSubjectField = (index: number) => {
    setNewTeacher({
      ...newTeacher,
      subjects: newTeacher.subjects.filter((_, i) => i !== index)
    });
  };

  const updateSubject = (index: number, value: string) => {
    const updatedSubjects = [...newTeacher.subjects];
    updatedSubjects[index] = value;
    setNewTeacher({
      ...newTeacher,
      subjects: updatedSubjects
    });
  };

  const addClassField = () => {
    setNewTeacher({
      ...newTeacher,
      classes: [...newTeacher.classes, '']
    });
  };

  const removeClassField = (index: number) => {
    setNewTeacher({
      ...newTeacher,
      classes: newTeacher.classes.filter((_, i) => i !== index)
    });
  };

  const updateClass = (index: number, value: string) => {
    const updatedClasses = [...newTeacher.classes];
    updatedClasses[index] = value;
    setNewTeacher({
      ...newTeacher,
      classes: updatedClasses
    });
  };

  const exportTeachers = () => {
    const csvContent = [
      ['Teacher ID', 'Name', 'Email', 'Phone', 'Department', 'Subjects', 'Classes', 'Hire Date', 'Status'],
      ...teachers.map(teacher => [
        teacher.teacherId,
        teacher.name,
        teacher.email,
        teacher.phone,
        teacher.department,
        teacher.subjects.join('; '),
        teacher.classes.join('; '),
        teacher.hireDate,
        teacher.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
  };

  const filteredTeachers = teachers.filter(teacher =>
    (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     teacher.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDepartment === '' || teacher.department === selectedDepartment)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Management</h2>
        <div className="flex space-x-3">
          <button
            onClick={exportTeachers}
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
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label>
              <input
                type="text"
                value={newTeacher.teacherId}
                onChange={(e) => setNewTeacher({...newTeacher, teacherId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter teacher ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={newTeacher.department}
                onChange={(e) => setNewTeacher({...newTeacher, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
              <input
                type="date"
                value={newTeacher.hireDate}
                onChange={(e) => setNewTeacher({...newTeacher, hireDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
            {newTeacher.subjects.map((subject, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => updateSubject(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject"
                />
                {newTeacher.subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubjectField(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSubjectField}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Subject
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
            {newTeacher.classes.map((classItem, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <select
                  value={classItem}
                  onChange={(e) => updateClass(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select class</option>
                  <option value="7A">Grade 7A</option>
                  <option value="7B">Grade 7B</option>
                  <option value="8A">Grade 8A</option>
                  <option value="8B">Grade 8B</option>
                  <option value="9A">Grade 9A</option>
                  <option value="9B">Grade 9B</option>
                </select>
                {newTeacher.classes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClassField(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addClassField}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Class
            </button>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setEditingTeacher(null);
                resetForm();
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
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
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredTeachers.length} of {teachers.length} teachers
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.teacherId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs">
                      {teacher.subjects.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {teacher.classes.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="text-xs">{teacher.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        <span className="text-xs">{teacher.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      teacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingTeacher(teacher)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditTeacher(teacher)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Edit Teacher"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Teacher"
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

      {viewingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Teacher Details</h3>
                <button
                  onClick={() => setViewingTeacher(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Teacher ID:</span> {viewingTeacher.teacherId}</p>
                    <p><span className="font-medium">Name:</span> {viewingTeacher.name}</p>
                    <p><span className="font-medium">Email:</span> {viewingTeacher.email}</p>
                    <p><span className="font-medium">Phone:</span> {viewingTeacher.phone}</p>
                    <p><span className="font-medium">Department:</span> {viewingTeacher.department}</p>
                    <p><span className="font-medium">Hire Date:</span> {viewingTeacher.hireDate}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Teaching Assignment</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Subjects:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {viewingTeacher.subjects.map((subject, index) => (
                          <li key={index}>{subject}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Classes:</span>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {viewingTeacher.classes.map((classItem, index) => (
                          <li key={index}>Grade {classItem}</li>
                        ))}
                      </ul>
                    </div>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                        viewingTeacher.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {viewingTeacher.status.charAt(0).toUpperCase() + viewingTeacher.status.slice(1)}
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

export default TeacherManagement;