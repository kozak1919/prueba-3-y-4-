import React from 'react';
import TrackerTimeline from './TrackerTimeline';

export default function ShipmentTrackerView({
  trackingId,
  setTrackingId,
  trackerResult,
  handleTrackShipment
}) {
  return (
    <div className="panel">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 className="panel-title" style={{ textAlign: 'center', marginBottom: '24px' }}>Rastreador de Carbono en Tránsito</h3>
        <form onSubmit={handleTrackShipment} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Código de Seguimiento (e.g. ECO-7492-X)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Rastrear</button>
        </form>

        {trackerResult && (
          <div>
            <div style={{ display: 'flex', justifycontent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Envío N°</span>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-blue)' }}>{trackerResult.id}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estado</span>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--accent-green)' }}>● {trackerResult.status}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ruta</span>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{trackerResult.origin} → {trackerResult.destination}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Llegada Estimada</span>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{trackerResult.eta}</div>
              </div>
            </div>

            <TrackerTimeline steps={trackerResult.steps} />
          </div>
        )}
      </div>
    </div>
  );
}
