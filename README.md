# EcoRuta Express - Documentación de Arquitectura y Diseño (Puerto Montt)

Este documento detalla la arquitectura de la SPA **EcoRuta Express**, desarrollada con React + Vite. Se explica la estructura actual del proyecto, las justificaciones técnicas para las APIs públicas que se integrarán en la siguiente etapa del CRUD en Puerto Montt, y el mecanismo de persistencia mediante `LocalStorage`.

---

## 📂 Estructura de Módulos y Componentes
El proyecto sigue una estructura limpia y altamente modularizada. Los componentes principales y las vistas se encuentran distribuidos de la siguiente manera:

*   **Punto de Entrada**: [main.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/main.jsx) e [index.html](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/index.html)
*   **Orquestador de Estado**: [App.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/App.jsx) (mantiene los estados globales de la navegación, rutas calculadas, vehículos y tracking).
*   **Hojas de Estilo**: [index.css](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/index.css) (sistema de diseño premium con temática oscura, variables y animaciones).
*   **Componentes Modulares**: Carpeta [components/](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/)
    *   [Sidebar.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/Sidebar.jsx): Menú lateral reactivo.
    *   [DashboardView.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/DashboardView.jsx): Panel con KPIs y gráficos.
        *   [KpiCard.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/KpiCard.jsx): Componente para mostrar métricas individuales.
        *   [AlertList.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/AlertList.jsx) *(Lista)* y [AlertItem.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/AlertItem.jsx) *(Item)*: Componentes para el flujo de alertas críticas del sistema.
    *   [RoutePlannerView.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/RoutePlannerView.jsx): Calculador de emisiones y trazado de rutas.
    *   [ShipmentTrackerView.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/ShipmentTrackerView.jsx): Visor de estado del pedido.
        *   [TrackerTimeline.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/TrackerTimeline.jsx) *(Lista)* y [TimelineStep.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/TimelineStep.jsx) *(Item)*: Renderizan las etapas en curso del paquete.
    *   [FleetManagerView.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/FleetManagerView.jsx): Monitor de capacidad y carga de baterías de la flota.
        *   [FleetList.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/FleetList.jsx) *(Lista)* y [FleetItem.jsx](file:///c:/Users/gabri/Desktop/prueba3-4/prueba-3-y-4-/prueba-3-y-4-/src/components/FleetItem.jsx) *(Item)*: Administran el desglose de vehículos en formato tabular.

---

## 🌐 Justificación Técnica: Integración de APIs REST Externas

Para la siguiente fase (implementación completa del CRUD de despachos y envíos en la región de **Puerto Montt**), integraremos las siguientes APIs públicas y REST con objetivos claros:

### 1. API Nominatim (OpenStreetMap) o OpenRouteService (Geolocalización)
*   **Uso**: Conversión de direcciones en coordenadas reales (geocodificación) y cálculo de la matriz de distancias.
*   **Justificación Técnica**: Puerto Montt presenta una geografía compleja y accidentada (canales, cerros, costaneras). El uso de la API de OpenStreetMap nos permite:
    *   Validar y mapear direcciones exactas en Puerto Montt (e.g., Pelluco, Alerce, Angelmó).
    *   Trazar de manera realista la trayectoria óptima del despacho usando el algoritmo de ruteo verde más corto, calculando la distancia y la inclinación de la ruta para estimar el desgaste de batería en vehículos eléctricos.
    *   Evitar el costo comercial de APIs propietarias (como Google Maps) en etapas iniciales.

### 2. Open-Meteo API (Datos de Clima en Tiempo Real)
*   **Uso**: Enriquecimiento meteorológico de los despachos mediante consultas periódicas a las coordenadas de Puerto Montt (`lat=-41.4689, lon=-72.9426`).
*   **Justificación Técnica**: Puerto Montt tiene altos índices de precipitaciones y vientos fuertes, lo cual afecta directamente el rendimiento de las baterías de furgones eléctricos, el tiempo de entrega y la seguridad de las bicicletas de carga. Al integrar esta API, podemos:
    *   Adjuntar de forma automática el clima (lluvia, velocidad del viento) al registro del despacho.
    *   Ajustar dinámicamente el factor de emisión de CO₂ y el tiempo estimado de entrega (ETA).

### 3. JSONPlaceholder REST API (Gestión de Operadores y Clientes)
*   **Uso**: Carga inicial de datos de usuarios externos (repartidores y destinatarios de Puerto Montt) mediante el endpoint `/users`.
*   **Justificación Técnica**: Simula la autenticación y asignación de despachos a repartidores reales. Al consumir `/users`, podemos poblar el formulario de despachos de manera rápida con nombres, correos y teléfonos estructurados, garantizando que el flujo del CRUD simule un entorno de producción real.

---

## 💾 Persistencia de Datos con LocalStorage

Para evitar la pérdida de información cuando el usuario recarga el navegador, utilizaremos `LocalStorage` en React. Este mecanismo almacena cadenas de texto clave-valor persistentes directamente en el navegador del usuario.

### Mecánica de Integración en React

1.  **Lectura Inicial (Lazy Initial State)**:
    Al inicializar el estado en React, leemos desde `localStorage` usando `JSON.parse`. Si no existen datos guardados, usamos un valor por defecto. Esto evita calcular el valor en cada ciclo de render.
2.  **Sincronización Automática (`useEffect`)**:
    Usamos un efecto secundario que vigila los cambios del estado de los despachos. Cada vez que el array de despachos se actualiza (creación, edición, eliminación del CRUD), guardamos el nuevo array convertido a string con `JSON.stringify`.

### Código de Ejemplo (Implementación en App.jsx)

```javascript
import React, { useState, useEffect } from 'react';

export function DispatchCRUD() {
  // 1. Inicializar estado con datos guardados de LocalStorage o un array vacío por defecto
  const [dispatches, setDispatches] = useState(() => {
    const savedDispatches = localStorage.getItem('ecoruta_dispatches');
    return savedDispatches ? JSON.parse(savedDispatches) : [
      { id: 'DESP-101', destination: 'Pelluco, Puerto Montt', vehicle: 'electric', status: 'Preparado' }
    ];
  });

  // 2. Efecto para persistir cambios en LocalStorage cada vez que cambie 'dispatches'
  useEffect(() => {
    localStorage.setItem('ecoruta_dispatches', JSON.stringify(dispatches));
  }, [dispatches]);

  // Ejemplo de adición para el CRUD
  const addDispatch = (newDispatch) => {
    setDispatches((prev) => [...prev, newDispatch]);
  };

  return (
    <div>
      {/* Interfaz para listar y añadir despachos */}
    </div>
  );
}
```

*Nota: Para enriquecer los despachos de Puerto Montt, combinaremos esta persistencia local con las llamadas externas a las APIs climáticas y de geolocalización al momento de crear un nuevo registro.*


La documentacion se hizo con ayuda de la propia AI de antigravity para acelerar el proceso ya que me sobraron tokens.


PROMPTS UTILIZADOS
1.-
Tengo una carpeta clonada llamada prueba-3-y-4- que ya viene con un README y una Licencia desde GitHub. Quiero crear un proyecto de React con Vite dentro de esta misma carpeta para una SPA de logística llamada 'EcoRuta Express'. ¿Cómo puedo inicializarlo usando la terminal sin borrar los archivos de Git existentes?


2.-
necesito que ahora crees los componentes modulares jsx y componente de lista e items y lugo enlaza los modulos en app.jsx

3.-Para el proyecto EcoRuta Express necesito documentar el diseño de la arquitectura Justifica de manera técnica qué API pública o REST externa (como JSONPlaceholder para usuarios o una de geolocalizacion) que usaremos en la siguiente etapa del CRUD para enriquecer los despachos de Puerto Montt y explica de forma breve como se usaría LocalStorage para que los datos persistan al volver a cargar la página.




