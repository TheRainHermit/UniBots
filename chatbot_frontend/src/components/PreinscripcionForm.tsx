import React, { useState } from 'react';
import { Search } from 'lucide-react';

const PreinscripcionForm: React.FC = () => {
  const [form, setForm] = useState({
    tipoInscripcion: '',
    modalidad:   '',
    estrategia:  '',
    cubrimiento: '',
    programa:    '',
    sede:        '',
    periodo:     '',
    fechaInicio: '',
    fechaFin:    '',
    cierreIns:   '',
    planEstudios:'',
    segundoProg: '',
    tipoId:      '',
    numeroId:    ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de envío de datos
    console.log('Enviando formulario:', form);
    window.location.href = '/siguiente';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8"
    >
      {/* Sección: Pre-inscripción */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Datos de la pre-inscripción
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tipo de inscripción */}
          <div>
            <label
              htmlFor="tipoInscripcion"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de inscripción
            </label>
            <select
              id="tipoInscripcion"
              name="tipoInscripcion"
              value={form.tipoInscripcion}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
              <option value="aspirante_nuevo_infantil">
                Aspirante Nuevo (Jardín Infantil)
              </option>
              <option value="aspirante_antiguo_infantil">
                Aspirante Antiguo (Jardín Infantil)
              </option>
              <option value="aspirante_nuevo">Aspirante Nuevo</option>
              <option value="transferencia_externa">
                Transferencia Externa
              </option>
              <option value="cambio_programa">
                Traslados - Cambio de Programa
              </option>
              <option value="reintegro">Reintegro</option>
            </select>
          </div>

          {/* Modalidad con icono de búsqueda */}
          <div className="relative">
            <label
              htmlFor="modalidad"
              className="block text-sm font-medium text-gray-700"
            >
              Modalidad
            </label>
            <input
              id="modalidad"
              name="modalidad"
              value={form.modalidad}
              onChange={handleChange}
              type="text"
              placeholder="Descripción"
              className="mt-1 block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute right-3 top-9 text-gray-400" size={20} />
          </div>

          {/* Estrategia metodológica */}
          <div className="md:col-span-2">
            <label
              htmlFor="estrategia"
              className="block text-sm font-medium text-gray-700"
            >
              Estrategia metodológica
            </label>
            <input
              id="estrategia"
              name="estrategia"
              value={form.estrategia}
              onChange={handleChange}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Sección: Programa Académico */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Datos del programa académico al que aspira
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cubrimiento */}
          <div>
            <label
              htmlFor="cubrimiento"
              className="block text-sm font-medium text-gray-700"
            >
              Cubrimiento
            </label>
            <input
              id="cubrimiento"
              name="cubrimiento"
              value={form.cubrimiento}
              onChange={handleChange}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Programa académico */}
          <div>
            <label
              htmlFor="programa"
              className="block text-sm font-medium text-gray-700"
            >
              Programa académico
            </label>
            <select
              id="programa"
              name="programa"
              value={form.programa}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
              <option value="medicina">Medicina</option>
              <option value="ingenieria">Ingeniería</option>
            </select>
          </div>

          {/* Sede */}
          <div>
            <label
              htmlFor="sede"
              className="block text-sm font-medium text-gray-700"
            >
              Sede
            </label>
            <select
              id="sede"
              name="sede"
              value={form.sede}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
              <option value="principal">Principal</option>
              <option value="palmira">Palmira</option>
            </select>
          </div>

          {/* Periodo académico */}
          <div>
            <label
              htmlFor="periodo"
              className="block text-sm font-medium text-gray-700"
            >
              Periodo académico
            </label>
            <select
              id="periodo"
              name="periodo"
              value={form.periodo}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
              <option value="2024-1">2024-1</option>
              <option value="2024-2">2024-2</option>
            </select>
          </div>

          {/* Fechas del periodo */}
          <div>
            <label
              htmlFor="fechaInicio"
              className="block text-sm font-medium text-gray-700"
            >
              Fechas del periodo (Desde)
            </label>
            <input
              id="fechaInicio"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              type="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="fechaFin"
              className="block text-sm font-medium text-gray-700"
            >
              Fechas del periodo (Hasta)
            </label>
            <input
              id="fechaFin"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              type="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Fecha de cierre de inscripción */}
          <div>
            <label
              htmlFor="cierreIns"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha de cierre de inscripción
            </label>
            <input
              id="cierreIns"
              name="cierreIns"
              value={form.cierreIns}
              onChange={handleChange}
              type="date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Plan y Requisitos */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 bg-gray-100 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
              >
                Plan de estudios
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-100 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
              >
                Requisitos
              </button>
            </div>
            <div>
              <label htmlFor="planEstudios" className="sr-only">
                Plan de estudios
              </label>
              <select
                id="planEstudios"
                name="planEstudios"
                value={form.planEstudios}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccione Plan...</option>
              </select>
            </div>
          </div>

          {/* Segundo programa */}
          <div className="md:col-span-2">
            <label
              htmlFor="segundoProg"
              className="block text-sm font-medium text-gray-700"
            >
              Segundo programa de su interés
            </label>
            <select
              id="segundoProg"
              name="segundoProg"
              value={form.segundoProg}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección: Identificación */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Identificación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="tipoId"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de identificación
            </label>
            <select
              id="tipoId"
              name="tipoId"
              value={form.tipoId}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccione...</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ce">Cédula de Extranjería</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="numeroId"
              className="block text-sm font-medium text-gray-700"
            >
              Número de identificación
            </label>
            <input
              id="numeroId"
              name="numeroId"
              value={form.numeroId}
              onChange={handleChange}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Botón Siguiente */}
      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default PreinscripcionForm;
