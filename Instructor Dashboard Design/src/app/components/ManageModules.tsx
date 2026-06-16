import { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface Module {
  id: number;
  course: string;
  courseCode: string;
  moduleNo: number;
  title: string;
  lessons: number;
  status: 'Published' | 'Draft';
}

const initialModules: Module[] = [
  { id: 1, course: 'Software Engineering Fundamentals', courseCode: 'CSNB4122', moduleNo: 1, title: 'Introduction to Software Engineering', lessons: 4, status: 'Published' },
  { id: 2, course: 'Software Engineering Fundamentals', courseCode: 'CSNB4122', moduleNo: 2, title: 'Requirements Engineering', lessons: 3, status: 'Published' },
  { id: 3, course: 'Software Engineering Fundamentals', courseCode: 'CSNB4122', moduleNo: 3, title: 'Software Design Principles', lessons: 5, status: 'Published' },
];

const courseCodes = ['CSNB4122'];

export function ManageModules() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [form, setForm] = useState({ courseCode: 'CSNB4122', moduleNo: 1, title: '', status: 'Draft' as Module['status'] });
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const grouped = modules.reduce<Record<string, Module[]>>((acc, m) => {
    const key = m.courseCode;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  function handleDelete(id: number) {
    setModules((prev) => prev.filter((m) => m.id !== id));
  }

  function handleEdit(mod: Module) {
    setEditingModule(mod);
    setForm({ courseCode: mod.courseCode, moduleNo: mod.moduleNo, title: mod.title, status: mod.status });
    setShowModal(true);
  }

  function handleSave() {
    if (editingModule) {
      setModules((prev) => prev.map((m) => (m.id === editingModule.id ? { ...m, ...form } : m)));
    } else {
      setModules((prev) => [...prev, { id: Date.now(), course: form.courseCode, courseCode: form.courseCode, moduleNo: form.moduleNo, title: form.title, lessons: 0, status: form.status }]);
    }
    setShowModal(false);
    setEditingModule(null);
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '48px', color: '#001F91', letterSpacing: '0.05em' }}>
          MANAGE MODULES
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setEditingModule(null); setForm({ courseCode: 'CSNB4122', moduleNo: 1, title: '', status: 'Draft' }); setShowModal(true); }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
          >
            <Plus size={16} /> ADD MODULE
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([code, mods]) => (
          <div key={code} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-6 py-4"
              style={{ backgroundColor: '#001F91' }}
              onClick={() => setExpanded((e) => ({ ...e, [code]: !e[code] }))}
            >
              <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '15px', color: '#FFFFFF', letterSpacing: '0.08em' }}>
                {code} — {mods[0].course}
              </span>
              <div className="flex items-center gap-3">
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#A5B8FF' }}>{mods.length} modules</span>
                {expanded[code] ? <ChevronDown size={18} color="white" /> : <ChevronRight size={18} color="white" />}
              </div>
            </button>
            {(expanded[code] ?? true) && (
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#E9ECFF' }}>
                    {['MODULE NO.', 'TITLE', 'LESSONS', 'STATUS', 'ACTIONS'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#001F91', letterSpacing: '0.08em' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mods.map((mod, i) => (
                    <tr key={mod.id} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F8F9FF', borderBottom: '1px solid #E9ECFF' }}>
                      <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}>
                        Module {mod.moduleNo}
                      </td>
                      <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151' }}>
                        {mod.title}
                      </td>
                      <td className="px-5 py-3" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#374151' }}>
                        {mod.lessons}
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: mod.status === 'Published' ? '#16A34A' : '#D97706', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 'bold' }}>
                          {mod.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(mod)} className="p-1.5 rounded" style={{ color: '#001F91' }}><Edit2 size={14} /></button>
                          <button onClick={() => handleDelete(mod.id)} className="p-1.5 rounded" style={{ color: '#DC2626' }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '28px', color: '#001F91', marginBottom: '20px' }}>
              {editingModule ? 'EDIT MODULE' : 'ADD MODULE'}
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>COURSE</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={form.courseCode} onChange={(e) => setForm((f) => ({ ...f, courseCode: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
                  {courseCodes.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>MODULE NUMBER</label>
                <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={form.moduleNo} onChange={(e) => setForm((f) => ({ ...f, moduleNo: Number(e.target.value) }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>MODULE TITLE</label>
                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#001F91' }}>STATUS</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Module['status'] }))} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px' }}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
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