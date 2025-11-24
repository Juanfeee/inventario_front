import React from 'react';
import { PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES, PRODUCT_SIZES, PRODUCT_COLORS, PRODUCT_MATERIALS } from '../../utils/constants';
import type { Product, ProductFormData } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = React.useState<ProductFormData>({
    codigo_barras: product?.CodigoBarras || '',
    nombre_producto: product?.NombreProducto || '',
    categoria: product?.Categoria || '',
    subcategoria: product?.Subcategoria || '',
    talla: product?.Talla || '',
    color: product?.Color || '',
    material: product?.Material || '',
    cantidad_stock: product?.CantidadStock || 0,
    precio_compra: product?.PrecioCompra || 0,
    precio_venta: product?.PrecioVenta || 0,
    proveedor_id: product?.ProveedorID || undefined,
    descripcion: product?.Descripcion || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log('📤 DATOS QUE SE ENVÍAN AL BACKEND:', formData);
  };

  const subcategories = formData.categoria ? PRODUCT_SUBCATEGORIES[formData.categoria] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre del Producto */}
        <div className="md:col-span-2">
          <label htmlFor="nombre_producto" className="block text-sm font-medium text-gray-700">
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="nombre_producto"
            name="nombre_producto"
            required
            value={formData.nombre_producto}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Categoría y Subcategoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoría *
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            value={formData.categoria}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar categoría</option>
            {PRODUCT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategoria" className="block text-sm font-medium text-gray-700">
            Subcategoría
          </label>
          <select
            id="subcategoria"
            name="subcategoria"
            value={formData.subcategoria}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Talla, Color, Material */}
        <div>
          <label htmlFor="talla" className="block text-sm font-medium text-gray-700">
            Talla
          </label>
          <select
            id="talla"
            name="talla"
            value={formData.talla}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar talla</option>
            {PRODUCT_SIZES.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar color</option>
            {PRODUCT_COLORS.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="material" className="block text-sm font-medium text-gray-700">
            Material
          </label>
          <select
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar material</option>
            {PRODUCT_MATERIALS.map(material => (
              <option key={material} value={material}>{material}</option>
            ))}
          </select>
        </div>

        {/* Código de Barras */}
        <div>
          <label htmlFor="codigo_barras" className="block text-sm font-medium text-gray-700">
            Código de Barras
          </label>
          <input
            type="text"
            id="codigo_barras"
            name="codigo_barras"
            value={formData.codigo_barras}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Precios y Stock */}
        <div>
          <label htmlFor="precio_compra" className="block text-sm font-medium text-gray-700">
            Precio de Compra *
          </label>
          <input
            type="number"
            id="precio_compra"
            name="precio_compra"
            required
            min="0"
            step="0.01"
            value={formData.precio_compra}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="precio_venta" className="block text-sm font-medium text-gray-700">
            Precio de Venta *
          </label>
          <input
            type="number"
            id="precio_venta"
            name="precio_venta"
            required
            min="0"
            step="0.01"
            value={formData.precio_venta}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="cantidad_stock" className="block text-sm font-medium text-gray-700">
            Cantidad en Stock
          </label>
          <input
            type="number"
            id="cantidad_stock"
            name="cantidad_stock"
            min="0"
            value={formData.cantidad_stock}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Proveedor ID */}
        <div>
          <label htmlFor="proveedor_id" className="block text-sm font-medium text-gray-700">
            ID del Proveedor
          </label>
          <input
            type="number"
            id="proveedor_id"
            name="proveedor_id"
            min="1"
            value={formData.proveedor_id || ''}
            onChange={handleNumberChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')} Producto
        </button>
      </div>
    </form>
  );
};

export default ProductForm;