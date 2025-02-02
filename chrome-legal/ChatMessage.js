import React from 'react'
export default ({ name, message }) => {
  const calculateWidth = (text) => {
    const baseWidth = 40; // base width percentage
    const maxWidth = 46; // max width percentage
    const minWidth = 20; // min width percentage
    const lengthFactor = 0.5; // adjust this factor to control sensitivity

    const calculatedWidth = Math.min(maxWidth, Math.max(minWidth, baseWidth + text.length * lengthFactor));
    return `${calculatedWidth}%`;
  };

  return (
    <p>
      {name === "User" ? (
        <div style={{ textAlign: 'right', backgroundColor: '#26ade4', color: 'white', borderRadius: '15px', padding: '10px', display: 'block', maxWidth: calculateWidth(message), marginLeft: 'auto' }}>
          <em>{message}</em> <span role="img" aria-label="person">👤</span>
        </div>
      ) : (
        <div style={{ textAlign: 'left', backgroundColor: 'gray', color: 'white', borderRadius: '15px', padding: '10px', display: 'block', maxWidth: calculateWidth(message), marginRight: 'auto' }}>
          <span role="img" aria-label="person">🤖</span> <em>{message}</em>
        </div>
      )}
    </p>
  );
}