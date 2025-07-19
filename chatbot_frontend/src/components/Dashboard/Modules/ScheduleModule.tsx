import React, { useState } from 'react';

// En el futuro, estos datos vendrán de la base de datos
const scheduleData = [
  { dia: 'Lunes', hora: '7:00 - 9:00', asignatura: 'Cálculo I', tipo: 'Diurno', profesor: 'Dra. Martínez' },
  { dia: 'Martes', hora: '18:00 - 20:00', asignatura: 'Programación', tipo: 'Nocturno', profesor: 'Ing. Torres' },
  { dia: 'Viernes', hora: '10:00 - 12:00', asignatura: 'Física', tipo: 'Diurno', profesor: 'Dr. Salazar' },
];

const unique = (arr: string[]) => Array.from(new Set(arr));

const ScheduleModule: React.FC = () => {
  const [asignatura, setAsignatura] = useState('');
  const [tipo, setTipo] = useState('');
  const [hora, setHora] = useState('');
  const [profesor, setProfesor] = useState('');

  const asignaturas = unique(scheduleData.map(s => s.asignatura));
  const tipos = unique(scheduleData.map(s => s.tipo));
  const horas = unique(scheduleData.map(s => s.hora));
  const profesores = unique(scheduleData.map(s => s.profesor));

  const filtered = scheduleData.filter(s =>
    (asignatura ? s.asignatura === asignatura : true) &&
    (tipo ? s.tipo === tipo : true) &&
    (hora ? s.hora === hora : true) &&
    (profesor ? s.profesor === profesor : true)
  );

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10 mt-8 border border-blue-100">
      <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center gap-2">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        Horario de Clases
      </h2>
      <p className="text-gray-600 mb-6">Consulta y filtra tu horario semanal. <span className="italic text-sm">(Próximamente los datos vendrán de la base de datos institucional)</span></p>
      <div className="flex flex-wrap gap-6 mb-8 justify-between items-center">
        <select value={asignatura} onChange={e => setAsignatura(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todas las asignaturas</option>
          {asignaturas.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todos los horarios</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={hora} onChange={e => setHora(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todas las horas</option>
          {horas.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={profesor} onChange={e => setProfesor(e.target.value)} className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="">Todos los profesores</option>
          {profesores.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-800 text-lg">
              <th className="py-3 px-6 text-left rounded-tl-xl">Día</th>
              <th className="py-3 px-6 text-left">Hora</th>
              <th className="py-3 px-6 text-left">Asignatura</th>
              <th className="py-3 px-6 text-left">Tipo</th>
              <th className="py-3 px-6 text-left rounded-tr-xl">Profesor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8 text-lg">No hay clases que coincidan con los filtros seleccionados.</td>
              </tr>
            ) : (
              filtered.map((s, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition text-base">
                  <td className="py-3 px-6 font-semibold whitespace-nowrap">{s.dia}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{s.hora}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{s.asignatura}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{s.tipo}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{s.profesor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleModule;