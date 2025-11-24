import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import type { LoginData } from '../../types';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState<string>('');

  const { login } = useAuth();
  const { loading, callApi } = useApi();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setLoginError('Por favor completa todos los campos');
      return;
    }

    console.log('🔍 [FRONTEND] Enviando login:', formData);

    const result = await callApi<{ token: string; user: any }>(
      'post',
      '/auth/login',
      formData,
      {
        onSuccess: (data) => {
          console.log('✅ [FRONTEND] Respuesta del login - data:', data);
          console.log('✅ [FRONTEND] Tipo de data:', typeof data);
          console.log('✅ [FRONTEND] Keys de data:', data ? Object.keys(data) : 'data es null/undefined');
          
          // DEBUG: Ver la estructura completa
          if (data) {
            console.log('✅ [FRONTEND] Estructura completa:', JSON.stringify(data, null, 2));
          }

          // Verificar si data tiene token y user
          if (data && data.token && data.user) {
            console.log('✅ [FRONTEND] Token encontrado:', data.token.substring(0, 20) + '...');
            console.log('✅ [FRONTEND] User encontrado:', data.user);
            login(data.token, data.user);
            
            if (data.user.rol === 'dueño') {
              navigate('/dashboard');
            } else {
              navigate('/catalog');
            }
          } else {
            console.log('❌ [FRONTEND] Estructura inesperada - no hay token o user');
            console.log('❌ [FRONTEND] Data recibida:', data);
            setLoginError('Error: Estructura de respuesta inesperada');
          }
        },
        onError: (error) => {
          console.log('❌ [FRONTEND] Error en login:', error);
          setLoginError(error);
        }
      }
    );

    console.log('📊 [FRONTEND] Result completo del callApi:', result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accede a tu cuenta de Mi Tienda
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu contraseña"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" text="" /> : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Credenciales de prueba:<br />
              Dueño: admin@tienda.com / admin123<br />
              Cliente: cliente@ejemplo.com / cliente123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;