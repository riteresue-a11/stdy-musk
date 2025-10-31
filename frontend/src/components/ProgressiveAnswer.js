import React, { useState } from 'react';
import './ProgressiveAnswer.css';

function ProgressiveAnswer({ data, onReset }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { subject, question, extractedText, answer, steps } = data;

  const isEnglish = subject === 'english';
  const maxSteps = steps.length;

  const handleNextStep = () => {
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getSubjectDisplay = (subj) => {
    const subjects = {
      english: '英語 🇬🇧',
      social: '社会 🌍',
      science: '理科 🔬'
    };
    return subjects[subj] || subj;
  };

  const progress = ((currentStep + 1) / maxSteps) * 100;

  return (
    <div className="progressive-answer-container">
      <div className="answer-card">
        {/* Header */}
        <div className="answer-header">
          <span className="subject-badge">{getSubjectDisplay(subject)}</span>
          <button onClick={onReset} className="reset-btn">
            ← 新しい問題
          </button>
        </div>

        {/* Question Display */}
        <div className="question-display">
          <h3>問題</h3>
          <p>{extractedText || question}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            ステップ {currentStep + 1} / {maxSteps}
          </span>
        </div>

        {/* Answer Display */}
        <div className="answer-display">
          <h3>
            {currentStep === maxSteps - 1 ? '✅ 完全な解答' : '💡 ヒント'}
          </h3>
          
          <div className="answer-content">
            {isEnglish ? (
              // English: Character by character reveal
              <div className="character-reveal">
                <span className="revealed-text">{steps[currentStep]}</span>
                {currentStep < maxSteps - 1 && (
                  <span className="hidden-text">
                    {'_'.repeat(answer.length - steps[currentStep].length)}
                  </span>
                )}
              </div>
            ) : (
              // Social/Science: Step-by-step hints
              <div className="step-hint">
                <p>{steps[currentStep]}</p>
              </div>
            )}
          </div>

          {/* Next Step Button */}
          {currentStep < maxSteps - 1 ? (
            <button onClick={handleNextStep} className="next-step-btn">
              次のヒントを見る →
            </button>
          ) : (
            <div className="completion-message">
              <p>🎉 完璧！全ての解答が表示されました</p>
            </div>
          )}
        </div>

        {/* All Steps Preview (after completion) */}
        {currentStep === maxSteps - 1 && (
          <div className="all-steps-preview">
            <h4>解答のステップ</h4>
            <ol>
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Ad Space - After Answer */}
      <div className="ad-space-answer">
        <p>広告スペース</p>
        <span>300 x 250</span>
      </div>

      {/* Sidebar Ad */}
      <div className="ad-space-sidebar">
        <p>広告スペース</p>
        <span>160 x 600</span>
      </div>
    </div>
  );
}

export default ProgressiveAnswer;
