import React from 'react';

const FinancialStatusModule: React.FC = () => (
  <div>
    <h2>Estado financiero</h2>
    <p>Consulta tu estado de pagos y deudas.</p>
    <ul className="mt-4">
      <li>Pago matrícula: Completado</li>
      <li>Deuda biblioteca: $0</li>
    </ul>
  </div>
);

export default FinancialStatusModule;