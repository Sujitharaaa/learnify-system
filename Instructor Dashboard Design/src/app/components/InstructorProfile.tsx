import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Edit2, Save, X } from 'lucide-react';

interface InstructorProfileProps {
  userName: string;
  userId: string;
}

export function InstructorProfile({ userName, userId }: InstructorProfileProps) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'FARAH',
    lastName: 'BINTI M AZAM',
    email: 'farah.mazam@learnify.edu.my',
    department: 'Faculty of Computer Science & IT',
    position: 'Senior Lecturer',
    phone: '+60 12-345 6789',
    office: 'Block A, Room 302',
    specialization: 'Software Engineering, System Analysis',
    bio: 'Dr. Farah Binti M Azam is a Senior Lecturer with over 15 years of experience in software engineering education. She is passionate about innovative teaching methods and integrating real-world industry practices into the curriculum.',
  });
  const [draft, setDraft] = useState(profile);

  const myCourses = [
    { code: 'CSNB4122', title: 'Software Engineering Fundamentals', students: 42, semester: '2/2025' },
    { code: 'CSNB3385', title: 'Cybersecurity', students: 38, semester: '2/2025' },
    { code: 'CSNB3511', title: 'OOAD', students: 35, semester: '2/2025' },
    { code: 'CSNB4532', title: 'Data Analytics', students: 50, semester: '2/2025' },
    { code: 'CSNB2441', title: 'Computational Method', students: 29, semester: '2/2025' },
  ];

  function handleSave() {
    setProfile(draft);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(profile);
    setEditing(false);
  }

  const Field = ({ label, value, fieldKey }: { label: string; value: string; fieldKey: keyof typeof draft }) => (
    <div>
      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#6B7280', marginBottom: '4px' }}>{label}</div>
      {editing ? (
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          value={draft[fieldKey]}
          onChange={(e) => setDraft((d) => ({ ...d, [fieldKey]: e.target.value }))}
          style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151' }}
        />
      ) : (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#374151' }}>{value}</div>
      )}
    </div>
  );

  return (
    <div className="px-12 py-8 max-w-5xl">
      {/* Profile card */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7B8DB0', fontFamily: 'Arial, sans-serif', fontSize: '36px', color: '#FFFFFF', fontWeight: 'bold' }}>
              F.
            </div>
            <div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '28px', color: '#001F91' }}>
                {profile.firstName} {profile.lastName}
              </div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#6B7280' }}>
                {profile.position} · {profile.department}
              </div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#9CA3AF', marginTop: '4px' }}>
                <strong>LAST ACCESS</strong> Thursday 4 June 2026
              </div>
            </div>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: '#001F91', color: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
              <Edit2 size={14} /> EDIT PROFILE
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#16A34A', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                <Save size={14} /> SAVE
              </button>
              <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: '#DC2626', color: '#DC2626', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}>
                <X size={14} /> CANCEL
              </button>
            </div>
          )}
        </div>

        <Tabs.Root defaultValue="about" className="w-full">
          <Tabs.List className="flex gap-6 border-b-2 border-gray-200 mb-6">
            {[
              { value: 'about', label: 'ABOUT ME' },
              { value: 'courses', label: 'MY COURSES' },
              { value: 'more', label: 'MORE DETAILS' },
            ].map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 'bold', color: '#001F91', paddingBottom: '8px', letterSpacing: '0.05em' }}
                className="data-[state=active]:border-b-4 data-[state=active]:border-[#001F91] hover:opacity-70"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="about">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Field label="First Name" value={profile.firstName} fieldKey="firstName" />
              <Field label="Last Name" value={profile.lastName} fieldKey="lastName" />
              <Field label="Email Address" value={profile.email} fieldKey="email" />
              <Field label="Phone Number" value={profile.phone} fieldKey="phone" />
              <Field label="Position" value={profile.position} fieldKey="position" />
              <Field label="Office Location" value={profile.office} fieldKey="office" />
              <div className="col-span-2">
                <Field label="Specialization" value={profile.specialization} fieldKey="specialization" />
              </div>
              <div className="col-span-2">
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#6B7280', marginBottom: '4px' }}>BIO</div>
                {editing ? (
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    rows={4}
                    value={draft.bio}
                    onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151' }}
                  />
                ) : (
                  <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>{profile.bio}</div>
                )}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="courses">
            <div className="flex flex-col gap-3">
              {myCourses.map((c) => (
                <div key={c.code} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#F5F7FF', border: '1px solid #E9ECFF' }}>
                  <div>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91' }}>{c.code}</div>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151' }}>{c.title}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#6B7280' }}>{c.students} Students</div>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#9CA3AF' }}>Sem {c.semester}</div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="more">
            <div className="grid grid-cols-2 gap-6">
              <Field label="Department" value={profile.department} fieldKey="department" />
              <div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#6B7280', marginBottom: '4px' }}>Staff ID</div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#374151' }}>{userId}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#6B7280', marginBottom: '4px' }}>Years of Service</div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#374151' }}>15 Years</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#6B7280', marginBottom: '4px' }}>Academic Rank</div>
                <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '15px', color: '#374151' }}>Associate Professor</div>
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
