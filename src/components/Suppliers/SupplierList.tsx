import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import type { Supplier } from '../../types';

interface SupplierListProps {
  suppliers: Supplier[];
  loading: boolean;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplierId: number) => void;
}

const SupplierList: React.FC<SupplierListProps> = ({
  suppliers,
  loading,
  onEdit,
  onDelete
}) => {
  if (loading) {
    return <LoadingSpinner text="Cargando proveedores..." />;
  }

  if (suppliers.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proveedores</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza agregando un nuevo proveedor.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {suppliers.map((supplier) => (
          <li key={supplier.ProveedorID}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {supplier.NombreEmpresa.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {supplier.NombreEmpresa}
                      </h3>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        supplier.Estado === 'activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {supplier.Estado}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      <p><strong>Contacto:</strong> {supplier.ContactoNombre}</p>
                      {supplier.Telefono && <p><strong>Teléfono:</strong> {supplier.Telefono}</p>}
                      {supplier.Email && <p><strong>Email:</strong> {supplier.Email}</p>}
                      {supplier.RUC && <p><strong>RUC:</strong> {supplier.RUC}</p>}
                    </div>
                    {supplier.Direccion && (
                      <p className="mt-1 text-sm text-gray-500">
                        <strong>Dirección:</strong> {supplier.Direccion}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(supplier)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(supplier.ProveedorID)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Registrado el: {new Date(supplier.FechaRegistro).toLocaleDateString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;