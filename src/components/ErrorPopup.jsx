// ErrorPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPopup({ message, buttonText = 'Close' }) {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate back by one step in the history stack
    };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      zIndex: 9999, // Ensures the popup is above other elements
    }}>
      <div style={{
        padding: '20px',
        background: 'white',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%', // Limiting the width for better readability
      }}>
        <p>{message}</p>
        <button onClick={goBack}>{buttonText}</button>
      </div>
    </div>
  );
}

export default ErrorPopup;
