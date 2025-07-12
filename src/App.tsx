import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import GradeManagement from './components/Grades/GradeManagement';
import PerformanceAnalytics from './components/Analytics/PerformanceAnalytics';
import AttendanceManagement from './components/Attendance/AttendanceManagement';
import StudentManagement from './components/Students/StudentManagement';
import TeacherManagement from './components/Teachers/TeacherManagement';
import ReportsManagement from './components/Reports/ReportsManagement';
import Settings from './components/Settings/Settings';
import AlertsManagement from './components/Alerts/AlertsManagement';
import ChildrenManagement from './components/Children/ChildrenManagement';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        switch (user?.role) {
          case 'student':
            return <StudentDashboard />;
          case 'teacher':
            return <TeacherDashboard />;
          case 'parent':
            return <ParentDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <StudentDashboard />;
        }
      case 'grades':
        return <GradeManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'children':
        return <ChildrenManagement />;
      case 'analytics':
      case 'performance':
        return <PerformanceAnalytics />;
      case 'alerts':
        return <AlertsManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'settings':
        return <Settings />;
      default:
        switch (user?.role) {
          case 'student':
            return <StudentDashboard />;
          case 'teacher':
            return <TeacherDashboard />;
          case 'parent':
            return <ParentDashboard />;
          case 'admin':
            return <AdminDashboard />;
          default:
            return <StudentDashboard />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;