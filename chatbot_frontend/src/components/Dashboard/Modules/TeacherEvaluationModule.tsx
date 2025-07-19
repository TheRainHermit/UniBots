import React, { useState } from 'react';

const questions = [
  '¿El profesor explica claramente los temas?',
  '¿El profesor fomenta la participación en clase?',
  '¿El profesor utiliza recursos y ejemplos adecuados?',
  '¿El profesor responde a las dudas de los estudiantes?',
  '¿El profesor es puntual y cumple con el horario?',
];

const options = [
  { value: 5, label: 'Excelente' },
  { value: 4, label: 'Bueno' },
  { value: 3, label: 'Aceptable' },
  { value: 2, label: 'Deficiente' },
  { value: 1, label: 'Muy deficiente' },
];

const TeacherEvaluationModule: React.FC = () => {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (idx: number, value: number) => {
    const newResponses = [...responses];
    newResponses[idx] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-0 mt-8 border border-yellow-100">
      <div className="rounded-t-2xl bg-gradient-to-r from-yellow-400/80 via-yellow-200/80 to-yellow-100/80 px-10 py-8 flex items-center gap-4 border-b border-yellow-200 relative overflow-hidden">
        <span className="flex items-center justify-center bg-white/80 rounded-full shadow-lg p-4">
          <svg className="w-12 h-12 text-yellow-600 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 4v16M16 4v16" />
            <path d="M4 8h16" />
          </svg>
        </span>
        <div>
          <h2 className="text-3xl font-bold text-yellow-800 mb-1">Evaluación docente</h2>
          <p className="text-yellow-900 text-base font-medium">Tu opinión es importante para mejorar la calidad educativa.</p>
        </div>
      </div>
      <div className="p-10">
      {submitted ? (
        <div className="text-green-700 text-lg font-semibold py-8 text-center">
          ¡Gracias por tu evaluación!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <label className="block font-medium text-yellow-900 mb-2">{q}</label>
                <div className="flex gap-4 flex-wrap">
                  {options.map(opt => (
                    <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt.value}
                        checked={responses[idx] === opt.value}
                        onChange={() => handleChange(idx, opt.value)}
                        className="accent-yellow-500"
                        required={idx === 0}
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block font-medium text-yellow-900 mb-2">Comentarios adicionales (opcional):</label>
            <textarea
              className="w-full border border-yellow-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              rows={3}
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Escribe tus sugerencias o comentarios..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all text-lg mt-4"
          >
            Enviar evaluación
          </button>
        </form>
      )}
      </div>
    </div>
  );
};

export default TeacherEvaluationModule;