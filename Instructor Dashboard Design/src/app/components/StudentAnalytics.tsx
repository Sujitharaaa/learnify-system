import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

const courseOptions = ['CSNB4122 - Software Engineering', 'CSNB3385 - Cybersecurity', 'CSNB3511 - OOAD', 'CSNB4532 - Data Analytics', 'CSNB2441 - Computational Method'];

const gradeData = [
  { grade: 'A (90-100)', count: 8, fill: '#16A34A' },
  { grade: 'B (80-89)', count: 14, fill: '#001F91' },
  { grade: 'C (70-79)', count: 11, fill: '#0891B2' },
  { grade: 'D (60-69)', count: 5, fill: '#D97706' },
  { grade: 'F (<60)', count: 4, fill: '#DC2626' },
];

const progressTrend = [
  { week: 'Week 1', avg: 65, engagement: 80 },
  { week: 'Week 2', avg: 68, engagement: 75 },
  { week: 'Week 3', avg: 72, engagement: 82 },
  { week: 'Week 4', avg: 70, engagement: 78 },
  { week: 'Week 5', avg: 75, engagement: 85 },
  { week: 'Week 6', avg: 73, engagement: 80 },
  { week: 'Week 7', avg: 78, engagement: 88 },
  { week: 'Week 8', avg: 80, engagement: 90 },
];

const quizPerformance = [
  { name: 'Quiz 1', avg: 74, highest: 95, lowest: 42 },
  { name: 'Quiz 2', avg: 78, highest: 100, lowest: 50 },
  { name: 'Quiz 3', avg: 81, highest: 98, lowest: 55 },
];

const assignmentSubmission = [
  { name: 'Assign 1', submitted: 40, total: 42 },
  { name: 'Assign 2', submitted: 38, total: 42 },
  { name: 'Assign 3', submitted: 5, total: 42 },
];

const topStudents = [
  { name: 'Ahmad Faruqi', id: 'CS210001', avg: 94.5 },
  { name: 'Nur Aisyah', id: 'CS210023', avg: 92.0 },
  { name: 'Lim Wei Kiat', id: 'CS210045', avg: 91.5 },
  { name: 'Priya Devi', id: 'CS210067', avg: 90.0 },
  { name: 'Zulaikha Binti Ali', id: 'CS210089', avg: 88.5 },
];

const atRiskStudents = [
  { name: 'Kevin Tan', id: 'CS210101', avg: 52.0, issue: 'Low quiz scores' },
  { name: 'Harish Kumar', id: 'CS210113', avg: 48.5, issue: 'Missing assignments' },
  { name: 'Sara Abdullah', id: 'CS210125', avg: 55.0, issue: 'Low engagement' },
  { name: 'John Doe', id: 'CS210137', avg: 57.5, issue: 'Inconsistent performance' },
];

const COLORS = ['#16A34A', '#001F91', '#0891B2', '#D97706', '#DC2626'];

export function StudentAnalytics() {
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '44px', color: '#001F91', letterSpacing: '0.05em' }}>
          STUDENT PERFORMANCE ANALYTICS
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
          style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}
        >
          {courseOptions.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'CLASS AVERAGE', value: '74.8%', color: '#001F91' },
          { label: 'HIGHEST SCORE', value: '94.5%', color: '#16A34A' },
          { label: 'PASS RATE', value: '90.5%', color: '#0891B2' },
          { label: 'AT RISK STUDENTS', value: '4', color: '#DC2626' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold', color: '#6B7280', letterSpacing: '0.08em' }}>{s.label}</div>
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '38px', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Grade Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
            GRADE DISTRIBUTION
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={gradeData} dataKey="count" cx="50%" cy="50%" outerRadius={75} paddingAngle={2}>
                  {gradeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {gradeData.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>{g.grade}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#001F91' }}>{g.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Average Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
            WEEKLY PERFORMANCE TREND
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={progressTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECFF" />
              <XAxis dataKey="week" tick={{ fontFamily: 'Arial', fontSize: 10, fill: '#6B7280' }} />
              <YAxis domain={[50, 100]} tick={{ fontFamily: 'Arial', fontSize: 10, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ fontFamily: 'Arial', fontSize: '12px' }} />
              <Line type="monotone" dataKey="avg" stroke="#001F91" strokeWidth={2.5} dot={{ fill: '#001F91', r: 3 }} name="Class Average" />
              <Line type="monotone" dataKey="engagement" stroke="#0891B2" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Engagement %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
            QUIZ PERFORMANCE
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={quizPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECFF" />
              <XAxis dataKey="name" tick={{ fontFamily: 'Arial', fontSize: 11, fill: '#6B7280' }} />
              <YAxis domain={[0, 100]} tick={{ fontFamily: 'Arial', fontSize: 10, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ fontFamily: 'Arial', fontSize: '12px' }} />
              <Bar dataKey="avg" fill="#001F91" radius={[4, 4, 0, 0]} name="Average" />
              <Bar dataKey="highest" fill="#16A34A" radius={[4, 4, 0, 0]} name="Highest" />
              <Bar dataKey="lowest" fill="#DC2626" radius={[4, 4, 0, 0]} name="Lowest" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assignment Submission */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
            ASSIGNMENT SUBMISSION RATE
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={assignmentSubmission}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9ECFF" />
              <XAxis dataKey="name" tick={{ fontFamily: 'Arial', fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontFamily: 'Arial', fontSize: 10, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ fontFamily: 'Arial', fontSize: '12px' }} />
              <Bar dataKey="submitted" fill="#0891B2" radius={[4, 4, 0, 0]} name="Submitted" />
              <Bar dataKey="total" fill="#E9ECFF" radius={[4, 4, 0, 0]} name="Total Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top Students */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} style={{ color: '#16A34A' }} />
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', letterSpacing: '0.08em' }}>TOP PERFORMING STUDENTS</span>
          </div>
          <div className="flex flex-col gap-3">
            {topStudents.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: i === 0 ? '#FBBF24' : i === 1 ? '#9CA3AF' : i === 2 ? '#D97706' : '#E9ECFF' }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '10px', color: i < 3 ? 'white' : '#001F91' }}>{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#374151' }}>{s.name}</div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#9CA3AF' }}>{s.id}</div>
                </div>
                <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '20px', color: '#16A34A' }}>{s.avg}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk Students */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: '#DC2626' }} />
            <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', letterSpacing: '0.08em' }}>AT-RISK STUDENTS</span>
          </div>
          <div className="flex flex-col gap-3">
            {atRiskStudents.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
                <div className="flex-1">
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#374151' }}>{s.name}</div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#DC2626' }}>{s.issue}</div>
                </div>
                <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '20px', color: '#DC2626' }}>{s.avg}%</div>
                <button className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#DC2626', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}>
                  ALERT
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
