import React, { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    // Create the cursor element
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '35px';
    cursor.style.height = '35px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'cyan'; // Glowing color
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%)'; // Center cursor initially
    cursor.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8)'; // Glowing shadow
    document.body.appendChild(cursor);

    // Update cursor position on mouse move with an offset to bottom-right
    const mouseMoveHandler = (e) => {
      const offsetX = 20; // Horizontal offset (right)
      const offsetY = 20; // Vertical offset (down)

      cursor.style.left = (e.clientX + offsetX) + 'px';   // Move cursor right by offset
      cursor.style.top = (e.clientY + offsetY) + 'px';    // Move cursor down by offset
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    // Cleanup cursor on component unmount
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      document.body.removeChild(cursor);
    };
  }, []);

  return null; // No JSX needed, we manipulate the DOM directly
};

export default CustomCursor;