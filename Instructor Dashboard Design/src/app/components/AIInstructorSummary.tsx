import { useState } from 'react';
import { Sparkles, RefreshCw, ChevronRight, TrendingUp, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';

const courseOptions = ['CSNB4122 - Software Engineering', 'CSNB3385 - Cybersecurity', 'CSNB3511 - OOAD', 'CSNB4532 - Data Analytics', 'CSNB2441 - Computational Method'];

interface InsightCard {
  type: 'positive' | 'warning' | 'suggestion' | 'summary';
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
  bg: string;
}

const insightsByCourse: Record<string, InsightCard[]> = {
  'CSNB4122 - Software Engineering': [
    { type: 'summary', icon: <BookOpen size={18} />, title: 'Course Overview', content: 'The course is progressing well with 42 enrolled students. Average completion rate stands at 60%, which is slightly below the expected 65% for Week 8. Students are actively engaging with Module 3 content on Software Design Principles.', color: '#001F91', bg: '#E9ECFF' },
    { type: 'positive', icon: <TrendingUp size={18} />, title: 'Positive Trend Detected', content: 'Quiz 3 scores showed an 8% improvement over Quiz 2, suggesting that students have grasped Requirements Engineering concepts better after the additional tutorial session conducted in Week 6. Continue this approach for upcoming topics.', color: '#16A34A', bg: '#F0FDF4' },
    { type: 'warning', icon: <AlertCircle size={18} />, title: 'Areas of Concern', content: '4 students consistently score below 60% across all assessments. Additionally, Assignment 3 submission rate is only 12% with 2 weeks remaining. Consider sending a reminder notification and offering extended office hours.', color: '#DC2626', bg: '#FEF2F2' },
    { type: 'suggestion', icon: <Lightbulb size={18} />, title: 'AI Recommendation', content: 'Based on quiz performance patterns, students struggle most with Design Pattern application. Consider adding a hands-on coding lab session in Week 9 and supplementary reading materials on the Singleton and Factory patterns before the next quiz.', color: '#D97706', bg: '#FFFBEB' },
  ],
  'CSNB3385 - Cybersecurity': [
    { type: 'summary', icon: <BookOpen size={18} />, title: 'Course Overview', content: 'Cybersecurity course shows strong performance with 85% completion rate — highest among all active courses. 38 students are enrolled with consistent engagement throughout the semester.', color: '#001F91', bg: '#E9ECFF' },
    { type: 'positive', icon: <TrendingUp size={18} />, title: 'Excellent Engagement', content: 'Assignment 1 (Security Audit Report) received near-perfect submission rate at 97.4%. Student feedback indicates high satisfaction with the practical, real-world approach to teaching network security fundamentals.', color: '#16A34A', bg: '#F0FDF4' },
    { type: 'warning', icon: <AlertCircle size={18} />, title: 'Pacing Alert', content: 'The AI detects that Module 2 (Cryptography) content is being completed significantly faster than expected — 78% completion in Week 5. This may indicate the content is too simple for this cohort. Consider adding advanced topics.', color: '#DC2626', bg: '#FEF2F2' },
    { type: 'suggestion', icon: <Lightbulb size={18} />, title: 'AI Recommendation', content: 'This cohort shows above-average aptitude for cybersecurity concepts. The AI recommends introducing optional advanced modules on Penetration Testing and Ethical Hacking to keep high-performing students engaged and challenged.', color: '#D97706', bg: '#FFFBEB' },
  ],
};

const defaultInsights = insightsByCourse['CSNB4122 - Software Engineering'];

const weeklyDigestByCourse: Record<string, typeof weeklyDigest> = {
  'CSNB4122 - Software Engineering': [
    { metric: 'Average Quiz Score', current: '78%', prev: '74%', trend: 'up' },
    { metric: 'Assignment Submission Rate', current: '91%', prev: '88%', trend: 'up' },
    { metric: 'Course Completion Rate', current: '60%', prev: '55%', trend: 'up' },
    { metric: 'Student Engagement Score', current: '82/100', prev: '78/100', trend: 'up' },
    { metric: 'At-Risk Students', current: '4', prev: '6', trend: 'down_good' },
  ],
  'CSNB3385 - Cybersecurity': [
    { metric: 'Average Quiz Score', current: '85%', prev: '80%', trend: 'up' },
    { metric: 'Assignment Submission Rate', current: '97%', prev: '91%', trend: 'up' },
    { metric: 'Course Completion Rate', current: '85%', prev: '76%', trend: 'up' },
    { metric: 'Student Engagement Score', current: '91/100', prev: '87/100', trend: 'up' },
    { metric: 'At-Risk Students', current: '1', prev: '3', trend: 'down_good' },
  ],
  'CSNB3511 - OOAD': [
    { metric: 'Average Quiz Score', current: '71%', prev: '68%', trend: 'up' },
    { metric: 'Assignment Submission Rate', current: '0%', prev: '0%', trend: 'up' },
    { metric: 'Course Completion Rate', current: '45%', prev: '38%', trend: 'up' },
    { metric: 'Student Engagement Score', current: '74/100', prev: '70/100', trend: 'up' },
    { metric: 'At-Risk Students', current: '6', prev: '5', trend: 'down_bad' },
  ],
  'CSNB4532 - Data Analytics': [
    { metric: 'Average Quiz Score', current: '74%', prev: '71%', trend: 'up' },
    { metric: 'Assignment Submission Rate', current: '60%', prev: '52%', trend: 'up' },
    { metric: 'Course Completion Rate', current: '58%', prev: '50%', trend: 'up' },
    { metric: 'Student Engagement Score', current: '78/100', prev: '75/100', trend: 'up' },
    { metric: 'At-Risk Students', current: '5', prev: '4', trend: 'down_bad' },
  ],
  'CSNB2441 - Computational Method': [
    { metric: 'Average Quiz Score', current: '66%', prev: '70%', trend: 'down_bad' },
    { metric: 'Assignment Submission Rate', current: '0%', prev: '0%', trend: 'up' },
    { metric: 'Course Completion Rate', current: '30%', prev: '20%', trend: 'up' },
    { metric: 'Student Engagement Score', current: '65/100', prev: '68/100', trend: 'down_bad' },
    { metric: 'At-Risk Students', current: '8', prev: '5', trend: 'down_bad' },
  ],
};

const weeklyDigest = weeklyDigestByCourse['CSNB4122 - Software Engineering'];

export function AIInstructorSummary() {
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(true);
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [actionModal, setActionModal] = useState<{ title: string; message: string } | null>(null);

  const insights = insightsByCourse[selectedCourse] ?? defaultInsights;
  const digest = weeklyDigestByCourse[selectedCourse] ?? weeklyDigest;

  function handleRegenerate() {
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 1800);
  }

  function handleGenerateSuggestion(title: string, content: string) {
    setExpandedSuggestion(expandedSuggestion === title ? null : content);
  }

  const quickActionResponses: Record<string, { title: string; message: string }> = {
    'Send reminder to at-risk students': {
      title: 'Reminder Sent',
      message: `A reminder notification has been sent to all at-risk students in ${selectedCourse.split(' - ')[0]}. They will be notified to complete pending assessments and attend office hours.`,
    },
    'Schedule extra tutorial': {
      title: 'Tutorial Scheduled',
      message: `An extra tutorial session has been scheduled for ${selectedCourse.split(' - ')[0]}. Students will be notified via the course announcement board. Please confirm the time slot in your calendar.`,
    },
    'Review grading rubric': {
      title: 'Grading Rubric',
      message: `The current grading rubric for ${selectedCourse.split(' - ')[0]} is:\n\n• Assignments: 40%\n• Quizzes: 20%\n• Mid-term: 20%\n• Final Exam: 20%\n\nTo update, go to Course Settings → Assessment Weightage.`,
    },
    'Export performance report': {
      title: 'Report Exported',
      message: `Performance report for ${selectedCourse.split(' - ')[0]} has been exported as a CSV file. It includes quiz scores, assignment submission rates, and engagement metrics for all ${digest[0] ? '' : ''}enrolled students.`,
    },
  };

  function handleQuickAction(action: string) {
    if (action === 'Export performance report') {
      const courseCode = selectedCourse.split(' - ')[0];
      const rows = [
        ['Performance Report', courseCode],
        ['Generated', new Date().toLocaleDateString()],
        [],
        ['Metric', 'Current', 'Previous', 'Trend'],
        ...digest.map((d) => [d.metric, d.current, d.prev, d.trend === 'up' || d.trend === 'down_good' ? '▲ Improved' : '▼ Declined']),
      ];
      const csv = rows.map((r) => r.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${courseCode}_performance_report.csv`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }
    setActionModal(quickActionResponses[action] ?? { title: action, message: 'Action completed.' });
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '44px', color: '#001F91', letterSpacing: '0.05em' }}>
            AI INSTRUCTOR SUMMARY
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#6B7280' }}>
            Powered by LEARNIFY AI · Last updated: Thursday, 4 June 2026 at 08:00 AM
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => { setSelectedCourse(e.target.value); setGenerated(false); }}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#001F91' }}
          >
            {courseOptions.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-white"
            style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', opacity: isGenerating ? 0.7 : 1 }}
          >
            <RefreshCw size={15} className={isGenerating ? 'animate-spin' : ''} />
            {isGenerating ? 'GENERATING...' : 'REGENERATE'}
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E9ECFF' }}>
            <Sparkles size={32} style={{ color: '#001F91' }} className="animate-pulse" />
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#001F91', fontWeight: 'bold' }}>
            AI is analyzing course data...
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#6B7280' }}>
            Processing student performance, engagement metrics, and assessment results
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Main insights */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#001F91' }}>
              <Sparkles size={16} color="white" />
              <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px', color: '#FFFFFF', letterSpacing: '0.08em' }}>
                AI ANALYSIS FOR: {selectedCourse.split(' - ')[0]}
              </span>
            </div>

            {insights.map((insight, i) => (
              <div key={i} className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: insight.bg, border: `1px solid ${insight.color}22` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ color: insight.color }}>{insight.icon}</div>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: insight.color, letterSpacing: '0.05em' }}>
                    {insight.title}
                  </span>
                </div>
                <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151', lineHeight: '1.7' }}>
                  {insight.content}
                </p>
                {insight.type === 'suggestion' && (
                  <div>
                    <button
                      onClick={() => handleGenerateSuggestion(insight.title, insight.content)}
                      className="flex items-center gap-1 mt-3 font-bold"
                      style={{ color: '#D97706', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}
                    >
                      {expandedSuggestion === insight.content ? 'Hide Detail' : 'Generate Action Plan'}
                      <ChevronRight size={14} style={{ transform: expandedSuggestion === insight.content ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {expandedSuggestion === insight.content && (
                      <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: '#FEF9C3', border: '1px solid #FDE047' }}>
                        <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '12px', color: '#92400E', marginBottom: '6px', letterSpacing: '0.05em' }}>
                          SUGGESTED ACTION PLAN
                        </div>
                        <ul style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#78350F', lineHeight: '1.8', paddingLeft: '16px', margin: 0 }}>
                          <li>Review the recommendation above with your department head</li>
                          <li>Schedule the suggested activity within the next 2 weeks</li>
                          <li>Announce changes to students via the course board</li>
                          <li>Monitor performance metrics after implementation</li>
                          <li>Follow up with at-risk students individually</li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Weekly digest */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '16px', letterSpacing: '0.08em' }}>
                WEEKLY DIGEST
              </div>
              <div className="flex flex-col gap-4">
                {digest.map((item, i) => (
                  <div key={i} style={{ borderBottom: i < digest.length - 1 ? '1px solid #E9ECFF' : 'none', paddingBottom: i < digest.length - 1 ? '12px' : '0' }}>
                    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>{item.metric}</div>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: 'Impact, sans-serif', fontSize: '22px', color: '#001F91' }}>{item.current}</span>
                      <span
                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: item.trend === 'up' || item.trend === 'down_good' ? '#F0FDF4' : '#FEF2F2',
                          color: item.trend === 'up' || item.trend === 'down_good' ? '#16A34A' : '#DC2626',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '11px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.trend === 'up' || item.trend === 'down_good' ? '↑' : '↓'} vs {item.prev}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '14px', color: '#001F91', marginBottom: '12px', letterSpacing: '0.08em' }}>
                QUICK ACTIONS
              </div>
              <div className="flex flex-col gap-2">
                {['Send reminder to at-risk students', 'Schedule extra tutorial', 'Review grading rubric', 'Export performance report'].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-left w-full"
                    style={{ backgroundColor: '#F5F7FF', border: '1px solid #E9ECFF', fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#001F91', fontWeight: 'bold' }}
                  >
                    {action}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {actionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
            <div style={{ fontFamily: 'Impact, sans-serif', fontSize: '24px', color: '#001F91', marginBottom: '16px' }}>
              {actionModal.title.toUpperCase()}
            </div>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#374151', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {actionModal.message}
            </p>
            <button
              onClick={() => setActionModal(null)}
              className="mt-6 w-full py-2 rounded-lg text-white"
              style={{ backgroundColor: '#001F91', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '13px' }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}