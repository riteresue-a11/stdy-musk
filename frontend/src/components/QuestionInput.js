import React, { useState } from 'react';
import './QuestionInput.css';

function QuestionInput({ onSolve, loading, error }) {
  const [subject, setSubject] = useState('english');
  const [question, setQuestion] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!question.trim() && !imageFile) {
      alert('問題を入力するか、画像をアップロードしてください。');
      return;
    }

    if (imageFile) {
      onSolve(null, subject, imagePreview);
    } else {
      onSolve(question, subject, null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="question-input-container">
      <div className="input-card">
        <h2 className="card-title">問題を入力してください</h2>
        
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Subject Selection */}
          <div className="form-group">
            <label htmlFor="subject">教科を選択</label>
            <select 
              id="subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="select-input"
            >
              <option value="english">英語 🇬🇧</option>
              <option value="social">社会 🌍</option>
              <option value="science">理科 🔬</option>
            </select>
          </div>

          {/* Text Input */}
          <div className="form-group">
            <label htmlFor="question">問題（テキスト入力）</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例：What is the capital of France?"
              className="textarea-input"
              rows="4"
              disabled={imageFile !== null}
            />
          </div>

          {/* OR Divider */}
          <div className="divider">
            <span>または</span>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image">画像をアップロード</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              disabled={question.trim() !== ''}
            />
            
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button 
                  type="button" 
                  onClick={clearImage}
                  className="clear-image-btn"
                >
                  ✕ 削除
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                解答中...
              </>
            ) : (
              '解答を見る'
            )}
          </button>
        </form>

        {/* How to Use */}
        <div className="info-box">
          <h3>💡 使い方</h3>
          <ul>
            <li>教科を選んで、問題を入力してください</li>
            <li>または、問題のスクリーンショットをアップロードできます</li>
            <li>解答は段階的に表示されるので、自分のペースで学習できます</li>
          </ul>
        </div>
      </div>

      {/* Ad Space */}
      <div className="ad-space">
        <p>広告スペース</p>
        <span>300 x 250</span>
      </div>
    </div>
  );
}

export default QuestionInput;
