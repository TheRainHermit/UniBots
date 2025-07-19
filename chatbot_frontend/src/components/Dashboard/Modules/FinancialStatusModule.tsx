import React from 'react';
import { BadgeCheck, CreditCard, Library } from 'lucide-react';

const FinancialStatusModule: React.FC = () => (
  <div className="w-full max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12 mt-8 border border-blue-100">
    <div className="flex items-center gap-3 mb-4">
      <CreditCard className="w-8 h-8 text-blue-600" />
      <h2 className="text-2xl font-bold text-blue-800">Estado financiero</h2>
    </div>
    <p className="text-gray-600 mb-6">Consulta el estado de tus pagos y deudas universitarias.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 shadow group">
        <BadgeCheck className="w-7 h-7 text-green-500 mb-2" />
        <span className="text-lg font-semibold text-blue-900">Pago matrícula</span>
        <span className="mt-1 text-green-600 font-bold">Completado</span>
      </div>
      <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 shadow group">
        <Library className="w-7 h-7 text-blue-400 mb-2" />
        <span className="text-lg font-semibold text-blue-900">Deuda biblioteca</span>
        <span className="mt-1 text-gray-700 font-bold">$0</span>
      </div>
    </div>
  </div>
);

export default FinancialStatusModule;