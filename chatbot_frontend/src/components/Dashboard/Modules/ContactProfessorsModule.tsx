import React from 'react';

const ContactProfessorsModule: React.FC = () => (
  <div>
    <h2>Contactar profesores</h2>
    <p>Envía mensajes a tus profesores.</p>
    <form className="mt-4">
      <input type="text" placeholder="Profesor" className="border p-2 mr-2" />
      <input type="text" placeholder="Mensaje" className="border p-2 mr-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
    </form>
  </div>
);

export default ContactProfessorsModule;