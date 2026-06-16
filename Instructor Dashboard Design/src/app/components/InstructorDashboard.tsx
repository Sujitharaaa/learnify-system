import { BookOpen, Users, FileText, ClipboardList, TrendingUp, Bell } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}

function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '22' }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '13px',
            color: '#6B7280',
            fontWeight: 'bold',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '36px',
            color: '#001F91',
            lineHeight: '1.1',
          }}
        >
          {value}
        </div>
        {sub && (
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#9CA3AF' }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

const recentActivity = [
  { course: 'CSNB4122 - Software Engineering', action: 'Quiz 3 submitted by 18 students', time: '2 hrs ago', type: 'quiz' },
  { course: 'CSNB4122 - Software Engineering', action: 'Assignment 3 deadline approaching', time: '5 hrs ago', type: 'assignment' },
  { course: 'CSNB4122 - Software Engineering', action: 'New module uploaded: Module 5', time: 'Yesterday', type: 'module' },
  { course: 'CSNB4122 - Software Engineering', action: '3 students sent messages', time: 'Yesterday', type: 'message' },
  { course: 'CSNB4122 - Software Engineering', action: 'Lesson 8 published', time: '2 days ago', type: 'lesson' },
];

const courses = [
  { code: 'CSNB4122', title: 'SOFTWARE ENGINEERING FUNDAMENTALS', students: 42, progress: 60 },
];

const typeColor: Record<string, string> = {
  quiz: '#001F91',
  assignment: '#E05C20',
  module: '#16A34A',
  message: '#7C3AED',
  lesson: '#0891B2',
};

export function InstructorDashboard() {
  return (
    <div className="px-10 py-8">
      <div
        style={{
          fontFamily: 'Impact, sans-serif',
          fontSize: '54px',
          color: '#001F91',
          letterSpacing: '0.05em',
          marginBottom: '8px',
        }}
      >
        INSTRUCTOR DASHBOARD
      </div>
      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#6B7280', marginBottom: '28px' }}>
        Thursday, 4 June 2026 &nbsp;·&nbsp; Semester 2, 2025/2026
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard icon={<BookOpen size={28} />} label="TOTAL COURSES" value={1} sub="Active this semester" color="#001F91" />
        <StatCard icon={<Users size={28} />} label="TOTAL STUDENTS" value={42} sub="Across all courses" color="#0891B2" />
        <StatCard icon={<FileText size={28} />} label="QUIZZES CREATED" value={3} sub="1 pending grading" color="#7C3AED" />
        <StatCard icon={<ClipboardList size={28} />} label="ASSIGNMENTS" value={3} sub="1 due this week" color="#E05C20" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={18} style={{ color: '#001F91' }} />
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '15px', color: '#001F91', letterSpacing: '0.08em' }}>
              RECENT ACTIVITY
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-4" style={{ borderBottom: i < recentActivity.length - 1 ? '1px solid #E9ECFF' : 'none' }}>
                <div
                  className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: typeColor[item.type] }}
                />
                <div className="flex-1">
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}>
                    {item.course}
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151' }}>
                    {item.action}
                  </div>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Courses Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} style={{ color: '#001F91' }} />
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '15px', color: '#001F91', letterSpacing: '0.08em' }}>
              MY COURSES
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {courses.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#001F91' }}>
                    {c.code}
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#6B7280' }}>
                    {c.students} students
                  </div>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#374151', marginBottom: '4px' }}>
                  {c.title}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${c.progress}%`, backgroundColor: '#001F91' }}
                  />
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#6B7280', marginTop: '2px' }}>
                  {c.progress}% course completion
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}