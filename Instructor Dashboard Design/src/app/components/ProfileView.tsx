import * as Tabs from '@radix-ui/react-tabs';

interface ProfileViewProps {
  userName: string;
  lastName: string;
  email: string;
  department: string;
}

export function ProfileView({ userName, lastName, email, department }: ProfileViewProps) {
  return (
    <div className="px-16 py-12">
      <div className="bg-white rounded-lg p-12 mb-8">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center" style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '48px',
            color: '#FFFFFF',
            fontWeight: 'bold'
          }}>
            A.
          </div>
          <div>
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '4px'
            }}>
              {userName.toUpperCase()}.
            </div>
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              color: '#000000'
            }}>
              <span style={{ fontWeight: 'bold' }}>LAST ACCESS</span> Thursday 4 June 2026
            </div>
          </div>
        </div>

        <Tabs.Root defaultValue="about" className="w-full">
          <Tabs.List className="flex gap-8 border-b-2 border-gray-300 mb-8">
            {['ABOUT ME', 'COURSES', 'MORE DETAILS'].map((tab) => (
              <Tabs.Trigger
                key={tab}
                value={tab.toLowerCase().replace(' ', '-')}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#001F91',
                  paddingBottom: '8px'
                }}
                className="data-[state=active]:border-b-4 data-[state=active]:border-blue-800 hover:opacity-70"
              >
                {tab}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="about" className="py-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  First Name
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  color: '#000000'
                }}>
                  {userName.toUpperCase()}
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Last Name
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  color: '#000000'
                }}>
                  {lastName}
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Email Address
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  color: '#000000'
                }}>
                  {email}
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '8px'
                }}>
                  Department
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '18px',
                  color: '#000000'
                }}>
                  {department}
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="courses">
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
              color: '#666666'
            }}>
              Course list will be displayed here.
            </div>
          </Tabs.Content>

          <Tabs.Content value="more-details">
            <div style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '18px',
              color: '#666666'
            }}>
              Additional details will be displayed here.
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
