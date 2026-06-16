import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface Question {
  id: number;
  courseCode: string;
  topic: string;
  question: string;
  type: 'MCQ' | 'True/False' | 'Short Answer';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
  answer: string;
}

const initialQuestions: Question[] = [
  { id: 1, courseCode: 'CSNB4122', topic: 'SDLC', question: 'Which SDLC model is also known as the linear sequential model?', type: 'MCQ', difficulty: 'Easy', options: ['Agile', 'Waterfall', 'Spiral', 'RAD'], answer: 'Waterfall' },
  { id: 2, courseCode: 'CSNB4122', topic: 'Requirements', question: 'Functional requirements describe WHAT the system should do.', type: 'True/False', difficulty: 'Easy', answer: 'True' },
  { id: 3, courseCode: 'CSNB4122', topic: 'Design', question: 'What does SOLID stand for in software design?', type: 'Short Answer', difficulty: 'Medium', answer: 'Single responsibility, Open/Closed, Liskov substitution, Interface segregation, Dependency inversion' },
  { id: 4, courseCode: 'CSNB3385', topic: 'Network Security', question: 'What type of attack intercepts communications between two parties?', type: 'MCQ', difficulty: 'Medium', options: ['DDoS', 'Phishing', 'Man-in-the-Middle', 'SQL Injection'], answer: 'Man-in-the-Middle' },
  { id: 5, courseCode: 'CSNB3385', topic: 'Cryptography', question: 'AES is a symmetric encryption algorithm.', type: 'True/False', difficulty: 'Easy', answer: 'True' },
  { id: 6, courseCode: 'CSNB3511', topic: 'OOP', question: 'Which OOP principle allows a class to have multiple forms?', type: 'MCQ', difficulty: 'Medium', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], answer: 'Polymorphism' },
  { id: 7, courseCode: 'CSNB4532', topic: 'Data Visualization', question: 'Which chart type is best for showing trend over time?', type: 'MCQ', difficulty: 'Easy', options: ['Pie Chart', 'Bar Chart', 'Line Chart', 'Scatter Plot'], answer: 'Line Chart' },
  { id: 8, courseCode: 'CSNB2441', topic: 'Numerical Methods', question: 'Explain the bisection method for finding roots.', type: 'Short Answer', difficulty: 'Hard', answer: 'A root-finding method that repeatedly bisects an interval and selects a subinterval where the root must lie.' },
];

const difficultyColor: Record<string, string> = { Easy: '#16A34A', Medium: '#D97706', Hard: '#DC2626' };
const typeColor: Record<string, string> = { MCQ: '#001F91', 'True/False': '#0891B2', 'Short Answer': '#7C3AED' };
const courseCodes = ['ALL', 'CSNB4122', 'CSNB3385', 'CSNB3511', 'CSNB4532', 'CSNB2441'];

export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [filterCourse, setFilterCourse] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingQ, setEditingQ] = useState<Question | null>(null);
  const [form, setForm] = useState({ courseCode: 'CSNB4122', topic: '', question: '', type: 'MCQ' as Question['type'], difficulty: 'Medium' as Question['difficulty'], answer: '' });
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = questions.filter((q) =>
    (filterCourse === 'ALL' || q.courseCode === filterCourse) &&
    (filterType === 'ALL' || q.type === filterType) &&
    (q.question.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase()))
  );

  function handleDelete(id: number) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function handleEdit(q: Question) {
    setEditingQ(q);
    setForm({ courseCode: q.courseCode, topic: q.topic, question: q.question, type: q.type, difficulty: q.difficulty, answer: q.answer });
    setShowModal(true);
  }

  function handleSave() {
    if (editingQ) {
      setQuestions((prev) => prev.map((q) => (q.id === editingQ.id ? { ...q, ...form } : q)));
    } else {
      setQuestions((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
    setEditingQ(null);
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-4">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
          QUESTION BANK
        </div>
        <button
          onClick={() => { setEditingQ(null); setForm({ courseCode: 'CSNB4122', topic: '', question: '', type: 'MCQ', difficulty: 'Medium', answer: '' }); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white"
          style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
        >
          <Plus size={16} /> ADD QUESTION
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white">
          <Search size={16} color="#6B7280" />
          <input
            className="flex-1 outline-none"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }}
          />
        </div>
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#001F91', fontWeight: 'bold' }}>
          {courseCodes.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#001F91', fontWeight: 'bold' }}>
          {['ALL', 'MCQ', 'True/False', 'Short Answer'].map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((q, i) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              className="w-full flex items-start gap-4 px-6 py-4 text-left"
              onClick={() => setExpanded(expanded === q.id ? null : q.id)}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#E9ECFF' }}>
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '11px', color: '#001F91' }}>{i + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: typeColor[q.type], fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 'bold' }}>{q.type}</span>
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: difficultyColor[q.difficulty], fontFamily: 'Arial, sans-serif', fontSize: '10px', fontWeight: 'bold' }}>{q.difficulty}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#6B7280' }}>{q.courseCode} · {q.topic}</span>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151' }}>{q.question}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={(e) => { e.stopPropagation(); handleEdit(q); }} className="p-1.5 rounded" style={{ color: '#001F91' }}><Edit2 size={14} /></button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }} className="p-1.5 rounded" style={{ color: '#DC2626' }}><Trash2 size={14} /></button>
              </div>
            </button>
            {expanded === q.id && (
              <div className="px-16 pb-4" style={{ borderTop: '1px solid #E9ECFF', backgroundColor: '#F8F9FF' }}>
                {q.options && (
                  <div className="pt-3 flex flex-col gap-1">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', backgroundColor: opt === q.answer ? '#001F91' : 'white', color: opt === q.answer ? 'white' : '#374151' }}>
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: opt === q.answer ? '#001F91' : '#374151', fontWeight: opt === q.answer ? 'bold' : 'normal' }}>{opt}</span>
                        {opt === q.answer && <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#16A34A', fontWeight: 'bold' }}>✓ CORRECT</span>}
                      </div>
                    ))}
                  </div>
                )}
                {!q.options && (
                  <div className="pt-3">
                    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#16A34A' }}>ANSWER: </span>
                    <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151' }}>{q.answer}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#6B7280' }}>No questions found.</div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '28px', color: '#001F91', marginBottom: '20px' }}>
              {editingQ ? 'EDIT QUESTION' : 'ADD QUESTION'}
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'COURSE', key: 'courseCode', type: 'select', options: courseCodes.filter((c) => c !== 'ALL') },
                { label: 'TOPIC', key: 'topic', type: 'text' },
                { label: 'QUESTION', key: 'question', type: 'textarea' },
                { label: 'TYPE', key: 'type', type: 'select', options: ['MCQ', 'True/False', 'Short Answer'] },
                { label: 'DIFFICULTY', key: 'difficulty', type: 'select', options: ['Easy', 'Medium', 'Hard'] },
                { label: 'ANSWER', key: 'answer', type: 'text' },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
                      {field.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" rows={3} value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
                  ) : (
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(form as any)[field.key]} onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
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
