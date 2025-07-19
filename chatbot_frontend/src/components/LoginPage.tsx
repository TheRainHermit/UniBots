import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

import uscLogo from '../assets/Logo USC.png';
import calidadLogo from '../assets/Calidad USC.jpg';

interface LoginPageProps {
  onLogin: (userData: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onLogin({
        username: formData.username,
        name: 'Juan Carlos Pérez',
        program: 'Ingeniería de Sistemas',
        semester: '8vo Semestre',
        id: '2019217001'
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4">
      <div className="w-full max-w-xl mx-auto">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl px-10 py-12 md:px-16 md:py-14 mb-8 mt-4 border border-blue-100">
          {/* Header con logo centrado */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-row items-center justify-center gap-4 mb-4">
              <div className="bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-blue-200" style={{ width: 88, height: 88 }}>
                <img
                  src={uscLogo}
                  alt="Logo Universidad Santiago de Cali"
                  className="object-contain w-20 h-20 p-1"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.15))' }}
                />
              </div>
              <div className="bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-blue-200" style={{ width: 88, height: 88 }}>
                <img
                  src={calidadLogo}
                  alt="Logo Calidad Universidad Santiago de Cali"
                  className="object-contain w-20 h-20 p-1"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(37,99,235,0.15))' }}
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-blue-700 mb-1">UNIBOTS</h1>
            <p className="text-blue-400">Talento Tech</p>
          </div>

          {/* Login Form */}
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  placeholder="Usuario o Número de Documento"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verificando...
                </div>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-100 text-sm">
          <p>© UNIBOTS 2025</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;