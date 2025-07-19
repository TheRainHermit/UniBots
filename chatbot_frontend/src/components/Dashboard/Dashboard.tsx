import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  GraduationCap,
  Clock,
  Award,
  Library,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Importa los módulos
import GradesModule from './Modules/GradesModule';
import ScheduleModule from './Modules/ScheduleModule';
import EnrollmentModule from './Modules/EnrollmentModule';
import CertificatesModule from './Modules/CertificatesModule';
import FinancialStatusModule from './Modules/FinancialStatusModule';
import LibraryServicesModule from './Modules/LibraryServicesModule';
import ContactProfessorsModule from './Modules/ContactProfessorsModule';
import TeacherEvaluationModule from './Modules/TeacherEvaluationModule';
import UniversityWellbeingModule from './Modules/UniversityWellbeingModule';
import TechnicalHelpModule from './Modules/TechnicalHelpModule';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const moduleComponents: Record<string, React.ReactNode> = {
  grades: <GradesModule />,
  schedule: <ScheduleModule />,
  enrollment: <EnrollmentModule />,
  documents: <CertificatesModule />,
  financial: <FinancialStatusModule />,
  library: <LibraryServicesModule />,
  'student-services': <UniversityWellbeingModule />,
  'teacher-evaluation': <TeacherEvaluationModule />,
  'contact-professors': <ContactProfessorsModule />,
  'technical-help': <TechnicalHelpModule />,
};

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('home');

  const modules = [
    {
      id: 'grades',
      title: 'Calificaciones',
      icon: Award,
      description: 'Consultar notas y calificaciones',
      color: 'bg-purple-500'
    },
    {
      id: 'schedule',
      title: 'Horarios',
      icon: Calendar,
      description: 'Ver horarios de clases',
      color: 'bg-green-500'
    },
    {
      id: 'enrollment',
      title: 'Matrícula',
      icon: CreditCard,
      description: 'Procesos de matrícula',
      color: 'bg-orange-500'
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: FileText,
      description: 'Certificados y documentos',
      color: 'bg-red-500'
    },
    {
      id: 'library',
      title: 'Biblioteca',
      icon: Library,
      description: 'Servicios bibliotecarios',
      color: 'bg-indigo-500'
    },
    {
      id: 'financial',
      title: 'Información Financiera',
      icon: DollarSign,
      description: 'Estado de pagos y finanzas',
      color: 'bg-yellow-500'
    },
    {
      id: 'student-services',
      title: 'Servicios Estudiantiles',
      icon: Users,
      description: 'Bienestar universitario',
      color: 'bg-pink-500'
    },
    {
      id: 'teacher-evaluation',
      title: 'Evaluación Docente',
      icon: Users,
      description: 'Participa en la evaluación de tus profesores',
      color: 'bg-blue-500'
    },
    {
      id: 'contact-professors',
      title: 'Contactar Profesores',
      icon: Mail,
      description: 'Envía mensajes a tus profesores',
      color: 'bg-teal-500'
    },
    {
      id: 'technical-help',
      title: 'Ayuda Técnica',
      icon: Settings,
      description: 'Solicita soporte técnico',
      color: 'bg-gray-500'
    }
  ];

  const quickActions = [
    { title: 'Certificado de Notas', icon: FileText, color: 'text-blue-600', route: '/documents' },
    { title: 'Horario Actual', icon: Clock, color: 'text-green-600', route: '/schedule' },
    { title: 'Estado Financiero', icon: DollarSign, color: 'text-yellow-600', route: '/financial' },
    { title: 'Evaluación Docente', icon: Users, color: 'text-purple-600', route: '/teacher-evaluation' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">SINU</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Bell className="w-4 h-4 mr-1" />
                <span>3 notificaciones</span>
              </div>
              <div className="flex items-center">
                <User className="w-8 h-8 text-gray-400 mr-2" />
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user.name}</p>
                  <p className="text-gray-500">{user.id}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {activeModule === 'home' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Hola, {user.name}!
              </h2>
              <p className="text-gray-600">
                {user.program} - {user.semester}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-left group"
                    onClick={() => navigate(action.route)}
                  >
                    <action.icon className={`w-8 h-8 ${action.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <h4 className="font-medium text-gray-800">{action.title}</h4>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Modules */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Módulos Principales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer transform hover:scale-105"
                    onClick={() => setActiveModule(module.id)}
                  >
                    <div className={`${module.color} h-2`}></div>
                    <div className="p-6">
                      <module.icon className="w-12 h-12 text-gray-600 mb-4" />
                      <h4 className="font-semibold text-gray-800 mb-2">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Actividad Reciente</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-blue-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-800">Nueva calificación disponible</p>
                      <p className="text-sm text-gray-600">Programación Avanzada - 4.2</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <Mail className="w-8 h-8 text-green-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-800">Mensaje del profesor</p>
                      <p className="text-sm text-gray-600">Recordatorio sobre entrega de proyecto</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                    <DollarSign className="w-8 h-8 text-yellow-600 mr-4" />
                    <div>
                      <p className="font-medium text-gray-800">Pago procesado</p>
                      <p className="text-sm text-gray-600">Matrícula semestre 2024-1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Renderiza el módulo activo */}
        {activeModule !== 'home' && (
          <div>
            <button
              onClick={() => setActiveModule('home')}
              className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              ← Volver al Dashboard
            </button>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {moduleComponents[activeModule] || (
                <div className="text-gray-600">Módulo no disponible.</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;