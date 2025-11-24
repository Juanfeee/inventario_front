import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import type { Client } from '../../types';

interface ClientListProps {
  clients: Client[];
  loading: boolean;
}

const ClientList: React.FC<ClientListProps> = ({ clients, loading }) => {
  if (loading) {
    return <LoadingSpinner text="Cargando clientes..." />;
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes registrados</h3>
        <p className="mt-1 text-sm text-gray-500">
          Los clientes aparecerán aquí cuando se registren en el sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {clients.map((client) => (
          <li key={client.UsuarioID}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {client.Nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {client.Nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {client.Email}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <div>Registrado: {new Date(client.FechaRegistro).toLocaleDateString()}</div>
                  {client.UltimoLogin && (
                    <div>Último login: {new Date(client.UltimoLogin).toLocaleDateString()}</div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;