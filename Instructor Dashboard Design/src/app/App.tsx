import { useState } from 'react';
import { Header, type InstructorView } from './components/Header';
import { InstructorDashboard } from './components/InstructorDashboard';
import { ManageCourses } from './components/ManageCourses';
import { ManageModules } from './components/ManageModules';
import { ManageLessons } from './components/ManageLessons';
import { QuestionBank } from './components/QuestionBank';
import { CreateEditQuiz } from './components/CreateEditQuiz';
import { ManageAssignments } from './components/ManageAssignments';
import { StudentAnalytics } from './components/StudentAnalytics';
import { AIInstructorSummary } from './components/AIInstructorSummary';
import { InstructorProfile } from './components/InstructorProfile';

export default function App() {
  const [currentView, setCurrentView] = useState<InstructorView>('dashboard');

  return (
    <div style={{ backgroundColor: '#E9ECFF', minHeight: '100vh' }}>
      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
        userName="FARAH"
        userId="INS261UC2026F"
      />

      <div>
        {currentView === 'dashboard' && <InstructorDashboard />}
        {currentView === 'manage-courses' && <ManageCourses />}
        {currentView === 'manage-modules' && <ManageModules />}
        {currentView === 'manage-lessons' && <ManageLessons />}
        {currentView === 'question-bank' && <QuestionBank />}
        {currentView === 'create-quiz' && <CreateEditQuiz />}
        {currentView === 'manage-assignments' && <ManageAssignments />}
        {currentView === 'analytics' && <StudentAnalytics />}
        {currentView === 'ai-summary' && <AIInstructorSummary />}
        {currentView === 'profile' && (
          <InstructorProfile userName="FARAH" userId="INS261UC2026F" />
        )}
      </div>
    </div>
  );
}
