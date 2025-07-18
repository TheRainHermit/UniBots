import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatbotProps {
  isAuthenticated: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: isAuthenticated 
        ? '¡Hola! Soy tu asistente virtual de SINU. ¿En qué puedo ayudarte hoy?'
        : '¡Hola! Soy tu asistente virtual. ¿Necesitas ayuda con el acceso a tu cuenta?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const loginOptions = [
    'Recuperar contraseña',
    'Problemas de acceso',
    'Contacto soporte técnico',
    'Información general'
  ];

  const dashboardOptions = [
    'Consultar calificaciones',
    'Ver horarios',
    'Información de matrícula',
    'Descargar certificados',
    'Estado financiero',
    'Servicios de biblioteca',
    'Contactar profesores',
    'Evaluación docente',
    'Bienestar universitario',
    'Ayuda técnica'
  ];

  const currentOptions = isAuthenticated ? dashboardOptions : loginOptions;

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: generateBotResponse(inputMessage)
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const generateBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('contraseña')) {
      return 'Para recuperar tu contraseña, puedes usar el enlace "¿Olvidaste tu contraseña?" en la página de inicio de sesión, o contactar al soporte técnico al 300-123-4567.';
    } else if (lowerMessage.includes('calificaciones')) {
      return 'Puedes consultar tus calificaciones en el módulo "Calificaciones" del dashboard principal. Allí encontrarás todas tus notas por semestre.';
    } else if (lowerMessage.includes('horario')) {
      return 'Tu horario está disponible en el módulo "Horarios". Puedes verlo por día, semana o descargar el horario completo en PDF.';
    } else if (lowerMessage.includes('matrícula')) {
      return 'En el módulo "Matrícula" encontrarás toda la información sobre inscripciones, fechas importantes y documentos requeridos.';
    } else {
      return 'Gracias por tu consulta. ¿Hay algo específico en lo que pueda ayudarte? Puedes usar las opciones rápidas o escribir tu pregunta.';
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage();
    setInputMessage(option);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <h3 className="font-semibold">Asistente SINU</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Opciones rápidas:</p>
            <div className="grid grid-cols-1 gap-2">
              {currentOptions.slice(0, 4).map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;