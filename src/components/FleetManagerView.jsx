import React from 'react';
import FleetList from './FleetList';

export default function FleetManagerView({ fleetVehicles }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Estado de Vehículos Activos</span>
        <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>
          + Registrar Vehículo
        </button>
      </div>
      <div className="table-container">
        <FleetList vehicles={fleetVehicles} />
      </div>
    </div>
  );
}
