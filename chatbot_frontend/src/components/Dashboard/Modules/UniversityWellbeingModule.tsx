import React from 'react';

const UniversityWellbeingModule: React.FC = () => (
  <div className="w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-12 mt-10 border border-blue-100">
    <h2 className="text-3xl font-bold mb-2 text-blue-700 flex items-center gap-3">
      <svg className="w-9 h-9 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
      Bienestar universitario
    </h2>
    <p className="text-gray-600 mb-10 text-lg">Accede a servicios de bienestar y apoyo para tu vida universitaria.</p>
    <div className="flex gap-4">
      <a
        href="https://www.usc.edu.co/reglamento-estudiantil"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all text-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
        Reglamento estudiantil
      </a>
      <a
        href="https://www.usc.edu.co/trabajos-de-grado"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all text-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v13m0 0l-3.5 3.5M12 16l3.5 3.5" /></svg>
        Trabajos de grado
      </a>
      <a
        href="https://www.usc.edu.co/bienestar-universitario/areas-y-servicios/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all text-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
        Áreas de bienestar
      </a>
    </div>
  </div>
);

export default UniversityWellbeingModule;