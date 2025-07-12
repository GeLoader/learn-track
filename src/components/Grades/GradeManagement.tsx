import React, { useState } from 'react';
import { Plus, Edit, Trash2, Filter } from 'lucide-react';

interface Grade {
  id: string;
  student: string;
  subject: string;
  category: string;
  score: number;
  maxScore: number;
  date: string;
  quarter: number;
}

const GradeManagement: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', student: 'John Doe', subject: 'Mathematics', category: 'Quiz', score: 85, maxScore: 100, date: '2024-01-15', quarter: 3 },
    { id: '2', student: 'Jane Smith', subject: 'Science', category: 'Exam', score: 92, maxScore: 100, date: '2024-01-12', quarter: 3 },
    { id: '3', student: 'Bob Johnson', subject: 'English', category: 'Project', score: 88, maxScore: 100, date: '2024-01-10', quarter: 3 },
    { id: '4', student: 'Alice Brown', subject: 'History', category: 'Activity', score: 90, maxScore: 100, date: '2024-01-08', quarter: 3 },
  ]);

  const [filter, setFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGrade, setNewGrade] = useState({
    student: '',
    subject: '',
    category: 'Quiz',
    score: '',
    maxScore: '100',
    date: '',
    quarter: 3
  });

  const handleAddGrade = () => {
    if (newGrade.student && newGrade.subject && newGrade.score && newGrade.date) {
      const grade: Grade = {
        id: Date.now().toString(),
        student: newGrade.student,
        subject: newGrade.subject,
        category: newGrade.category,
        score: parseInt(newGrade.score),
        maxScore: parseInt(newGrade.maxScore),
        date: newGrade.date,
        quarter: newGrade.quarter
      };
      setGrades([...grades, grade]);
      setNewGrade({
        student: '',
        subject: '',
        category: 'Quiz',
        score: '',
        maxScore: '100',
        date: '',
        quarter: 3
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id));
  };

  const filteredGrades = grades.filter(grade =>
    grade.student.toLowerCase().includes(filter.toLowerCase()) ||
    grade.subject.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Grade Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Grade</span>
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Grade</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
              <input
                type="text"
                value={newGrade.student}
                onChange={(e) => setNewGrade({...newGrade, student: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={newGrade.subject}
                onChange={(e) => setNewGrade({...newGrade, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newGrade.category}
                onChange={(e) => setNewGrade({...newGrade, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Quiz">Quiz</option>
                <option value="Exam">Exam</option>
                <option value="Activity">Activity</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
              <input
                type="number"
                value={newGrade.score}
                onChange={(e) => setNewGrade({...newGrade, score: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter score"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Score</label>
              <input
                type="number"
                value={newGrade.maxScore}
                onChange={(e) => setNewGrade({...newGrade, maxScore: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter max score"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newGrade.date}
                onChange={(e) => setNewGrade({...newGrade, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGrade}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Grade
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student or subject..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quarter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGrades.map((grade) => (
                <tr key={grade.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.score}/{grade.maxScore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      (grade.score / grade.maxScore) * 100 >= 90 ? 'bg-green-100 text-green-800' :
                      (grade.score / grade.maxScore) * 100 >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {((grade.score / grade.maxScore) * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{grade.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Q{grade.quarter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGrade(grade.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
    </div>
  );
};

export default GradeManagement;