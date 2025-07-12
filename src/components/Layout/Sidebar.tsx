import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  AlertTriangle,
  FileText,
  Settings,
  GraduationCap
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'grades', label: 'My Grades', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'performance', label: 'Performance', icon: BarChart3 }
        ];
      case 'teacher':
        return [
          ...baseItems,
          { id: 'students', label: 'Students', icon: Users },
          { id: 'grades', label: 'Grade Management', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
        ];
      case 'parent':
        return [
          ...baseItems,
          { id: 'children', label: 'My Children', icon: Users },
          { id: 'grades', label: 'Grades', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'reports', label: 'Reports', icon: FileText }
        ];
      case 'admin':
        return [
          ...baseItems,
          { id: 'students', label: 'Students', icon: GraduationCap },
          { id: 'teachers', label: 'Teachers', icon: Users },
          { id: 'grades', label: 'Grade Management', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="bg-gray-50 w-64 h-full border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={clsx(
                    'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;