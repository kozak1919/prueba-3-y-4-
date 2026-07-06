import React from 'react';

export default function KpiCard({ title, value, trend, isUp, subtext, icon }) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className={`kpi-icon-wrapper ${isUp !== undefined ? (isUp ? 'green' : 'blue') : 'green'}`}>
          {icon}
        </div>
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div className={`kpi-trend ${isUp ? 'up' : ''} ${isUp === false ? 'down' : ''}`}>
          {isUp ? '▲' : isUp === false ? '▼' : '●'} {trend}
        </div>
      )}
      {subtext && <div className="kpi-trend">{subtext}</div>}
    </div>
  );
}
