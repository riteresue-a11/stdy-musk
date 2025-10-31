import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">📚 StudyStep</h1>
        <p className="tagline">段階的に学ぶ、確実に理解する</p>
      </div>
    </header>
  );
}

export default Header;
