import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Users, Calendar } from 'lucide-react';

interface Assignment {
  id: number;
  courseCode: string;
  title: string;
  type: 'Individual' | 'Group';
  dueDate: string;
  totalPoints: number;
  submitted: number;
  total: number;
  status: 'Draft' | 'Active' | 'Closed';
}

const initialAssignments: Assignment[] = [
  { id: 1, courseCode: 'CSNB4122', title: 'Assignment 1 - Requirements Document', type: 'Individual', dueDate: '2026-04-30', totalPoints: 30, submitted: 40, total: 42, status: 'Closed' },
  { id: 2, courseCode: 'CSNB4122', title: 'Assignment 2 - System Design Report', type: 'Group', dueDate: '2026-05-28', totalPoints: 40, submitted: 38, total: 42, status: 'Closed' },
  { id: 3, courseCode: 'CSNB4122', title: 'Assignment 3 - Testing Plan', type: 'Individual', dueDate: '2026-06-20', totalPoints: 30, submitted: 5, total: 42, status: 'Active' },
  { id: 4, courseCode: 'CSNB3385', title: 'Assignment 1 - Security Audit Report', type: 'Group', dueDate: '2026-05-15', totalPoints: 50, submitted: 37, total: 38, status: 'Closed' },
  { id: 5, courseCode: 'CSNB3385', title: 'Assignment 2 - Penetration Testing Lab', type: 'Individual', dueDate: '2026-06-10', totalPoints: 50, submitted: 12, total: 38, status: 'Active' },
  { id: 6, courseCode: 'CSNB3511', title: 'Assignment 1 - UML Case Study', type: 'Group', dueDate: '2026-06-15', totalPoints: 40, submitted: 0, total: 35, status: 'Active' },
  { id: 7, courseCode: 'CSNB4532', title: 'Assignment 1 - Data Analysis Project', type: 'Individual', dueDate: '2026-06-08', totalPoints: 60, submitted: 30, total: 50, status: 'Active' },
  { id: 8, courseCode: 'CSNB2441', title: 'Assignment 1 - Numerical Calculations', type: 'Individual', dueDate: '2026-06-25', totalPoints: 30, submitted: 0, total: 29, status: 'Draft' },
];

const statusColor: Record<string, string> = { Draft: '#D97706', Active: '#16A34A', Closed: '#6B7280' };
const typeColor: Record<string, string> = { Individual: '#001F91', Group: '#7C3AED' };
const courseCodes = ['ALL', 'CSNB4122', 'CSNB3385', 'CSNB3511', 'CSNB4532', 'CSNB2441'];

