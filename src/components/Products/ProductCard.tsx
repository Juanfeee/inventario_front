import React from "react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  const getStockColor = (stock: number) => {
    if (stock === 0) return "text-red-600 bg-red-100";
    if (stock < 10) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "text-green-800 bg-green-100";
      case "agotado":
        return "text-red-800 bg-red-100";
      case "descontinuado":
        return "text-gray-800 bg-gray-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  // Función segura para formatear precios
  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return "0.00";
    const num = Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.NombreProducto}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              product.Estado
            )}`}
          >
            {product.Estado}
          </span>
        </div>

        {/* Category */}
        <p className="text-sm text-gray-600 mb-2">
          {product.Categoria}
          {product.Subcategoria && ` • ${product.Subcategoria}`}
        </p>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-700 mb-3">
          {product.Talla && (
            <p>
              <strong>Talla:</strong> {product.Talla}
            </p>
          )}
          {product.Color && (
            <p>
              <strong>Color:</strong> {product.Color}
            </p>
          )}
          {product.Material && (
            <p>
              <strong>Material:</strong> {product.Material}
            </p>
          )}
          {product.NombreProveedor && (
            <p>
              <strong>Proveedor:</strong> {product.NombreProveedor}
            </p>
          )}
        </div>

        {/* Description */}
        {product.Descripcion && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.Descripcion}
          </p>
        )}

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-3">
          <div>
            {/* CORRECCIÓN: Usar formatPrice en lugar de toFixed directo */}
            <p className="text-2xl font-bold text-blue-600">
              ${formatPrice(product.PrecioVenta)}
            </p>
            {isAdmin && (
              <p className="text-sm text-gray-500">
                Costo: ${formatPrice(product.PrecioCompra)}
              </p>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(
              product.CantidadStock
            )}`}
          >
            Stock: {product.CantidadStock}
          </span>
        </div>

        {/* Admin Actions */}
        {isAdmin && onEdit && onDelete && (
          <div className="flex space-x-2 pt-3 border-t border-gray-200">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete && onDelete(product.ProductoID)}
              className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
