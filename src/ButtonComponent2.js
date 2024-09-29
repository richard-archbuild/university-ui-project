import React from 'react';

const buttonStyle = {
  background: 'linear-gradient(45deg, red, #ff3f6c)',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontSize: '16px',
  padding: '12px 24px',
  cursor: 'pointer',
  outline: 'none',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background 0.3s ease, transform 0.2s ease',
};

const buttonHoverStyle = {
  background: 'red',
  transform: 'scale(1.05)',
};

const ButtonComponent2 = ({ label,onClick,}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : {}),}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      
    >
      {label}
    </button>
  );
};

export default ButtonComponent2;