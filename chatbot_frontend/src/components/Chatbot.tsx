import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface ChatbotProps {
  isAuthenticated: boolean;
}

// Materias y profesores del ScheduleModule
const scheduleData = [
  { dia: 'Lunes', hora: '7:00 - 9:00', asignatura: 'Cálculo I', tipo: 'Diurno', profesor: 'Dra. Martínez' },
  { dia: 'Martes', hora: '18:00 - 20:00', asignatura: 'Programación', tipo: 'Nocturno', profesor: 'Ing. Torres' },
  { dia: 'Viernes', hora: '10:00 - 12:00', asignatura: 'Física', tipo: 'Diurno', profesor: 'Dr. Salazar' },
];
const materias = Array.from(new Set(scheduleData.map(s => s.asignatura)));

// Función para normalizar texto (eliminar tildes y pasar a minúsculas)
const normalizeText = (text: string) =>
  text.normalize('NFD').replace(/[ -]|[\u0300-\u036f]/g, c => c.match(/[\u0300-\u036f]/) ? '' : c).toLowerCase();

const Chatbot: React.FC<ChatbotProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: isAuthenticated
        ? '¡Hola! Soy tu asistente virtual de VIXIA. ¿En qué puedo ayudarte hoy?'
        : '¡Hola! Soy tu asistente virtual. ¿Necesitas ayuda con el acceso a tu cuenta?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [awaitingMateria, setAwaitingMateria] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<any>(null);

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

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage;
    if (!messageToSend.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: messageToSend
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setShowRecommendations(false);

    setTimeout(() => {
      // Normalizar input para búsqueda de módulos y materias
      const normalizedInput = normalizeText(messageToSend);
      // Detectar módulos principales y redirigir automáticamente
      const modules = [
        { keywords: ['matricula', 'matrícula', 'inscripcion', 'inscripción'], path: '/enrollment', msg: 'Tu información de matrícula está disponible en el módulo "Matrícula". Puedes verla dando click <span class="chatbot-link" data-path="/enrollment" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['calificacion', 'calificaciones', 'notas'], path: '/grades', msg: 'Tus calificaciones están disponibles en el módulo "Calificaciones". Puedes verlas dando click <span class="chatbot-link" data-path="/grades" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['certificado', 'certificados'], path: '/documents', msg: 'Tus certificados están disponibles en el módulo "Certificados". Puedes verlos dando click <span class="chatbot-link" data-path="/documents" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['estado financiero', 'financiero', 'pagos', 'deuda'], path: '/estado-financiero', msg: 'Tu estado financiero está disponible en el módulo "Estado Financiero". Puedes verlo dando click <span class="chatbot-link" data-path="/estado-financiero" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['biblioteca', 'libros', 'servicios de biblioteca'], path: '/servicios-biblioteca', msg: 'Los servicios de biblioteca están disponibles en el módulo "Servicios de Biblioteca". Puedes verlos dando click <span class="chatbot-link" data-path="/servicios-biblioteca" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['profesor', 'profesores', 'contactar profesor'], path: '/contactar-profesores', msg: 'Puedes contactar a tus profesores en el módulo "Contactar Profesores". Haz click <span class="chatbot-link" data-path="/contactar-profesores" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['evaluacion docente', 'evaluación docente'], path: '/evaluacion-docente', msg: 'La evaluación docente está disponible en el módulo "Evaluación Docente". Puedes realizarla dando click <span class="chatbot-link" data-path="/evaluacion-docente" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['bienestar universitario', 'bienestar'], path: '/bienestar-universitario', msg: 'El bienestar universitario está disponible en el módulo "Bienestar Universitario". Puedes verlo dando click <span class="chatbot-link" data-path="/bienestar-universitario" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' },
        { keywords: ['ayuda tecnica', 'ayuda técnica', 'soporte', 'tecnico', 'técnico'], path: '/ayuda-tecnica', msg: 'La ayuda técnica está disponible en el módulo "Ayuda Técnica". Puedes solicitarla dando click <span class="chatbot-link" data-path="/ayuda-tecnica" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.' }
      ];
      const foundModule = modules.find(mod => mod.keywords.some(k => normalizedInput.includes(k)));
      if (foundModule) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          type: 'bot',
          content: foundModule.msg
        }]);
        setAwaitingMateria(false);
        return;
      }
      // Si el bot está esperando una materia
      if (awaitingMateria) {
        const materia = materias.find(m => normalizedInput.includes(normalizeText(m)));
        if (materia) {
          // Buscar info de la materia usando comparación normalizada
          const clases = scheduleData.filter(s => normalizeText(s.asignatura) === normalizeText(materia));
          if (clases.length > 0) {
            const info = clases.map(c => `${c.dia} ${c.hora} - Profesor: ${c.profesor}`).join('<br/>');
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              type: 'bot',
              content: `Los horarios de <b>${materia}</b> son:<br/>${info}<br/><br/>¿Quieres consultar otra materia?.`
            }]);
          } else {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              type: 'bot',
              content: `No se encontraron horarios para la materia <b>${materia}</b>.<br/><br/>¿Quieres consultar otra materia?.`
            }]);
          }
          // SEGUIR esperando materia
          setAwaitingMateria(true);
        } else {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            type: 'bot',
            content: `No reconocí la materia. Deseas salir de la consulta de materias.: <b>${materias.join(', ')}</b>`
          }]);
          // Si el input no es materia, salir del modo de espera
          if (!materias.some(m => normalizedInput.includes(normalizeText(m)))) {
            setAwaitingMateria(false);
          }
        }
        return;
      }
      // Lógica normal
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(messageToSend)
      };
      setMessages(prev => [...prev, botResponse]);
      // Si la respuesta es la de horarios, preguntar por materia después de 2 segundos
      if (messageToSend.toLowerCase().includes('horario')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 3,
            type: 'bot',
            content: `¿Quieres consultar el horario de alguna materia en específico? Escribe el nombre de la materia: <b>${materias.join(', ')}</b>`
          }]);
          setAwaitingMateria(true);
        }, 2000);
      }
      // Las recomendaciones no se muestran automáticamente tras cada respuesta
    }, 1000);
  };

  const generateBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('contraseña')) {
      return 'Para recuperar tu contraseña, puedes usar el enlace "¿Olvidaste tu contraseña?" en la página de inicio de sesión, o contactar al soporte técnico al 300-123-4567.';
    } else if (lowerMessage.includes('calificaciones')) {
      return 'Puedes consultar tus calificaciones en el módulo "Calificaciones". Haz click <span class="chatbot-link" data-path="/grades" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span> para acceder.';
    } else if (lowerMessage.includes('horario')) {
      // HTML link with a special class for SPA navigation, path corregido a /schedule
      return 'Tu horario está disponible en el módulo "Horarios". Puedes verlo dando click <span class="chatbot-link" data-path="/schedule" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.';
    } else if (lowerMessage.includes('matrícula')) {
      // HTML link with a special class for SPA navigation, path a /enrollment
      return 'En el módulo "Matrícula" encontrarás toda la información sobre inscripciones. Puedes acceder dando click <span class="chatbot-link" data-path="/enrollment" style="color:#2563eb; text-decoration:underline; cursor:pointer;">aquí</span>.';
    } else {
      return 'Gracias por tu consulta. ¿Hay algo específico en lo que pueda ayudarte? Puedes usar las opciones rápidas o escribir tu pregunta.';
    }
  };

  const handleOptionClick = (option: string) => {
    setShowRecommendations(false);
    handleSendMessage(option);
  };

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // SPA navigation for chatbot links
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('chatbot-link')) {
        e.preventDefault();
        const path = target.getAttribute('data-path') || '/schedule';
        navigate(path);
      }
    };
    const chatWindow = document.querySelector('.chatbot-messages');
    if (chatWindow) {
      chatWindow.addEventListener('click', handleClick);
    }
    return () => {
      if (chatWindow) {
        chatWindow.removeEventListener('click', handleClick);
      }
    };
  }, [isOpen, navigate]);

  // Mostrar recomendaciones tras inactividad
  useEffect(() => {
    if (!isOpen) return;
    if (inactivityTimer) clearTimeout(inactivityTimer);
    const timer = setTimeout(() => {
      setShowRecommendations(true);
    }, 60000); // 60 segundos
    setInactivityTimer(timer);
    return () => clearTimeout(timer);
  }, [messages, isOpen]);

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
        <div className="fixed bottom-24 right-6 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-2xl shadow-md">
            <div className="flex items-center">
              <Bot className="w-7 h-7 mr-3" />
              <h3 className="font-bold text-lg tracking-wide">Asistente VIXIA</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4 chatbot-messages bg-gradient-to-b from-white to-blue-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                >
                  <div className="flex items-start">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                    )}
                    {message.type === 'bot' ? (
                      <span
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: message.content }}
                      />
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options */}
          {showRecommendations && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Recomendaciones:</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentOptions.slice(0, 4).map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="px-3 py-1 text-sm rounded-full border border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!showRecommendations && (
            <div className="p-2 flex justify-center">
              <button
                onClick={() => setShowRecommendations(true)}
                className="text-xs px-3 py-1 rounded-full border border-blue-400 text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm"
              >
                Nueva consulta
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border border-blue-200 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-r-2xl hover:from-blue-700 hover:to-blue-600 transition-colors shadow"
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