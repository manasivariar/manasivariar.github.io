import React, { useEffect, useState, useRef, createElement } from 'react';
const CustomCursor = () => {
  const outerCursorRef = useRef(null);
  const innerCursorRef = useRef(null);
  // For physics-based cursor
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0
  });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true); // Start hidden until mouse moves
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false); // New state to control visibility
  // Physics properties
  const springStrength = 0.1; // How quickly cursor moves toward target (0.1 = 10% of distance per frame)
  const damping = 0.8; // Friction effect (0-1, lower = more friction)
  const velocity = useRef({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const updateTargetPosition = e => {
      setTargetPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsHidden(false);
      setCursorVisible(true);
    };
    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(targetPosition.x, targetPosition.y);
      const isClickable = hoveredElement?.tagName === 'BUTTON' || hoveredElement?.tagName === 'A' || hoveredElement?.closest('button') || hoveredElement?.closest('a') || window.getComputedStyle(hoveredElement || document.body).cursor === 'pointer';
      setIsPointer(isClickable);
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    // Animation frame for physics-based movement
    let animationFrameId;
    const updateCursorPosition = () => {
      // Physics-based cursor movement
      // Calculate force based on distance from target (spring physics)
      const dx = targetPosition.x - position.x;
      const dy = targetPosition.y - position.y;
      // Apply spring force
      velocity.current.x += dx * springStrength;
      velocity.current.y += dy * springStrength;
      // Apply damping (friction)
      velocity.current.x *= damping;
      velocity.current.y *= damping;
      // Update position
      const newX = position.x + velocity.current.x;
      const newY = position.y + velocity.current.y;
      setPosition({
        x: newX,
        y: newY
      });
      // Update cursor elements directly for smoother animation
      if (innerCursorRef.current) {
        innerCursorRef.current.style.left = `${targetPosition.x}px`;
        innerCursorRef.current.style.top = `${targetPosition.y}px`;
      }
      if (outerCursorRef.current) {
        outerCursorRef.current.style.left = `${newX}px`;
        outerCursorRef.current.style.top = `${newY}px`;
      }
      animationFrameId = requestAnimationFrame(updateCursorPosition);
    };
    // Start animation
    animationFrameId = requestAnimationFrame(updateCursorPosition);
    document.addEventListener('mousemove', updateTargetPosition);
    document.addEventListener('mouseover', updateCursorType);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    // Hide default cursor on all elements
    const addCursorStyle = () => {
      const style = document.createElement('style');
      style.id = 'cursor-style';
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);
    };
    addCursorStyle();
    return () => {
      document.removeEventListener('mousemove', updateTargetPosition);
      document.removeEventListener('mouseover', updateCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      // Cancel animation
      cancelAnimationFrame(animationFrameId);
      // Restore default cursor
      document.documentElement.style.cursor = 'auto';
      // Remove cursor style
      const cursorStyle = document.getElementById('cursor-style');
      if (cursorStyle) cursorStyle.remove();
    };
  }, [targetPosition, position]);
  // Don't render until we've detected mouse movement
  if (isHidden) return null;
  return <>
      {/* Outer cursor (follows with physics) - now centered */}
      <div ref={outerCursorRef} className="custom-cursor-outer" style={{
      transform: isClicking ? 'translate(-50%, -50%) scale(0.9)' : 'translate(-50%, -50%) scale(1)',
      backgroundColor: isPointer ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.2)',
      opacity: cursorVisible ? 1 : 0
    }} />
      {/* Inner cursor (follows exactly) - now centered */}
      <div ref={innerCursorRef} className="custom-cursor-inner" style={{
      transform: isClicking ? 'translate(-50%, -50%) scale(0.6)' : 'translate(-50%, -50%) scale(1)',
      backgroundColor: isPointer ? 'rgb(99, 102, 241)' : 'white',
      opacity: cursorVisible ? 1 : 0
    }} />
    </>;
};
export default CustomCursor;