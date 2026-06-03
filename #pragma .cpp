#include "models.h"
#include "utils.h"
#include <vector>
#include <unordered_map>
#include <algorithm>
#include <ctime>

class DataStore {
public:
    // ── Tables ────────────────────────────────────────────────
    std::vector<User>               users;
    std::vector<Course>             courses;
    std::vector<Module>             modules;
    std::vector<Lesson>             lessons;
    std::vector<Quiz>               quizzes;
    std::vector<Question>           questions;
    std::vector<QuizAttempt>        attempts;
    std::vector<AttemptAnswer>      answers;
    std::vector<Enrolment>          enrolments;
    std::vector<ProgressTracker>    progress_records;
    std::vector<AIRecommendation>   recommendations;
    std::vector<LearningPointRecord> point_records;

    DataStore() { seed(); }

    // ── Lookup helpers ────────────────────────────────────────

    User* findUserByEmail(const std::string& email) {
        for (auto& u : users)
            if (u.email == email) return &u;
        return nullptr;
    }

    User* findUserById(const std::string& id) {
        for (auto& u : users)
            if (u.user_id == id) return &u;
        return nullptr;
    }

    Course* findCourseById(const std::string& id) {
        for (auto& c : courses)
            if (c.course_id == id) return &c;
        return nullptr;
    }

    Quiz* findQuizById(const std::string& id) {
        for (auto& q : quizzes)
            if (q.quiz_id == id) return &q;
        return nullptr;
    }

    std::vector<Enrolment> getEnrolmentsForStudent(const std::string& student_id) {
        std::vector<Enrolment> result;
        for (auto& e : enrolments)
            if (e.student_id == student_id) result.push_back(e);
        return result;
    }

    std::vector<Quiz> getPublishedQuizzesForCourse(const std::string& course_id) {
        // find modules for course, then quizzes for those modules
        std::vector<std::string> mod_ids;
        for (auto& m : modules)
            if (m.course_id == course_id && m.is_published) mod_ids.push_back(m.module_id);

        std::vector<Quiz> result;
        for (auto& q : quizzes)
            for (auto& mid : mod_ids)
                if (q.module_id == mid && q.is_published) result.push_back(q);
        return result;
    }

    std::vector<Question> getQuestionsForQuiz(const std::string& quiz_id) {
        std::vector<Question> result;
        for (auto& q : questions)
            if (q.quiz_id == quiz_id) result.push_back(q);
        std::sort(result.begin(), result.end(),
            [](const Question& a, const Question& b){ return a.order_index < b.order_index; });
        return result;
    }

    int countAttempts(const std::string& student_id, const std::string& quiz_id) {
        int n = 0;
        for (auto& a : attempts)
            if (a.student_id == student_id && a.quiz_id == quiz_id && a.is_submitted) n++;
        return n;
    }

    std::vector<QuizAttempt> getAttemptsForStudent(const std::string& student_id) {
        std::vector<QuizAttempt> result;
        for (auto& a : attempts)
            if (a.student_id == student_id && a.is_submitted) result.push_back(a);
        return result;
    }

    std::vector<LearningPointRecord> getPointsForStudent(const std::string& student_id) {
        std::vector<LearningPointRecord> result;
        for (auto& p : point_records)
            if (p.student_id == student_id) result.push_back(p);
        return result;
    }

    int getTotalPoints(const std::string& student_id) {
        int total = 0;
        for (auto& p : point_records)
            if (p.student_id == student_id) total += p.points_earned;
        return total;
    }

    std::vector<ProgressTracker> getProgressForStudent(const std::string& student_id) {
        std::vector<ProgressTracker> result;
        for (auto& p : progress_records)
            if (p.student_id == student_id) result.push_back(p);
        return result;
    }

    // Total lessons in a course
    int countLessonsInCourse(const std::string& course_id) {
        int n = 0;
        for (auto& mod : modules)
            if (mod.course_id == course_id)
                for (auto& les : lessons)
                    if (les.module_id == mod.module_id) n++;
        return n;
    }

    // Completed lessons for student in course
    int countCompletedLessons(const std::string& student_id, const std::string& course_id) {
        // get lesson ids in course
        std::vector<std::string> lesson_ids;
        for (auto& mod : modules)
            if (mod.course_id == course_id)
                for (auto& les : lessons)
                    if (les.module_id == mod.module_id) lesson_ids.push_back(les.lesson_id);

        int n = 0;
        for (auto& p : progress_records)
            if (p.student_id == student_id && p.is_completed)
                for (auto& lid : lesson_ids)
                    if (p.lesson_id == lid) n++;
        return n;
    }

