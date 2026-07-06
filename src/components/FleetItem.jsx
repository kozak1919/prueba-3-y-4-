import React from 'react';

export default function FleetItem({ vehicle }) {
  const getBadgeClass = (status) => {
    if (status === 'Activo') return 'active';
    if (status === 'En Carga') return 'charging';
    return 'maintenance';
  };

  const getBatteryColor = (charge) => {
    const val = parseInt(charge);
    if (val > 50) return 'var(--accent-green)';
    if (val > 20) return '#eab308';
    return '#ef4444';
  };

  return (
    <tr>
      <td style={{ fontWeight: '600', color: 'var(--accent-blue)' }}>{vehicle.id}</td>
      <td>{vehicle.type}</td>
      <td>{vehicle.capacity}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {vehicle.charge !== 'N/A' && (
            <div style={{ width: '60px', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: getBatteryColor(vehicle.charge),
                  width: vehicle.charge
                }}
              />
            </div>
          )}
          <span>{vehicle.charge}</span>
        </div>
      </td>
      <td style={{ color: vehicle.emissions === '0 g/km' ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
        {vehicle.emissions}
      </td>
      <td>
        <span className={`status-badge ${getBadgeClass(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </td>
    </tr>
  );
}
