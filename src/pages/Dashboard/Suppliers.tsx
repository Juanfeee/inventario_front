import React, { useState, useEffect } from 'react';
import SupplierList from '../../components/Suppliers/SupplierList';
import SupplierForm from '../../components/Suppliers/SupplierForm';
import Modal from '../../components/Common/Modal';
import { useApi } from '../../hooks/useApi';
import type { Supplier, SupplierFormData } from '../../types';

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  const { callApi } = useApi();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    const result = await callApi<Supplier[]>('get', '/suppliers');
    if (result?.success && result.data) {
      setSuppliers(result.data);
    }
    setLoading(false);
  };

  const handleCreateSupplier = async (formData: SupplierFormData) => {
    const result = await callApi('post', '/suppliers', formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        loadSuppliers();
      }
    });
  };

  const handleUpdateSupplier = async (formData: SupplierFormData) => {
    if (!editingSupplier) return;

    const result = await callApi('put', `/suppliers/${editingSupplier.ProveedorID}`, formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        setEditingSupplier(null);
        loadSuppliers();
      }
    });
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = async (supplierId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
      const result = await callApi('delete', `/suppliers/${supplierId}`, null, {
        onSuccess: () => {
          loadSuppliers();
        }
      });
    }
  };

  const handleSubmit = (formData: SupplierFormData) => {
    if (editingSupplier) {
      handleUpdateSupplier(formData);
    } else {
      handleCreateSupplier(formData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Proveedores</h1>
          <p className="text-gray-600">Administra los proveedores de tu tienda</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Nuevo Proveedor
        </button>
      </div>

      {/* Supplier List */}
      <SupplierList
        suppliers={suppliers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para Crear/Editar Proveedor */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingSupplier ? 'Editar Proveedor' : 'Crear Nuevo Proveedor'}
        size="lg"
      >
        <SupplierForm
          supplier={editingSupplier || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Suppliers;