    std::vector<AIRecommendation> getVisibleRecommendations(const std::string& student_id) {
        std::vector<AIRecommendation> result;
        for (auto& r : recommendations)
            if (r.student_id == student_id && r.is_visible) result.push_back(r);
        return result;
    }

    // Leaderboard: all students sorted by total points descending
    std::vector<std::pair<std::string, int>> getLeaderboard() {
        std::unordered_map<std::string, int> totals;
        for (auto& p : point_records)
            totals[p.student_id] += p.points_earned;

        std::vector<std::pair<std::string, int>> board(totals.begin(), totals.end());
        std::sort(board.begin(), board.end(),
            [](const auto& a, const auto& b){ return a.second > b.second; });
        return board;
    }

    // ── Seed data ─────────────────────────────────────────────
private:
    void seed() {
        std::time_t now = std::time(nullptr);

        // ── Users ─────────────────────────────────────────────
        users = {
            { "u001", "Alice Lim",    "alice@mmu.edu.my",  "pass123",
              Role::STUDENT, true, now-86400*30, now-3600, 0, 0 },
            { "u002", "Bob Tan",      "bob@mmu.edu.my",    "pass456",
              Role::STUDENT, true, now-86400*20, now-7200, 0, 0 },
            { "u003", "Dr. Chan",     "chan@mmu.edu.my",   "teach789",
              Role::INSTRUCTOR, true, now-86400*60, now-1800, 0, 0 },
            { "u004", "Admin One",    "admin@mmu.edu.my",  "admin000",
              Role::ADMIN, true, now-86400*90, now-600, 0, 0 },
        };

        // ── Courses ───────────────────────────────────────────
        courses = {
            { "c001", "CSE6214", "Data Structures & Algorithms",
              "Fundamental data structures and algorithm analysis.", "u003", true, now-86400*25 },
            { "c002", "WEB3201", "Web Development Fundamentals",
              "HTML, CSS, JavaScript and introductory backend.", "u003", true, now-86400*20 },
        };

        // ── Modules ───────────────────────────────────────────
        modules = {
            { "m001", "c001", "Module 1: Arrays & Linked Lists", 1, true },
            { "m002", "c001", "Module 2: Trees & Graphs",         2, true },
            { "m003", "c002", "Module 1: HTML & CSS Basics",      1, true },
            { "m004", "c002", "Module 2: JavaScript Essentials",  2, true },
        };

        // ── Lessons ───────────────────────────────────────────
        lessons = {
            { "l001", "m001", "Introduction to Arrays",      "pdf",   "/files/arrays.pdf",    1, now-86400*24 },
            { "l002", "m001", "Linked List Operations",      "video", "/files/linked.mp4",    2, now-86400*23 },
            { "l003", "m002", "Binary Trees Explained",      "pdf",   "/files/trees.pdf",     1, now-86400*18 },
            { "l004", "m002", "Graph Traversal Algorithms",  "video", "/files/graphs.mp4",    2, now-86400*17 },
            { "l005", "m003", "HTML Document Structure",     "pdf",   "/files/html.pdf",      1, now-86400*15 },
            { "l006", "m004", "JavaScript Variables & Loops","pdf",   "/files/js_basics.pdf", 1, now-86400*10 },
        };

        // ── Quizzes ───────────────────────────────────────────
        quizzes = {
            { "q001", "m001", "Quiz 1: Arrays & Linked Lists", 10, 4, 2, true, 0, 0 },
            { "q002", "m002", "Quiz 2: Trees & Graphs",        8,  3, 2, true, 0, 0 },
            { "q003", "m003", "Quiz 1: HTML Basics",           5,  3, 3, true, 0, 0 },
        };

        // ── Questions ─────────────────────────────────────────
        // Quiz 1 — Arrays & Linked Lists
        questions.push_back({
            "qn001", "q001",
            "What is the time complexity of accessing an element in an array by index?",
            QuestionType::MCQ, 2.0f, 1, "",
            {
                { "opt1", "qn001", "O(n)",    false, 1 },
                { "opt2", "qn001", "O(log n)",false, 2 },
                { "opt3", "qn001", "O(1)",    true,  3 },
                { "opt4", "qn001", "O(n²)",   false, 4 },
            }
        });
        questions.push_back({
            "qn002", "q001",
            "In a singly linked list, each node contains a data field and a ________ to the next node.",
            QuestionType::FILL_IN_BLANK, 2.0f, 2, "pointer", {}
        });
        questions.push_back({
            "qn003", "q001",
            "Which data structure uses LIFO (Last In, First Out) order?",
            QuestionType::MCQ, 2.0f, 3, "",
            {
                { "opt5", "qn003", "Queue",  false, 1 },
                { "opt6", "qn003", "Stack",  true,  2 },
                { "opt7", "qn003", "Deque",  false, 3 },
                { "opt8", "qn003", "Tree",   false, 4 },
            }
        });
        questions.push_back({
            "qn004", "q001",
            "The head of a linked list points to the ________ node.",
            QuestionType::FILL_IN_BLANK, 2.0f, 4, "first", {}
        });

        // Quiz 2 — Trees & Graphs
        questions.push_back({
            "qn005", "q002",
            "In a binary search tree, where are values smaller than the root stored?",
            QuestionType::MCQ, 2.0f, 1, "",
            {
                { "opt9",  "qn005", "Right subtree", false, 1 },
                { "opt10", "qn005", "Left subtree",  true,  2 },
                { "opt11", "qn005", "Root",           false, 3 },
                { "opt12", "qn005", "Any subtree",   false, 4 },
            }
        });
        questions.push_back({
            "qn006", "q002",
            "BFS stands for Breadth-________ Search.",
            QuestionType::FILL_IN_BLANK, 2.0f, 2, "first", {}
        });
        questions.push_back({
            "qn007", "q002",
            "Which traversal visits: Left → Root → Right?",
            QuestionType::MCQ, 2.0f, 3, "",
            {
                { "opt13", "qn007", "Pre-order",  false, 1 },
                { "opt14", "qn007", "Post-order", false, 2 },
                { "opt15", "qn007", "In-order",   true,  3 },
                { "opt16", "qn007", "Level-order",false, 4 },
            }
        });

        // Quiz 3 — HTML Basics
        questions.push_back({
            "qn008", "q003",
            "Which HTML tag is used to create a hyperlink?",
            QuestionType::MCQ, 2.0f, 1, "",
            {
                { "opt17", "qn008", "<link>",  false, 1 },
                { "opt18", "qn008", "<a>",     true,  2 },
                { "opt19", "qn008", "<href>",  false, 3 },
                { "opt20", "qn008", "<nav>",   false, 4 },
            }
        });
        questions.push_back({
            "qn009", "q003",
            "HTML stands for HyperText ________ Language.",
            QuestionType::FILL_IN_BLANK, 2.0f, 2, "markup", {}
        });
        questions.push_back({
            "qn010", "q003",
            "The <head> element contains ________ about the HTML document.",
            QuestionType::FILL_IN_BLANK, 2.0f, 3, "metadata", {}
        });

        // ── Enrolments ────────────────────────────────────────
        enrolments = {
            { "e001", "u001", "c001", now-86400*25, CompletionStatus::IN_PROGRESS, 0 },
            { "e002", "u001", "c002", now-86400*18, CompletionStatus::IN_PROGRESS, 0 },
            { "e003", "u002", "c001", now-86400*20, CompletionStatus::IN_PROGRESS, 0 },
        };

        // ── Progress (some lessons completed) ─────────────────
        progress_records = {
            { "pr001", "u001", "l001", true,  now-86400*10, 1800 },
            { "pr002", "u001", "l002", true,  now-86400*9,  2400 },
            { "pr003", "u001", "l003", false, 0,            600  },
            { "pr004", "u001", "l005", true,  now-86400*5,  900  },
            { "pr005", "u002", "l001", true,  now-86400*8,  1200 },
        };

        // ── Previous attempts (Alice) ──────────────────────────
        attempts.push_back({
            "att001", "q001", "u001", 1,
            now-86400*5, now-86400*5+540, 6.0f, 75.0f, true
        });

        // ── AI Recommendations ────────────────────────────────
        recommendations.push_back({
            "rec001", "u001", "c001",
            "Graph Traversal, Tree Balancing",
            "l003,l004",
            "Alice scored 75% on Quiz 1. Focus on Trees & Graphs module.",
            "Review BFS and DFS concepts before the next quiz.",
            now-86400*2, "u003", true
        });

        // ── Learning Points ────────────────────────────────────
        point_records = {
            { "lp001", "u001", "lesson_complete", 10, "Completed: Introduction to Arrays",   now-86400*10 },
            { "lp002", "u001", "lesson_complete", 10, "Completed: Linked List Operations",   now-86400*9  },
            { "lp003", "u001", "quiz_complete",   50, "Quiz 1 passed (75%)",                 now-86400*5  },
            { "lp004", "u001", "streak",          20, "3-day login streak bonus",            now-86400*3  },
            { "lp005", "u001", "lesson_complete", 10, "Completed: HTML Document Structure",  now-86400*5  },
            { "lp006", "u002", "lesson_complete", 10, "Completed: Introduction to Arrays",   now-86400*8  },
            { "lp007", "u002", "quiz_complete",   30, "Quiz 1 partial score (60%)",          now-86400*6  },
        };
    }
};
