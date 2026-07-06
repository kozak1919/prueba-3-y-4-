import React from 'react';

export default function AlertItem({ type, title, subtitle }) {
  const getBulletClass = () => {
    switch (type) {
      case 'active': return 'active';
      case 'pending': return 'pending';
      default: return '';
    }
  };

  const getCustomStyle = () => {
    if (type !== 'active' && type !== 'pending') {
      return { backgroundColor: '#eab308' }; // Warning/Maintenance bullet color
    }
    return {};
  };

  return (
    <div className="info-item">
      <div className={`info-bullet ${getBulletClass()}`} style={getCustomStyle()}></div>
      <div className="info-body">
        <div className="info-title">{title}</div>
        <div className="info-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}
