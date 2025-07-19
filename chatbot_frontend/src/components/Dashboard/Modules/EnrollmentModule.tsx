import React, { useState } from 'react';
import PreinscripcionForm from '../../PreinscripcionForm';
import { FilePlus2, FileText, UploadCloud, SearchCheck, CalendarCheck2 } from 'lucide-react';


const semesterDates = {
  '2025-1': '1 al 15 de enero',
  '2025-2': '1 al 15 de agosto',
  '2026-1': '1 al 15 de enero',
  '2026-2': '1 al 15 de agosto',
};

const EnrollmentModule: React.FC = () => {
  const [semester, setSemester] = useState('2025-2');
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-10 md:p-14 mt-8 border border-blue-100">
      <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center gap-2">
        <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 4v16M16 4v16" /><path d="M4 8h16" /></svg>
        Matrícula
      </h2>
      <p className="text-gray-600 mb-6">Información sobre inscripciones y documentos requeridos.</p>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <label className="font-medium text-blue-900">Selecciona el semestre:</label>
        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          className="border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {Object.keys(semesterDates).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <ul className="mb-6 text-blue-900 text-lg">
        <li><span className="font-semibold">Fechas de inscripción:</span> {semesterDates[semester as keyof typeof semesterDates]}</li>
        <li><span className="font-semibold">Documentos:</span> DNI, certificado de notas, recibo de pago</li>
      </ul>
      <div className="w-full flex flex-row gap-6 mb-2">
        <button
          className="flex-1 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-2xl shadow-lg transition-all text-base xl:text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 group min-w-[160px] max-w-sm text-center break-words"
          style={{ minWidth: '160px' }}
          onClick={() => setShowForm(true)}
        >
          <FilePlus2 className="mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="block w-full text-center break-words">Preinscripción</span>
        </button>
        <button
          className="flex-1 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-6 rounded-2xl shadow transition-all text-base xl:text-lg focus:outline-none border border-blue-200 group min-w-[160px] max-w-sm text-center break-words"
          type="button"
          style={{ minWidth: '160px' }}
        >
          <FileText className="mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="block w-full text-center break-words">Inscripción</span>
        </button>
        <button
          className="flex-1 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-6 rounded-2xl shadow transition-all text-base xl:text-lg focus:outline-none border border-blue-200 group min-w-[160px] max-w-xs text-center break-words"
          type="button"
          style={{ minWidth: '160px' }}
        >
          <UploadCloud className="mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="block w-full text-center break-words">Adjuntar documentos</span>
        </button>
        <button
          className="flex-1 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-6 rounded-2xl shadow transition-all text-base xl:text-lg focus:outline-none border border-blue-200 group min-w-[160px] max-w-xs text-center break-words"
          type="button"
          style={{ minWidth: '160px' }}
        >
          <SearchCheck className="mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="block w-full text-center break-words">Consultar estado</span>
        </button>
        <button
          className="flex-1 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-6 rounded-2xl shadow transition-all text-base xl:text-lg focus:outline-none border border-blue-200 group min-w-[160px] max-w-xs text-center break-words"
          type="button"
          style={{ minWidth: '160px' }}
        >
          <CalendarCheck2 className="mb-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="block w-full text-center break-words">Citación a entrevista</span>
        </button>
      </div>
      {showForm && (
        <div className="mt-8 p-0 bg-blue-50 border border-blue-200 rounded-xl shadow">
          <PreinscripcionForm />
        </div>
      )}
    </div>
  );
};

export default EnrollmentModule;