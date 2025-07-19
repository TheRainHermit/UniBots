import React from 'react';
import { FileText } from 'lucide-react';

const CertificatesModule: React.FC = () => (
  <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 overflow-hidden">
    {/* Fondo decorativo */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200 rounded-full opacity-30 blur-3xl z-0" style={{ transform: 'translate(40%,-30%)' }} />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300 rounded-full opacity-20 blur-2xl z-0" style={{ transform: 'translate(-30%,30%)' }} />

    {/* Tarjeta arriba a la izquierda */}
    <div className="relative z-10 p-10 pt-16 pl-16">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-left border border-blue-100">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mr-4">
            <FileText className="w-10 h-10 text-blue-600" />
          </span>
          <h2 className="text-2xl font-bold text-blue-700">Certificados Académicos</h2>
        </div>
        <p className="text-gray-600 mb-8 ml-1">Descarga aquí tus certificados oficiales de notas, matrícula y otros documentos académicos.</p>
        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow hover:from-blue-700 hover:to-blue-600 transition-colors text-lg flex items-center justify-center gap-2">
          <FileText className="w-5 h-5 mr-1" />
          Descargar certificado
        </button>
      </div>
    </div>
  </div>
);

export default CertificatesModule;