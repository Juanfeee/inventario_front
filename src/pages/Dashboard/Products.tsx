// pages/Dashboard/Products.tsx
import React, { useState, useEffect } from "react";
import { Product, ProductFormData } from "../../types";
import ProductList from "../../components/Products/ProductList";
import ProductForm from "../../components/Products/ProductForm";
import Modal from "../../components/Common/Modal";
import { useApi } from "../../hooks/useApi";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { callApi } = useApi();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const result = await callApi<Product[]>("get", "/products");
    if (result?.success && result.data) {
      setProducts(result.data);
    }
    setLoading(false);
  };

  const handleCreateProduct = async (formData: ProductFormData) => {
    const result = await callApi("post", "/products", formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        loadProducts();
      },
    });
  };

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!editingProduct) return;

    const result = await callApi(
      "put",
      `/products/${editingProduct.ProductoID}`,
      formData,
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setEditingProduct(null);
          loadProducts();
        },
      }
    );
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      return;
    }

    console.log("🗑️ Intentando eliminar producto ID:", productId);

    const result = await callApi("delete", `/products/${productId}`, null, {
      onSuccess: () => {
        console.log("✅ Producto eliminado exitosamente");
        loadProducts();
        alert("Producto eliminado exitosamente");
      },
      onError: (errorMsg) => {
        console.error("❌ Error eliminando producto:", errorMsg);
        alert(`Error al eliminar producto: ${errorMsg}`);
      },
    });

    console.log("📦 Resultado de delete:", result);
  };

  const handleSubmit = (formData: ProductFormData) => {
    if (editingProduct) {
      handleUpdateProduct(formData);
    } else {
      handleCreateProduct(formData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleOpenModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Productos
          </h1>
          <p className="text-gray-600">Administra el inventario de tu tienda</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Product List */}
      <ProductList
        products={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isAdmin={true}
      />

      {/* Modal para Crear/Editar Producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
        size="xl"
      >
        <ProductForm
          product={editingProduct || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Products;
