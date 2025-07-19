import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Chatbot from './components/Chatbot';

// Importa los módulos del dashboard
import GradesModule from './components/Dashboard/Modules/GradesModule';
import ScheduleModule from './components/Dashboard/Modules/ScheduleModule';
import EnrollmentModule from './components/Dashboard/Modules/EnrollmentModule';
import CertificatesModule from './components/Dashboard/Modules/CertificatesModule';
import FinancialStatusModule from './components/Dashboard/Modules/FinancialStatusModule';
import LibraryServicesModule from './components/Dashboard/Modules/LibraryServicesModule';
import ContactProfessorsModule from './components/Dashboard/Modules/ContactProfessorsModule';
import TeacherEvaluationModule from './components/Dashboard/Modules/TeacherEvaluationModule';
import UniversityWellbeingModule from './components/Dashboard/Modules/UniversityWellbeingModule';
import TechnicalHelpModule from './components/Dashboard/Modules/TechnicalHelpModule';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Chatbot isAuthenticated={isAuthenticated} />
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
            <Route path="/grades" element={<GradesModule />} />
            <Route path="/schedule" element={<ScheduleModule />} />
            <Route path="/enrollment" element={<EnrollmentModule />} />
            <Route path="/documents" element={<CertificatesModule />} />
            <Route path="/financial" element={<FinancialStatusModule />} />
            <Route path="/library" element={<LibraryServicesModule />} />
            <Route path="/contact-professors" element={<ContactProfessorsModule />} />
            <Route path="/teacher-evaluation" element={<TeacherEvaluationModule />} />
            <Route path="/student-services" element={<UniversityWellbeingModule />} />
            <Route path="/technical-help" element={<TechnicalHelpModule />} />
            {/* Redirección si la ruta no existe */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;