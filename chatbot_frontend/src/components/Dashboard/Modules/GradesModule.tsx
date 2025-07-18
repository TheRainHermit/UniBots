import React from 'react';

const GradesModule: React.FC = () => (
  <div>
    <h2>Calificaciones</h2>
    <p>Aquí puedes consultar tus calificaciones por semestre.</p>
    {/* Ejemplo de tabla de notas */}
    <table className="min-w-full border mt-4">
      <thead>
        <tr>
          <th>Materia</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Matemáticas</td>
          <td>4.5</td>
        </tr>
        <tr>
          <td>Historia</td>
          <td>3.8</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default GradesModule;