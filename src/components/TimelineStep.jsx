import React from 'react';

export default function TimelineStep({ title, desc, time, status }) {
  const getTimelineClass = () => {
    if (status === 'completed') return 'completed';
    if (status === 'active') return 'active';
    return '';
  };

  return (
    <div className={`timeline-item ${getTimelineClass()}`}>
      <div className="timeline-bullet"></div>
      <div className="timeline-content">
        <div className="timeline-header">
          <span className="timeline-title">{title}</span>
          <span className="timeline-time">{time}</span>
        </div>
        <p className="timeline-desc">{desc}</p>
      </div>
    </div>
  );
}
