#include <string>
#include <vector>
#include <ctime>

// ── Role enum ────────────────────────────────────────────────
enum class Role { STUDENT, INSTRUCTOR, ADMIN };

// ── QuestionType enum ────────────────────────────────────────
enum class QuestionType { MCQ, FILL_IN_BLANK, SHORT_ANSWER };

// ── CompletionStatus enum ────────────────────────────────────
enum class CompletionStatus { IN_PROGRESS, COMPLETED, DROPPED };

// ── BadgeTier enum ────────────────────────────────────────────
enum class BadgeTier { BRONZE, SILVER, GOLD, PLATINUM };

// ============================================================
// 3.2.1  User
// ============================================================
struct User {
    std::string user_id;
    std::string full_name;
    std::string email;
    std::string password_hash;   // stored as plain for demo (bcrypt in prod)
    Role        role;
    bool        is_active;
    std::time_t created_at;
    std::time_t last_login;      // 0 = never
    int         failed_attempts; // login lockout counter
    std::time_t locked_until;    // 0 = not locked
};

// ============================================================
// 3.2.2  Course
// ============================================================
struct Course {
    std::string course_id;
    std::string course_code;
    std::string title;
    std::string description;
    std::string instructor_id;
    bool        is_published;
    std::time_t created_at;
};

// ============================================================
// Module  (referenced in Quiz FK chain)
// ============================================================
struct Module {
    std::string module_id;
    std::string course_id;
    std::string title;
    int         order_index;
    bool        is_published;
};

// ============================================================
// Lesson
// ============================================================
struct Lesson {
    std::string lesson_id;
    std::string module_id;
    std::string title;
    std::string content_type;   // "pdf", "video", "docx"
    std::string file_url;
    int         order_index;
    std::time_t uploaded_at;
};

// ============================================================
// Question_Option  (MCQ choices)
// ============================================================
struct QuestionOption {
    std::string option_id;
    std::string question_id;
    std::string option_text;
    bool        is_correct;
    int         option_order;
};

// ============================================================
// Question_Bank
// ============================================================
struct Question {
    std::string            question_id;
    std::string            quiz_id;
    std::string            question_text;
    QuestionType           question_type;
    float                  marks;
    int                    order_index;
    std::string            correct_answer;  // for fill_in_blank / short_answer
    std::vector<QuestionOption> options;    // for MCQ
};

// ============================================================
// 3.2.3  Quiz
// ============================================================
struct Quiz {
    std::string quiz_id;
    std::string module_id;
    std::string title;
    int         duration_minutes;
    int         total_questions;
    int         max_attempts;
    bool        is_published;
    std::time_t available_from;   // 0 = no restriction
    std::time_t available_until;  // 0 = no restriction
};

// ============================================================
// 3.2.4  Quiz_Attempt
// ============================================================
struct QuizAttempt {
    std::string attempt_id;
    std::string quiz_id;
    std::string student_id;
    int         attempt_number;
    std::time_t start_time;
    std::time_t submit_time;   // 0 = not submitted
    float       score;         // -1 = not graded
    float       percentage;    // -1 = not graded
    bool        is_submitted;
};

// ============================================================
// 3.3.2  Attempt_Answer
// ============================================================
struct AttemptAnswer {
    std::string answer_id;
    std::string attempt_id;
    std::string question_id;
    std::string selected_option_id;   // empty if not MCQ
    std::string text_response;        // empty if MCQ
    int         is_correct;           // 1=true, 0=false, -1=pending
    float       marks_obtained;
};

// ============================================================
// 3.3.1  Enrolment
// ============================================================
struct Enrolment {
    std::string      enrolment_id;
    std::string      student_id;
    std::string      course_id;
    std::time_t      enrol_date;
    CompletionStatus completion_status;
    std::time_t      completion_date;  // 0 = not completed
};

// ============================================================
// Progress_Tracker
// ============================================================
struct ProgressTracker {
    std::string progress_id;
    std::string student_id;
    std::string lesson_id;
    bool        is_completed;
    std::time_t completed_at;     // 0 = not completed
    int         time_spent_sec;
};

// ============================================================
// 3.2.5  AI_Recommendation
// ============================================================
struct AIRecommendation {
    std::string recommendation_id;
    std::string student_id;
    std::string course_id;
    std::string recommended_topics;
    std::string recommended_lessons;
    std::string ai_notes;
    std::string instructor_notes;
    std::time_t generated_at;
    std::string approved_by;   // instructor user_id
    bool        is_visible;
};

// ============================================================
// Learning Points
// ============================================================
struct LearningPointRecord {
    std::string record_id;
    std::string student_id;
    std::string activity_type;  // "quiz_complete","lesson_complete","streak"
    int         points_earned;
    std::string description;
    std::time_t earned_at;
};

// ── Helper: badge tier from total points ─────────────────────
inline BadgeTier getBadgeTier(int total_points) {
    if (total_points >= 1000) return BadgeTier::PLATINUM;
    if (total_points >= 500)  return BadgeTier::GOLD;
    if (total_points >= 200)  return BadgeTier::SILVER;
    return BadgeTier::BRONZE;
}

inline std::string badgeTierName(BadgeTier tier) {
    switch (tier) {
        case BadgeTier::PLATINUM: return "🏆 Platinum";
        case BadgeTier::GOLD:     return "🥇 Gold";
        case BadgeTier::SILVER:   return "🥈 Silver";
        default:                  return "🥉 Bronze";
    }
}
