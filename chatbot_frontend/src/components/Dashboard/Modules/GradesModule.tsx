import React, { useState } from 'react';

// En el futuro, estos datos vendrán de la base de datos
const gradesData = [
  { asignatura: 'Cálculo I', profesor: 'Dra. Martínez', nota: 4.7 },
  { asignatura: 'Programación', profesor: 'Ing. Torres', nota: 3.9 },
  { asignatura: 'Física', profesor: 'Dr. Salazar', nota: 4.2 },
];

const unique = (arr: string[]) => Array.from(new Set(arr));

const GradesModule: React.FC = () => {
  const [asignatura, setAsignatura] = useState('');
  const [profesor, setProfesor] = useState('');
  const [nota, setNota] = useState('');

  const asignaturas = unique(gradesData.map(g => g.asignatura));
  const profesores = unique(gradesData.map(g => g.profesor));
  const notas = unique(gradesData.map(g => g.nota.toString()));

  const filtered = gradesData.filter(g =>
    (asignatura ? g.asignatura === asignatura : true) &&
    (profesor ? g.profesor === profesor : true) &&
    (nota ? g.nota.toString() === nota : true)
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-12 mt-10 border border-blue-100">
      <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center gap-2">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
        Calificaciones
      </h2>
      <p className="text-gray-600 mb-6">Consulta y filtra tus calificaciones por materia, profesor o nota. <span className="italic text-sm">(Próximamente los datos vendrán de la base de datos institucional)</span></p>
      <div className="flex flex-wrap gap-8 mb-10 justify-between items-center">
        <select value={asignatura} onChange={e => setAsignatura(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todas las asignaturas</option>
          {asignaturas.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={profesor} onChange={e => setProfesor(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todos los profesores</option>
          {profesores.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={nota} onChange={e => setNota(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todas las notas</option>
          {notas.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-md">
          <thead>
            <tr className="bg-blue-100 text-blue-800 text-lg">
              <th className="py-4 px-8 text-left rounded-tl-2xl">Asignatura</th>
              <th className="py-4 px-8 text-left">Profesor</th>
              <th className="py-4 px-8 text-left rounded-tr-2xl">Nota</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-500 py-10 text-lg">No hay calificaciones que coincidan con los filtros seleccionados.</td>
              </tr>
            ) : (
              filtered.map((g, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition text-lg">
                  <td className="py-4 px-8 font-semibold whitespace-nowrap">{g.asignatura}</td>
                  <td className="py-4 px-8 whitespace-nowrap">{g.profesor}</td>
                  <td className="py-4 px-8 whitespace-nowrap">{g.nota}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesModule;