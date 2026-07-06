import React from 'react';

export default function RoutePlannerView({
  origin,
  setOrigin,
  destination,
  setDestination,
  vehicleType,
  setVehicleType,
  routeResult,
  isCalculating,
  handleCalculateRoute
}) {
  return (
    <div className="panel">
      <div className="route-grid">
        {/* Form Input */}
        <div>
          <h3 className="panel-title" style={{ marginBottom: '20px' }}>Configuración de Ruta Inteligente</h3>
          <form onSubmit={handleCalculateRoute}>
            <div className="form-group">
              <label className="form-label">Origen (Almacén de Salida)</label>
              <select
                className="form-control"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                <option value="Centro de Distribución Norte">Centro de Distribución Norte</option>
                <option value="Terminal de Carga Metropolitana">Terminal de Carga Metropolitana</option>
                <option value="Hub Logístico del Este">Hub Logístico del Este</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Destino (Punto de Entrega)</label>
              <select
                className="form-control"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="Hub Metropolitano Sur">Hub Metropolitano Sur</option>
                <option value="Tienda Ecológica Centro">Tienda Ecológica Centro</option>
                <option value="Fábrica Sustentable Norte">Fábrica Sustentable Norte</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Transporte</label>
              <select
                className="form-control"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="electric">⚡ Camión Eléctrico Eficiente</option>
                <option value="hybrid">♻️ Furgón Híbrido de Reparto</option>
                <option value="diesel">🚛 Camión Convencional Diésel</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              {isCalculating ? 'Calculando Algoritmo Verde...' : 'Optimizar Ruta Ecológica'}
            </button>
          </form>

          {routeResult && (
            <div className="route-results">
              <h4 style={{ color: 'var(--accent-green)', fontWeight: '700', marginBottom: '12px' }}>
                ¡Ruta Optimizada Exitosamente!
              </h4>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                <strong>Vehículo Seleccionado:</strong> {routeResult.vehicleName}
              </p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                <strong>Distancia de Ruta:</strong> {routeResult.distance}
              </p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                <strong>Duración Estimada:</strong> {routeResult.duration}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px', borderTop: '1px solid rgba(16, 185, 129, 0.2)', paddingTop: '12px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Huella Estimada:</span>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: vehicleType === 'diesel' ? '#ef4444' : 'var(--text-primary)' }}>{routeResult.carbonFootprint}</div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--accent-green)' }}>Ahorro de CO₂:</span>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-green)' }}>
                    {routeResult.savedCarbon} ({routeResult.savedPercent})
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map Canvas Mock */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="panel-header" style={{ marginBottom: '12px' }}>
            <span className="panel-title">Mapa de Ruta Verde</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Actualizado en tiempo real</span>
          </div>
          <div className="map-mockup">
            <div style={{ position: 'absolute', inset: 0, opacity: '0.07', backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <svg className="map-svg" viewBox="0 0 500 400">
              <circle cx="50" cy="300" r="8" fill="var(--accent-blue)" />
              <text x="50" y="325" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">{origin.split(' ')[0]}</text>

              <circle cx="180" cy="220" r="6" fill="#64748b" />
              <text x="180" y="240" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Control A</text>

              <circle cx="300" cy="150" r="6" fill="#64748b" />
              <text x="300" y="170" fill="var(--text-muted)" fontSize="9" textAnchor="middle">Ruta Verde</text>

              <circle cx="450" cy="100" r="8" fill="var(--accent-green)" />
              <text x="450" y="125" fill="white" fontSize="10" textAnchor="middle" fontWeight="600">{destination.split(' ')[0]}</text>

              {routeResult && (
                <>
                  <path
                    d="M 50 300 Q 180 220 300 150 T 450 100"
                    fill="none"
                    stroke={vehicleType === 'diesel' ? '#ef4444' : 'var(--accent-green)'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '10, 5',
                      animation: 'dash 15s linear infinite'
                    }}
                  />
                  <path
                    d="M 50 300 Q 180 220 300 150 T 450 100"
                    fill="none"
                    stroke={vehicleType === 'diesel' ? '#ef4444' : 'var(--accent-green)'}
                    strokeWidth="4"
                    opacity="0.3"
                  />
                </>
              )}
            </svg>
            {!routeResult && (
              <div style={{ zIndex: 1, textAlign: 'center', padding: '20px' }}>
                <span style={{ fontSize: '32px' }}>🛰️</span>
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Completa la configuración y presiona "Optimizar" para trazar la ruta en el satélite.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
