import React from 'react';

const ScheduleModule: React.FC = () => (
  <div>
    <h2>Horarios</h2>
    <p>Consulta tu horario semanal de clases.</p>
    {/* Ejemplo de horario */}
    <ul className="mt-4">
      <li>Lunes: 8:00 - 10:00 Matemáticas</li>
      <li>Martes: 10:00 - 12:00 Historia</li>
      <li>Miércoles: 8:00 - 10:00 Física</li>
    </ul>
  </div>
);

export default ScheduleModule;