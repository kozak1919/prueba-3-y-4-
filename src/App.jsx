import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardView from './components/DashboardView'
import RoutePlannerView from './components/RoutePlannerView'
import ShipmentTrackerView from './components/ShipmentTrackerView'
import FleetManagerView from './components/FleetManagerView'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Route Planner State
  const [origin, setOrigin] = useState('Centro de Distribución Norte');
  const [destination, setDestination] = useState('Hub Metropolitano Sur');
  const [vehicleType, setVehicleType] = useState('electric');
  const [routeResult, setRouteResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Shipment Tracker State
  const [trackingId, setTrackingId] = useState('ECO-7492-X');
  const [trackerResult, setTrackerResult] = useState({
    id: 'ECO-7492-X',
    status: 'En Ruta',
    origin: 'Centro de Distribución Norte',
    destination: 'Punto de Entrega Ecológico 3',
    eta: 'Hoy, 15:30',
    steps: [
      { id: 1, title: 'Orden Creada', desc: 'El envío fue programado en la plataforma.', time: '08:00 AM', status: 'completed' },
      { id: 2, title: 'Cargado en Vehículo Eléctrico', desc: 'Asignado a Van Eléctrica #4.', time: '09:15 AM', status: 'completed' },
      { id: 3, title: 'Despachado del Centro', desc: 'Ruta verde optimizada cargada en navegador.', time: '09:45 AM', status: 'completed' },
      { id: 4, title: 'En Tránsito', desc: 'Tránsito libre de emisiones. Aproximándose a destino.', time: 'En Curso', status: 'active' },
      { id: 5, title: 'Entrega en Destino', desc: 'Firma digital y descarga sin papeles.', time: 'Pendiente', status: 'pending' }
    ]
  });

  // Fleet list
  const fleetVehicles = [
    { id: 'EV-01', type: 'Camión Eléctrico Pesado', capacity: '12 Ton', charge: '85%', status: 'Activo', emissions: '0 g/km' },
    { id: 'EV-02', type: 'Furgón Eléctrico', capacity: '3.5 Ton', charge: '92%', status: 'Activo', emissions: '0 g/km' },
    { id: 'HV-01', type: 'Van Híbrida de Reparto', capacity: '2.0 Ton', charge: 'N/A', status: 'En Carga', emissions: '45 g/km' },
    { id: 'EV-03', type: 'Furgón Eléctrico', capacity: '3.5 Ton', charge: '14%', status: 'En Mantenimiento', emissions: '0 g/km' },
    { id: 'EV-04', type: 'Bicicleta de Carga Eléctrica', capacity: '250 kg', charge: '100%', status: 'Activo', emissions: '0 g/km' }
  ];

  // Route calculation simulation
  const handleCalculateRoute = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      let baseCarbon = 45.2; // Diesel base in kg
      let factor = 1.0;
      let vehicleName = 'Camión Diésel Convencional';

      if (vehicleType === 'electric') {
        factor = 0.0;
        vehicleName = 'Vehículo Eléctrico (Emisión Cero)';
      } else if (vehicleType === 'hybrid') {
        factor = 0.35;
        vehicleName = 'Van Híbrida Eficiente';
      }

      const emissions = parseFloat((baseCarbon * factor).toFixed(2));
      const saved = parseFloat((baseCarbon - emissions).toFixed(2));
      const savedPercent = Math.round((saved / baseCarbon) * 100);

      setRouteResult({
        distance: '48.5 km',
        duration: '52 min (Tráfico Optimizándose)',
        carbonFootprint: `${emissions} kg CO₂`,
        savedCarbon: `${saved} kg CO₂`,
        savedPercent: `${savedPercent}%`,
        vehicleName: vehicleName,
        points: [
          { x: 50, y: 300, name: origin },
          { x: 180, y: 220, name: 'Punto de Control Eco-A' },
          { x: 300, y: 150, name: 'Vía Verde Nacional' },
          { x: 450, y: 100, name: destination }
        ]
      });
      setIsCalculating(false);
    }, 1200);
  };

  const handleTrackShipment = (e) => {
    e.preventDefault();
    if (trackingId.trim().toUpperCase() === 'ECO-7492-X') {
      setTrackerResult({
        id: 'ECO-7492-X',
        status: 'En Ruta',
        origin: 'Centro de Distribución Norte',
        destination: 'Punto de Entrega Ecológico 3',
        eta: 'Hoy, 15:30',
        steps: [
          { id: 1, title: 'Orden Creada', desc: 'El envío fue programado en la plataforma.', time: '08:00 AM', status: 'completed' },
          { id: 2, title: 'Cargado en Vehículo Eléctrico', desc: 'Asignado a Van Eléctrica #4.', time: '09:15 AM', status: 'completed' },
          { id: 3, title: 'Despachado del Centro', desc: 'Ruta verde optimizada cargada en navegador.', time: '09:45 AM', status: 'completed' },
          { id: 4, title: 'En Tránsito', desc: 'Tránsito libre de emisiones. Aproximándose a destino.', time: 'En Curso', status: 'active' },
          { id: 5, title: 'Entrega en Destino', desc: 'Firma digital y descarga sin papeles.', time: 'Pendiente', status: 'pending' }
        ]
      });
    } else {
      setTrackerResult({
        id: trackingId.toUpperCase(),
        status: 'Completado',
        origin: 'Terminal Logística Oeste',
        destination: 'Sede Principal EcoCorp',
        eta: 'Ayer, 18:00',
        steps: [
          { id: 1, title: 'Recibido en Depósito', desc: 'Recepción y verificación.', time: 'Ayer, 09:00 AM', status: 'completed' },
          { id: 2, title: 'Optimización de Carga', desc: 'Agrupamiento inteligente con otros pedidos.', time: 'Ayer, 11:30 AM', status: 'completed' },
          { id: 3, title: 'Entrega en Destino', desc: 'Entrega exitosa sin emisiones.', time: 'Ayer, 06:00 PM', status: 'completed' }
        ]
      });
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <div>
            <h1>
              {activeTab === 'dashboard' && 'Panel Metrológico y de CO₂'}
              {activeTab === 'route-planner' && 'Optimizador de Ruta Ecológica'}
              {activeTab === 'shipment-tracker' && 'Seguimiento de Envíos en Tiempo Real'}
              {activeTab === 'fleet-manager' && 'Control de la Flota Ecológica'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              {activeTab === 'dashboard' && 'Visualiza el impacto ecológico de la logística urbana de hoy.'}
              {activeTab === 'route-planner' && 'Calcula la ruta más rápida y el menor impacto ambiental.'}
              {activeTab === 'shipment-tracker' && 'Controla la cadena de suministros y emisiones del paquete.'}
              {activeTab === 'fleet-manager' && 'Revisa el estado de carga y kilometraje limpio de los vehículos.'}
            </p>
          </div>
          <div className="header-meta">
            <div className="badge-eco">
              <span>🔋</span> Flota Eléctrica: 88% Activa
            </div>
          </div>
        </header>

        {/* Tab content selection */}
        {activeTab === 'dashboard' && <DashboardView />}

        {activeTab === 'route-planner' && (
          <RoutePlannerView
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            routeResult={routeResult}
            isCalculating={isCalculating}
            handleCalculateRoute={handleCalculateRoute}
          />
        )}

        {activeTab === 'shipment-tracker' && (
          <ShipmentTrackerView
            trackingId={trackingId}
            setTrackingId={setTrackingId}
            trackerResult={trackerResult}
            handleTrackShipment={handleTrackShipment}
          />
        )}

        {activeTab === 'fleet-manager' && (
          <FleetManagerView fleetVehicles={fleetVehicles} />
        )}
      </main>
    </div>
  )
}
