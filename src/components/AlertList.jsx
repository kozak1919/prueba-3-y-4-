import React from 'react';
import AlertItem from './AlertItem';

export default function AlertList({ alerts }) {
  return (
    <div className="info-list">
      {alerts.map((alert, index) => (
        <AlertItem
          key={index}
          type={alert.type}
          title={alert.title}
          subtitle={alert.subtitle}
        />
      ))}
    </div>
  );
}
