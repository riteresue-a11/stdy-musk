import React, { useState } from 'react';
import './App.css';
import QuestionInput from './components/QuestionInput';
import ProgressiveAnswer from './components/ProgressiveAnswer';
import Header from './components/Header';
import axios from 'axios';

// Backend API URL - 環境変数から取得、なければデフォルト
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [answerData, setAnswerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSolve = async (question, subject, imageData = null) => {
    setLoading(true);
    setError(null);
    setAnswerData(null);

    try {
      const endpoint = imageData ? '/api/solve/image' : '/api/solve/text';
      const payload = imageData 
        ? { imageData, subject }
        : { question, subject };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      setAnswerData(response.data);
    } catch (err) {
      console.error('Error solving question:', err);
      setError(err.response?.data?.error || 'エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnswerData(null);
    setError(null);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-container">
        {!answerData ? (
          <QuestionInput onSolve={handleSolve} loading={loading} error={error} />
        ) : (
          <ProgressiveAnswer 
            data={answerData} 
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 StudyStep - 段階的学習支援プラットフォーム</p>
      </footer>
    </div>
  );
}

export default App;
