import logoImg from '../../imports/logo.png';
import { ImageWithFallback } from './Instructor/ImageWithFallback';

type InstructorView =
  | "dashboard"
  | "manage-courses"
  | "manage-modules"
  | "manage-lessons"
  | "question-bank"
  | "create-quiz"
  | "manage-assignments"
  | "analytics"
  | "ai-summary"
  | "profile";

interface HeaderProps {
  currentView: InstructorView;
  onNavigate: (view: InstructorView) => void;
  userName: string;
  userId: string;
}

export type { InstructorView };

export function Header({
  currentView,
  onNavigate,
  userName,
  userId,
}: HeaderProps) {
  const navItems: { id: InstructorView; label: string }[] = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "manage-courses", label: "MANAGE COURSES" },
    { id: "manage-modules", label: "MANAGE MODULES" },
    { id: "manage-lessons", label: "MANAGE LESSONS" },
    { id: "question-bank", label: "QUESTION BANK" },
    { id: "create-quiz", label: "QUIZ" },
    { id: "manage-assignments", label: "ASSIGNMENTS" },
    { id: "analytics", label: "ANALYTICS" },
    { id: "ai-summary", label: "AI SUMMARY" },
  ];

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="flex items-stretch justify-between">
        {/* Logo Section */}
        <div
          style={{ backgroundColor: "#001F91" }}
          className="flex items-center cursor-pointer shrink-0"
          onClick={() => onNavigate("dashboard")}
        >
          <ImageWithFallback
            src={logoImg}
            alt="Learnify Logo"
            style={{
              height: "90px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Right: profile */}
        <div className="flex items-center ml-auto px-8">
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-4"
          >
            <div className="text-right">
              <div
                style={{
                  fontFamily: "Impact, sans-serif",
                  fontSize: "24px",
                  color: "#001F91",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                WELCOME, {userName.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12px",
                  color: "#001F91",
                  fontWeight: "bold",
                }}
              >
                {userId}
              </div>
            </div>
            <div
              className="flex items-center justify-center flex-shrink-0 rounded-full"
              style={{
                backgroundColor: "#001F91",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                color: "#FFFFFF",
                fontWeight: "bold",
                width: "56px",
                height: "56px",
                border: "2px solid #001F91",
              }}
            >
              {userName}
            </div>
          </button>
        </div>
      </div>

      {/* Nav bar */}
      <div
        style={{
          backgroundColor: "#F5F7FF",
          borderTop: "1px solid #D0D8FF",
        }}
        className="px-6 py-2 flex gap-5 overflow-x-auto"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "13px",
              color:
                currentView === item.id ? "#001F91" : "#4A5C99",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              borderBottom:
                currentView === item.id
                  ? "4px solid #001F91"
                  : "4px solid transparent",
              paddingBottom: "8px",
              paddingTop: "4px",
            }}
            className="hover:opacity-70 transition-opacity flex-shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}