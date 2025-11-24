// Tipos para la aplicación

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: 'dueño' | 'cliente';
}

export interface Product {
  ProductoID: number;
  CodigoBarras?: string;
  NombreProducto: string;
  Categoria: string;
  Subcategoria?: string;
  Talla?: string;
  Color?: string;
  Material?: string;
  CantidadStock: number;
  PrecioCompra: number;
  PrecioVenta: number;
  ProveedorID?: number;
  NombreProveedor?: string;
  FechaIngreso: string;
  Estado: 'activo' | 'descontinuado' | 'agotado';
  Descripcion?: string;
}

export interface Supplier {
  ProveedorID: number;
  NombreEmpresa: string;
  ContactoNombre: string;
  Telefono?: string;
  Email?: string;
  Direccion?: string;
  RUC?: string;
  Estado: 'activo' | 'inactivo';
  FechaRegistro: string;
}

export interface Client {
  UsuarioID: number;
  Email: string;
  Nombre: string;
  FechaRegistro: string;
  UltimoLogin?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductFormData {
  codigo_barras?: string;
  nombre_producto: string;
  categoria: string;
  subcategoria?: string;
  talla?: string;
  color?: string;
  material?: string;
  cantidad_stock: number;
  precio_compra: number;
  precio_venta: number;
  proveedor_id?: number;
  descripcion?: string;
}

export interface SupplierFormData {
  nombre_empresa: string;
  contacto_nombre: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ruc?: string;
}