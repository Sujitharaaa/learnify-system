import * as Progress from '@radix-ui/react-progress';

interface CourseCardProps {
  code: string;
  title: string;
  instructor: string;
  completed: number;
  total: number;
  colorScheme: 'blue' | 'orange' | 'yellow';
}

export function CourseCard({ code, title, instructor, completed, total, colorScheme }: CourseCardProps) {
  const percentage = Math.round((completed / total) * 100);

  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-400 via-blue-500 to-teal-400',
    orange: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500',
    yellow: 'bg-gradient-to-br from-gray-700 via-yellow-400 to-yellow-300'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className={`h-32 ${colorClasses[colorScheme]} relative`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            60deg,
            transparent,
            transparent 35px,
            rgba(255,255,255,.1) 35px,
            rgba(255,255,255,.1) 70px
          )`
        }}></div>
      </div>
      <div className="p-6">
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '0.13em',
          color: '#001F91',
          fontSize: '16px',
          marginBottom: '4px'
        }}>
          {code}
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '0.13em',
          color: '#001F91',
          fontSize: '20px',
          marginBottom: '12px'
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          color: '#001F91',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          {instructor}
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          color: '#001F91',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          {completed} out of {total} completed
        </div>
        <Progress.Root
          className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2 mb-2"
          style={{ transform: 'translateZ(0)' }}
          value={percentage}
        >
          <Progress.Indicator
            className="bg-green-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        </Progress.Root>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          color: '#001F91',
          fontSize: '14px'
        }}>
          {percentage}% Course Completed
        </div>
      </div>
    </div>
  );
}
