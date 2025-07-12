import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, Filter, Bell, Users, BookOpen, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Alert {
  id: string;
  type: 'academic' | 'attendance' | 'behavioral' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  studentId?: string;
  studentName?: string;
  date: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}

const AlertsManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'academic',
      severity: 'high',
      title: 'Low Grade Alert',
      message: 'Student has fallen below 75% average in Mathematics',
      studentId: 'STU001',
      studentName: 'John Doe',
      date: new Date('2024-01-15'),
      resolved: false
    },
    {
      id: '2',
      type: 'attendance',
      severity: 'medium',
      title: 'Attendance Warning',
      message: 'Student has been absent for 3 consecutive days',
      studentId: 'STU002',
      studentName: 'Jane Smith',
      date: new Date('2024-01-14'),
      resolved: false
    },
    {
      id: '3',
      type: 'behavioral',
      severity: 'low',
      title: 'Late Submission',
      message: 'Student submitted assignment 2 days late',
      studentId: 'STU003',
      studentName: 'Bob Johnson',
      date: new Date('2024-01-13'),
      resolved: true,
      resolvedBy: 'Mary Smith',
      resolvedAt: new Date('2024-01-14')
    },
    {
      id: '4',
      type: 'system',
      severity: 'critical',
      title: 'Grade Calculation Error',
      message: 'Error in calculating final grades for Grade 8A',
      date: new Date('2024-01-12'),
      resolved: false
    },
    {
      id: '5',
      type: 'academic',
      severity: 'medium',
      title: 'Missing Assignments',
      message: 'Student has 3 missing assignments in Science',
      studentId: 'STU004',
      studentName: 'Alice Brown',
      date: new Date('2024-01-11'),
      resolved: false
    }
  ]);

  const [filter, setFilter] = useState({
    type: '',
    severity: '',
    resolved: '',
    search: ''
  });

  const alertTypes = [
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'blue' },
    { id: 'attendance', name: 'Attendance', icon: Calendar, color: 'green' },
    { id: 'behavioral', name: 'Behavioral', icon: Users, color: 'yellow' },
    { id: 'system', name: 'System', icon: AlertTriangle, color: 'red' }
  ];

  const severityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  const typeColors = {
    academic: 'bg-blue-100 text-blue-800',
    attendance: 'bg-green-100 text-green-800',
    behavioral: 'bg-yellow-100 text-yellow-800',
    system: 'bg-red-100 text-red-800'
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            resolved: true, 
            resolvedBy: 'Current User',
            resolvedAt: new Date()
          }
        : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filter.type === '' || alert.type === filter.type;
    const matchesSeverity = filter.severity === '' || alert.severity === filter.severity;
    const matchesResolved = filter.resolved === '' || 
      (filter.resolved === 'resolved' && alert.resolved) ||
      (filter.resolved === 'unresolved' && !alert.resolved);
    const matchesSearch = filter.search === '' || 
      alert.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      alert.message.toLowerCase().includes(filter.search.toLowerCase()) ||
      (alert.studentName && alert.studentName.toLowerCase().includes(filter.search.toLowerCase()));

    return matchesType && matchesSeverity && matchesResolved && matchesSearch;
  });

  const unresolvedCount = alerts.filter(alert => !alert.resolved).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.resolved).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
          <p className="text-gray-600 mt-1">
            {unresolvedCount} unresolved alerts
            {criticalCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                {criticalCount} critical
              </span>
            )}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Configure Alerts</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {alertTypes.map((type) => {
          const Icon = type.icon;
          const count = alerts.filter(alert => alert.type === type.id && !alert.resolved).length;
          return (
            <div key={type.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{type.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{count}</p>
                </div>
                <div className={`p-3 rounded-full bg-${type.color}-100`}>
                  <Icon className={`h-6 w-6 text-${type.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <select
                value={filter.type}
                onChange={(e) => setFilter({...filter, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="academic">Academic</option>
                <option value="attendance">Attendance</option>
                <option value="behavioral">Behavioral</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <select
                value={filter.severity}
                onChange={(e) => setFilter({...filter, severity: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Severities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <select
                value={filter.resolved}
                onChange={(e) => setFilter({...filter, resolved: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search alerts..."
                value={filter.search}
                onChange={(e) => setFilter({...filter, search: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`p-6 ${alert.resolved ? 'bg-gray-50' : 'bg-white'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[alert.type]}`}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[alert.severity]}`}>
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </span>
                    {alert.resolved && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Resolved
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{alert.title}</h3>
                  <p className="text-gray-600 mb-2">{alert.message}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{format(alert.date, 'MMM dd, yyyy HH:mm')}</span>
                    {alert.studentName && (
                      <span>Student: {alert.studentName}</span>
                    )}
                    {alert.resolved && alert.resolvedBy && (
                      <span>Resolved by: {alert.resolvedBy}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="Mark as Resolved"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Dismiss Alert"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500">No alerts match your current filters.</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Academic Alerts</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Grade below 75%</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Missing assignments</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Significant grade drop</span>
              </label>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Attendance Alerts</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">3+ consecutive absences</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Attendance below 90%</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-sm">Frequent tardiness</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsManagement;