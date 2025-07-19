import React from 'react';

const links = [
  { label: 'Librería USC', url: 'https://libreriausc.com/' },
  { label: 'Adquisiciones', url: 'https://www.usc.edu.co/biblioteca/solicitud-material-bibliografico/' },
  { label: 'Préstamo de material bibliográfico', url: 'https://www.usc.edu.co/biblioteca/renovacion-material/' },
  { label: 'Libros editorial USC', url: 'https://libros.usc.edu.co/index.php/usc' },
  { label: 'Biblioteca incluyente', url: 'https://www.usc.edu.co/biblioteca/biblioteca-incluyente/' },
  { label: 'Guías', url: 'https://www.usc.edu.co/biblioteca/guias/'},
  { label: 'Reglamento de biblioteca', url: 'https://www.usc.edu.co/wp-content/uploads/2023/08/Reglamento-de-biblioteca-USC.pdf' },
  { label: 'Encuesta de satisfacción', url: 'https://forms.office.com/pages/responsepage.aspx?id=_WLpRzu87U6xuNcO7prNZbjXchmXNHRPhRkZ8INO-BNUMlRHVDdQTjIyMzM2Ujc1QVAxR0FWVlFITS4u&origin=lprLink&route=shorturl' },
  { label: 'Consorcio Colombia', url: 'https://www.consorciocolombia.co/' },
];

const LibraryServicesModule: React.FC = () => (
  <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10 mt-8 border border-blue-100">
    <h2 className="text-2xl font-bold mb-2 text-blue-700 flex items-center gap-2">
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
      Servicios de biblioteca
    </h2>
    <p className="text-gray-600 mb-8">Accede a préstamos, recursos digitales y servicios institucionales de la biblioteca.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full backdrop-blur-md bg-gradient-to-br from-blue-100/70 via-white/60 to-blue-200/60 border-2 border-blue-300 hover:border-blue-500 shadow-2xl hover:shadow-blue-300/40 shadow-inner text-blue-900 font-semibold py-10 px-8 rounded-3xl transition-all text-lg text-center min-h-[120px] flex flex-col items-center justify-center gap-3 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-50/80 before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:transition-all before:duration-300 before:opacity-0 hover:before:opacity-100 before:shadow-[0_0_32px_8px_rgba(59,130,246,0.15)]"
          tabIndex={0}
        >
          {/* Badge decorativo animado */}
          <span className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-lg animate-pulse border-2 border-white select-none pointer-events-none z-10">
            ★
          </span>
          <span className="flex items-center justify-center mb-2">
            <svg className="w-9 h-9 text-blue-500 group-hover:scale-110 group-hover:text-blue-700 transition-transform duration-300 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0a9 9 0 100-18 9 9 0 000 18z" /></svg>
          </span>
          <span className="break-words font-sans text-xl tracking-wide group-hover:text-blue-700 transition-colors duration-300 drop-shadow-sm max-w-full w-full">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  </div>
);

export default LibraryServicesModule;