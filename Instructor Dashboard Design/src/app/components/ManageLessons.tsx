import { useState } from 'react';
import { Plus, Edit2, Trash2, Video, FileText, Link } from 'lucide-react';

interface Lesson {
  id: number;
  courseCode: string;
  module: string;
  lessonNo: number;
  title: string;
  type: 'Video' | 'Document' | 'Link';
  duration: string;
  status: 'Published' | 'Draft';
}

const initialLessons: Lesson[] = [
  { id: 1, courseCode: 'CSNB4122', module: 'Module 1', lessonNo: 1, title: 'What is Software Engineering?', type: 'Video', duration: '12 min', status: 'Published' },
  { id: 2, courseCode: 'CSNB4122', module: 'Module 1', lessonNo: 2, title: 'History of Software Development', type: 'Document', duration: '8 min', status: 'Published' },
  { id: 3, courseCode: 'CSNB4122', module: 'Module 1', lessonNo: 3, title: 'SDLC Models Overview', type: 'Video', duration: '20 min', status: 'Published' },
  { id: 4, courseCode: 'CSNB4122', module: 'Module 2', lessonNo: 1, title: 'Gathering Requirements', type: 'Video', duration: '15 min', status: 'Published' },
  { id: 5, courseCode: 'CSNB4122', module: 'Module 2', lessonNo: 2, title: 'Use Case Diagrams', type: 'Document', duration: '10 min', status: 'Published' },
  { id: 6, courseCode: 'CSNB4122', module: 'Module 2', lessonNo: 3, title: 'User Stories', type: 'Link', duration: '8 min', status: 'Published' },
  { id: 7, courseCode: 'CSNB4122', module: 'Module 3', lessonNo: 1, title: 'SOLID Principles', type: 'Video', duration: '18 min', status: 'Published' },
  { id: 8, courseCode: 'CSNB4122', module: 'Module 3', lessonNo: 2, title: 'Design Patterns Introduction', type: 'Video', duration: '22 min', status: 'Published' },
  { id: 9, courseCode: 'CSNB4122', module: 'Module 3', lessonNo: 3, title: 'Refactoring Techniques', type: 'Document', duration: '14 min', status: 'Published' },
  { id: 10, courseCode: 'CSNB4122', module: 'Module 3', lessonNo: 4, title: 'Code Review Best Practices', type: 'Link', duration: '10 min', status: 'Draft' },
];

const typeIcon: Record<string, React.ReactNode> = {
  Video: <Video size={14} />,
  Document: <FileText size={14} />,
  Link: <Link size={14} />,
};

const typeColor: Record<string, string> = {
  Video: '#7C3AED',
  Document: '#0891B2',
  Link: '#16A34A',
};

const courseCodes = ['CSNB4122'];

export function ManageLessons() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [form, setForm] = useState({ courseCode: 'CSNB4122', module: 'Module 1', lessonNo: 1, title: '', type: 'Video' as Lesson['type'], duration: '', status: 'Draft' as Lesson['status'] });

  const filtered = lessons;

  function handleDelete(id: number) {
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }

  function handleEdit(lesson: Lesson) {
    setEditingLesson(lesson);
    setForm({ courseCode: lesson.courseCode, module: lesson.module, lessonNo: lesson.lessonNo, title: lesson.title, type: lesson.type, duration: lesson.duration, status: lesson.status });
    setShowModal(true);
  }

  function handleSave() {
    if (editingLesson) {
      setLessons((prev) => prev.map((l) => (l.id === editingLesson.id ? { ...l, ...form } : l)));
    } else {
      setLessons((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
    setEditingLesson(null);
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
          MANAGE LESSONS
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditingLesson(null); setForm({ courseCode: 'CSNB4122', module: 'Module 1', lessonNo: 1, title: '', type: 'Video', duration: '', status: 'Draft' }); setShowModal(true); }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
          >
            <Plus size={16} /> ADD LESSON
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#001F91' }}>
              {['COURSE', 'MODULE', 'LESSON', 'TITLE', 'TYPE', 'DURATION', 'STATUS', 'ACTIONS'].map((h) => (
                <th key={h} className="px-4 py-3 text-left" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '11px', color: '#FFFFFF', letterSpacing: '0.08em' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lesson, i) => (
              <tr key={lesson.id} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8F9FF', borderBottom: '1px solid #E9ECFF' }}>
                <td className="px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#001F91' }}>{lesson.courseCode}</td>
                <td className="px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>{lesson.module}</td>
                <td className="px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>Lesson {lesson.lessonNo}</td>
                <td className="px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151', maxWidth: '200px' }}>{lesson.title}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-white w-fit" style={{ backgroundColor: typeColor[lesson.type], fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}>
                    {typeIcon[lesson.type]} {lesson.type}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>{lesson.duration}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: lesson.status === 'Published' ? '#16A34A' : '#D97706', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}>
                    {lesson.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(lesson)} className="p-1 rounded" style={{ color: '#001F91' }}><Edit2 size={13} /></button>
                    <button onClick={() => handleDelete(lesson.id)} className="p-1 rounded" style={{ color: '#DC2626' }}><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '28px', color: '#001F91', marginBottom: '20px' }}>
              {editingLesson ? 'EDIT LESSON' : 'ADD LESSON'}
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'COURSE CODE', key: 'courseCode', type: 'select', options: courseCodes },
                { label: 'MODULE', key: 'module', type: 'text' },
                { label: 'LESSON TITLE', key: 'title', type: 'text' },
                { label: 'TYPE', key: 'type', type: 'select', options: ['Video', 'Document', 'Link'] },
                { label: 'DURATION', key: 'duration', type: 'text' },
                { label: 'STATUS', key: 'status', type: 'select', options: ['Published', 'Draft'] },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                    >
                      {field.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}
                    />
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