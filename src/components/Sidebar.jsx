import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">🌱</div>
        <span className="brand-name">EcoRuta Express</span>
      </div>

      <nav className="nav-menu">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span> Panel General
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'route-planner' ? 'active' : ''}`}
            onClick={() => setActiveTab('route-planner')}
          >
            <span className="nav-icon">🗺️</span> Optimizador de Rutas
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'shipment-tracker' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipment-tracker')}
          >
            <span className="nav-icon">📦</span> Rastrear Envío
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'fleet-manager' ? 'active' : ''}`}
            onClick={() => setActiveTab('fleet-manager')}
          >
            <span className="nav-icon">⚡</span> Gestión de Flota
          </button>
        </li>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 EcoRuta Express</p>
        <p>Logística Verde v1.0.0</p>
      </div>
    </aside>
  );
}
