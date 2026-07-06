import React from 'react';
import TimelineStep from './TimelineStep';

export default function TrackerTimeline({ steps }) {
  return (
    <div className="tracker-timeline">
      {steps.map((step) => (
        <TimelineStep
          key={step.id}
          title={step.title}
          desc={step.desc}
          time={step.time}
          status={step.status}
        />
      ))}
    </div>
  );
}
