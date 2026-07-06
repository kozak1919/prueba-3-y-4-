import React from 'react';
import FleetItem from './FleetItem';

export default function FleetList({ vehicles }) {
  return (
    <table className="fleet-table">
      <thead>
        <tr>
          <th>ID Vehículo</th>
          <th>Tipo</th>
          <th>Capacidad</th>
          <th>Carga Batería</th>
          <th>Emisión Promedio</th>
          <th>Estado de Ruta</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <FleetItem key={vehicle.id} vehicle={vehicle} />
        ))}
      </tbody>
    </table>
  );
}
