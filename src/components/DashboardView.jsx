import React from 'react';
import KpiCard from './KpiCard';
import AlertList from './AlertList';

export default function DashboardView() {
  const alerts = [
    { type: 'active', title: 'Punto de Entrega Verde 3', subtitle: 'Recibiendo entregas por Van Eléctrica #4.' },
    { type: 'pending', title: 'Zona Cero Emisiones Centro', subtitle: 'Acceso restringido a vehículos híbridos hoy.' },
    { type: 'warning', title: 'Cargador Rápido Base Norte', subtitle: 'Mantenimiento programado 22:00.' }
  ];

  const chartData = [
    { label: 'Lun', val: 180 },
    { label: 'Mar', val: 220 },
    { label: 'Mié', val: 190 },
    { label: 'Jue', val: 240 },
    { label: 'Vie', val: 290 },
    { label: 'Sáb', val: 150 },
    { label: 'Dom', val: 110 }
  ];

  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          title="Carbono Salvado (Este Mes)"
          value="1,280 kg CO₂"
          trend="+12% vs. mes anterior"
          isUp={true}
          icon="🍃"
        />
        <KpiCard
          title="Envíos Libres de Emisión"
          value="468 envíos"
          trend="+18.4% hoy"
          isUp={true}
          icon="📦"
        />
        <KpiCard
          title="Vehículos en Ruta"
          value="12 / 15 Activos"
          subtext="● 3 Cargando en Base"
          icon="⚡"
        />
        <KpiCard
          title="Porcentaje de Rutas Optimizadas"
          value="96.8%"
          trend="+1.2% de precisión"
          isUp={true}
          icon="🎯"
        />
      </div>

      <div className="dashboard-details">
        {/* Custom SVG Chart Bar Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Carbono Evitado por Día (Última Semana)</span>
            <span style={{ fontSize: '12px', color: 'var(--accent-green)', fontWeight: '600' }}>Meta: 200kg/día</span>
          </div>
          <div className="chart-container">
            {chartData.map((d, i) => (
              <div key={i} className="chart-bar-group">
                <div
                  className="chart-bar"
                  style={{ height: `${(d.val / 300) * 100}%` }}
                >
                  <div className="chart-tooltip">{d.val} kg Saved</div>
                </div>
                <span className="chart-label">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Side Panel */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Alertas y Avisos</span>
          </div>
          <AlertList alerts={alerts} />
        </div>
      </div>
    </>
  );
}
