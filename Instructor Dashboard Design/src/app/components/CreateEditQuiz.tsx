import { useState } from 'react';
import { Plus, Trash2, Clock, CheckSquare } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  points: number;
}

interface Quiz {
  id: number;
  courseCode: string;
  title: string;
  duration: number;
  totalPoints: number;
  status: 'Draft' | 'Published' | 'Closed';
  dueDate: string;
  attempts: number;
}

const existingQuizzes: Quiz[] = [
  { id: 1, courseCode: 'CSNB4122', title: 'Quiz 1 - SDLC Fundamentals', duration: 30, totalPoints: 20, status: 'Closed', dueDate: '2026-05-10', attempts: 38 },
  { id: 2, courseCode: 'CSNB4122', title: 'Quiz 2 - Requirements Engineering', duration: 45, totalPoints: 30, status: 'Closed', dueDate: '2026-05-24', attempts: 40 },
  { id: 3, courseCode: 'CSNB4122', title: 'Quiz 3 - Software Design', duration: 45, totalPoints: 30, status: 'Published', dueDate: '2026-06-07', attempts: 18 },
 ]; 

const statusColor: Record<string, string> = { Draft: '#D97706', Published: '#16A34A', Closed: '#6B7280' };

const defaultQuestions: QuizQuestion[] = [
  { id: 1, question: 'Which phase comes first in the Waterfall model?', options: ['Design', 'Testing', 'Requirements', 'Coding'], answer: 'Requirements', points: 5 },
  { id: 2, question: 'What does UML stand for?', options: ['Unified Modeling Language', 'Universal Markup Language', 'Unique Method Logic', 'Unified Module Library'], answer: 'Unified Modeling Language', points: 5 },
];

export function CreateEditQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(existingQuizzes);
  const [mode, setMode] = useState<'list' | 'create'>('list');
  const [questions, setQuestions] = useState<QuizQuestion[]>(defaultQuestions);
  const [quizForm, setQuizForm] = useState({ courseCode: 'CSNB4122', title: '', duration: 30, dueDate: '2026-06-15', status: 'Draft' as Quiz['status'] });
  const [newQ, setNewQ] = useState({ question: '', options: ['', '', '', ''], answer: '', points: 5 });

  function addQuestion() {
    if (!newQ.question || !newQ.answer) return;
    setQuestions((prev) => [...prev, { id: Date.now(), ...newQ }]);
    setNewQ({ question: '', options: ['', '', '', ''], answer: '', points: 5 });
  }

  function removeQuestion(id: number) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }

  function publishQuiz() {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    setQuizzes((prev) => [...prev, { id: Date.now(), ...quizForm, totalPoints, attempts: 0 }]);
    setMode('list');
  }

  function deleteQuiz(id: number) {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  }

  if (mode === 'create') {
    return (
      <div className="px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
            CREATE QUIZ
          </div>
          <button onClick={() => setMode('list')} className="px-4 py-2 rounded-lg border" style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
            ← BACK TO LIST
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Quiz settings */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm p-6 h-fit">
            <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
              QUIZ SETTINGS
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'COURSE', key: 'courseCode', type: 'select', options: ['CSNB4122', 'CSNB3385', 'CSNB3511', 'CSNB4532', 'CSNB2441'] },
                { label: 'QUIZ TITLE', key: 'title', type: 'text' },
                { label: 'DURATION (min)', key: 'duration', type: 'number' },
                { label: 'DUE DATE', key: 'dueDate', type: 'date' },
                { label: 'STATUS', key: 'status', type: 'select', options: ['Draft', 'Published'] },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 'bold', color: '#001F91' }}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(quizForm as any)[f.key]} onChange={(e) => setQuizForm((q) => ({ ...q, [f.key]: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }}>
                      {f.options!.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={(quizForm as any)[f.key]} onChange={(e) => setQuizForm((q) => ({ ...q, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }} />
                  )}
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#6B7280' }}>
                  Total Questions: <strong style={{ color: '#001F91' }}>{questions.length}</strong>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#6B7280' }}>
                  Total Points: <strong style={{ color: '#001F91' }}>{questions.reduce((s, q) => s + q.points, 0)}</strong>
                </div>
              </div>
              <button onClick={publishQuiz} className="w-full py-2.5 rounded-lg text-white" style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                SAVE QUIZ
              </button>
            </div>
          </div>

          {/* Questions */}
          <div className="col-span-2 flex flex-col gap-4">
            {questions.map((q, i) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-start justify-between mb-2">
                  <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}>Question {i + 1}</div>
                  <div className="flex items-center gap-3">
                    <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#6B7280' }}>{q.points} pts</span>
                    <button onClick={() => removeQuestion(q.id)} style={{ color: '#DC2626' }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151', marginBottom: '8px' }}>{q.question}</div>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: opt === q.answer ? '#E9ECFF' : '#F8F9FF', border: opt === q.answer ? '1px solid #001F91' : '1px solid #E5E7EB' }}>
                      <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: opt === q.answer ? '#001F91' : '#374151', fontWeight: opt === q.answer ? 'bold' : 'normal' }}>{String.fromCharCode(65 + oi)}. {opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add question form */}
            <div className="bg-white rounded-xl shadow-sm p-5 border-2 border-dashed" style={{ borderColor: '#001F91' }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91', marginBottom: '12px' }}>ADD NEW QUESTION</div>
              <div className="flex flex-col gap-3">
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Enter question..." value={newQ.question} onChange={(e) => setNewQ((q) => ({ ...q, question: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }} />
                <div className="grid grid-cols-2 gap-2">
                  {newQ.options.map((opt, oi) => (
                    <input key={oi} className="border border-gray-300 rounded-lg px-3 py-2" placeholder={`Option ${String.fromCharCode(65 + oi)}`} value={opt} onChange={(e) => setNewQ((q) => { const opts = [...q.options]; opts[oi] = e.target.value; return { ...q, options: opts }; })} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <input className="flex-1 border border-gray-300 rounded-lg px-3 py-2" placeholder="Correct answer..." value={newQ.answer} onChange={(e) => setNewQ((q) => ({ ...q, answer: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }} />
                  <input type="number" className="w-20 border border-gray-300 rounded-lg px-3 py-2" value={newQ.points} onChange={(e) => setNewQ((q) => ({ ...q, points: Number(e.target.value) }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px' }} />
                  <button onClick={addQuestion} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                    <Plus size={14} /> ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
          MANAGE QUIZZES
        </div>
        <button onClick={() => setMode('create')} className="flex items-center gap-2 px-5 py-2 rounded-lg text-white" style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
          <Plus size={16} /> CREATE QUIZ
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#001F91' }}>
              {['COURSE', 'QUIZ TITLE', 'DURATION', 'POINTS', 'DUE DATE', 'ATTEMPTS', 'STATUS', 'ACTIONS'].map((h) => (
                <th key={h} className="px-5 py-3 text-left" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '11px', color: '#FFFFFF', letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, i) => (
              <tr key={quiz.id} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8F9FF', borderBottom: '1px solid #E9ECFF' }}>
                <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#001F91' }}>{quiz.courseCode}</td>
                <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151' }}>{quiz.title}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}><Clock size={12} /> {quiz.duration} min</span>
                </td>
                <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>{quiz.totalPoints}</td>
                <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}>{quiz.dueDate}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1" style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#374151' }}><CheckSquare size={12} /> {quiz.attempts}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: statusColor[quiz.status], fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}>{quiz.status}</span>
                </td>
                <td className="px-5 py-3">
                  <button onClick={() => deleteQuiz(quiz.id)} style={{ color: '#DC2626' }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
