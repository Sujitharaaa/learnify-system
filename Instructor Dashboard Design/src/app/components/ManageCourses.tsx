import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';

interface Course {
  id: number;
  code: string;
  title: string;
  students: number;
  modules: number;
  lessons: number;
  status: 'Active' | 'Draft' | 'Archived';
  colorScheme: 'blue' | 'orange' | 'yellow';
}

const initialCourses: Course[] = [
  { id: 1, code: 'CSNB4122', title: 'SOFTWARE ENGINEERING FUNDAMENTALS', students: 42, modules: 8, lessons: 30, status: 'Active', colorScheme: 'blue' },
];

const colorBars: Record<string, string> = {
  blue: 'linear-gradient(135deg, #60A5FA, #3B82F6, #14B8A6)',
  orange: 'linear-gradient(135deg, #FB923C, #EC4899, #A855F7)',
  yellow: 'linear-gradient(135deg, #374151, #FBBF24, #FDE68A)',
};

const statusColor: Record<string, string> = {
  Active: '#16A34A',
  Draft: '#D97706',
  Archived: '#6B7280',
};

export function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState({ code: '', title: '', status: 'Active' as Course['status'] });

  const hasReachedLimit = courses.length >= 1;

  function handleDelete(id: number) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function handleEdit(course: Course) {
    setEditingCourse(course);
    setForm({ code: course.code, title: course.title, status: course.status });
    setShowModal(true);
  }

  function handleSave() {
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...form } : c))
      );
    } else {
      setCourses((prev) => [
        ...prev,
        {
          id: Date.now(),
          code: form.code,
          title: form.title,
          students: 0,
          modules: 0,
          lessons: 0,
          status: form.status,
          colorScheme: 'blue',
        },
      ]);
    }
    setShowModal(false);
    setEditingCourse(null);
    setForm({ code: '', title: '', status: 'Active' });
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div
          style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}
        >MANAGE COURSES</div>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={() => { if (!hasReachedLimit) { setEditingCourse(null); setForm({ code: '', title: '', status: 'Active' }); setShowModal(true); } }}
            disabled={hasReachedLimit}
            className="flex items-center gap-2 px-5 py-3 rounded-lg text-white"
            style={{
              backgroundColor: hasReachedLimit ? '#9CA3AF' : '#001F91',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '13px',
              letterSpacing: '0.08em',
              cursor: hasReachedLimit ? 'not-allowed' : 'pointer',
            }}
          >
            <Plus size={16} /> ADD COURSE
          </button>
          {hasReachedLimit && (
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#DC2626' }}>
              Delete your current course to add a new one.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-20" style={{ background: colorBars[course.colorScheme] }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91', letterSpacing: '0.08em' }}>
                    {course.code}
                  </div>
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#001F91' }}>
                    {course.title}
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: statusColor[course.status], fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}
                >
                  {course.status}
                </span>
              </div>
              <div className="flex gap-5 mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#6B7280' }}>
                <span className="flex items-center gap-1"><Users size={13} /> {course.students} Students</span>
                <span>{course.modules} Modules</span>
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}
                >
                  <Edit2 size={13} /> EDIT
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: '#0891B2', color: '#0891B2', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}
                >
                  <Eye size={13} /> VIEW
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ml-auto"
                  style={{ borderColor: '#DC2626', color: '#DC2626', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold' }}
                >
                  <Trash2 size={13} /> DELETE
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
              {editingCourse ? 'EDIT COURSE' : 'ADD COURSE'}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>COURSE CODE</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>COURSE TITLE</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>STATUS</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Course['status'] }))}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 rounded-lg text-white"
                style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
              >
                SAVE
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border"
                style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}