export function ManageAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [filterCourse, setFilterCourse] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editingA, setEditingA] = useState<Assignment | null>(null);
  const [form, setForm] = useState({ courseCode: 'CSNB4122', title: '', type: 'Individual' as Assignment['type'], dueDate: '2026-06-30', totalPoints: 30, total: 0, status: 'Draft' as Assignment['status'] });

  const filtered = assignments.filter((a) =>
    (filterCourse === 'ALL' || a.courseCode === filterCourse) &&
    (filterStatus === 'ALL' || a.status === filterStatus)
  );

  function handleDelete(id: number) {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  }

  function handleEdit(a: Assignment) {
    setEditingA(a);
    setForm({ courseCode: a.courseCode, title: a.title, type: a.type, dueDate: a.dueDate, totalPoints: a.totalPoints, total: a.total, status: a.status });
    setShowModal(true);
  }

  function handleSave() {
    if (editingA) {
      setAssignments((prev) => prev.map((a) => (a.id === editingA.id ? { ...a, ...form } : a)));
    } else {
      setAssignments((prev) => [...prev, { id: Date.now(), submitted: 0, ...form }]);
    }
    setShowModal(false);
    setEditingA(null);
  }

  function handleDownload(a: Assignment) {
    const rows = [
      ['Assignment Report'],
      ['Course Code', a.courseCode],
      ['Title', a.title],
      ['Type', a.type],
      ['Due Date', a.dueDate],
      ['Total Points', a.totalPoints],
      ['Status', a.status],
      [],
      ['Submission Summary'],
      ['Submitted', a.submitted],
      ['Total Students', a.total],
      ['Submission Rate', a.total > 0 ? `${Math.round((a.submitted / a.total) * 100)}%` : '0%'],
      ['Not Submitted', a.total - a.submitted],
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${a.courseCode}_${a.title.replace(/\s+/g, '_')}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const totalSubmitted = assignments.reduce((s, a) => s + a.submitted, 0);
  const totalStudents = assignments.reduce((s, a) => s + a.total, 0);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-4">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
          MANAGE ASSIGNMENTS
        </div>
        <button
          onClick={() => { setEditingA(null); setForm({ courseCode: 'CSNB4122', title: '', type: 'Individual', dueDate: '2026-06-30', totalPoints: 30, total: 0, status: 'Draft' }); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white"
          style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
        >
          <Plus size={16} /> ADD ASSIGNMENT
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'TOTAL ASSIGNMENTS', value: assignments.length, color: '#001F91' },
          { label: 'SUBMISSIONS RECEIVED', value: totalSubmitted, color: '#16A34A' },
          { label: 'ACTIVE ASSIGNMENTS', value: assignments.filter((a) => a.status === 'Active').length, color: '#D97706' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', color: '#6B7280', letterSpacing: '0.08em' }}>{s.label}</div>
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '40px', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#001F91', fontWeight: 'bold' }}>
          {courseCodes.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#001F91', fontWeight: 'bold' }}>
          {['ALL', 'Draft', 'Active', 'Closed'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((a) => (
          <div key={a.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}>{a.courseCode}</span>
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: typeColor[a.type], fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 'bold' }}>{a.type}</span>
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: statusColor[a.status], fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 'bold' }}>{a.status}</span>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#374151', marginBottom: '8px' }}>{a.title}</div>
                <div className="flex gap-5" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#6B7280' }}>
                  <span className="flex items-center gap-1"><Calendar size={13} /> Due: {a.dueDate}</span>
                  <span className="flex items-center gap-1"><Users size={13} /> {a.submitted}/{a.total} submitted</span>
                  <span>{a.totalPoints} pts</span>
                </div>
                {/* Submission progress */}
                <div className="mt-3 w-64">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: a.total > 0 ? `${(a.submitted / a.total) * 100}%` : '0%', backgroundColor: '#001F91' }} />
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
                    {a.total > 0 ? Math.round((a.submitted / a.total) * 100) : 0}% submission rate
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleDownload(a)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#0891B2', color: '#0891B2', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}>
                  <Download size={13} /> DOWNLOAD
                </button>
                <button onClick={() => handleEdit(a)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}>
                  <Edit2 size={13} /> EDIT
                </button>
                <button onClick={() => handleDelete(a.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#DC2626', color: '#DC2626', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '28px', color: '#001F91', marginBottom: '20px' }}>
              {editingA ? 'EDIT ASSIGNMENT' : 'ADD ASSIGNMENT'}
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'COURSE', key: 'courseCode', type: 'select', options: courseCodes.filter((c) => c !== 'ALL') },
                { label: 'TITLE', key: 'title', type: 'text' },
                { label: 'TYPE', key: 'type', type: 'select', options: ['Individual', 'Group'] },
                { label: 'DUE DATE', key: 'dueDate', type: 'date' },
                { label: 'TOTAL POINTS', key: 'totalPoints', type: 'number' },
                { label: 'TOTAL STUDENTS', key: 'total', type: 'number' },
                { label: 'STATUS', key: 'status', type: 'select', options: ['Draft', 'Active', 'Closed'] },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
                      {field.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={field.type} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2 rounded-lg text-white" style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>SAVE</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-lg border" style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}