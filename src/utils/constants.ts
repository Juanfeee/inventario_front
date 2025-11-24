export const PRODUCT_CATEGORIES = [
  'Ropa',
  'Calzado',
  'Accesorios',
  'Electrónicos',
  'Hogar',
  'Deportes',
  'Juguetes',
  'Libros',
  'Otros'
];

export const PRODUCT_SUBCATEGORIES: Record<string, string[]> = {
  'Ropa': ['Camisas', 'Pantalones', 'Vestidos', 'Chaquetas', 'Ropa Interior'],
  'Calzado': ['Deportivos', 'Formales', 'Casuales', 'Sandalias', 'Botas'],
  'Accesorios': ['Bolsos', 'Gorras', 'Joyeria', 'Relojes', 'Gafas'],
  'Electrónicos': ['Smartphones', 'Laptops', 'Tablets', 'Audio', 'Cámaras'],
  'Hogar': ['Cocina', 'Decoración', 'Muebles', 'Iluminación', 'Jardín'],
  'Deportes': ['Fitness', 'Ciclismo', 'Natación', 'Camping', 'Golf'],
  'Juguetes': ['Educativos', 'Juegos', 'Muñecas', 'Vehiculos', 'Puzzles'],
  'Libros': ['Ficción', 'No Ficción', 'Educativos', 'Infantiles', 'Cocina']
};

export const PRODUCT_SIZES = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'Única'
];

export const PRODUCT_COLORS = [
  'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Café', 'Amarillo', 
  'Naranja', 'Morado', 'Rosa', 'Beige', 'Plateado', 'Dorado'
];

export const PRODUCT_MATERIALS = [
  'Algodón', 'Poliéster', 'Lana', 'Seda', 'Cuero', 'Denim', 'Lino',
  'Cuero Sintético', 'Nylon', 'Spandex', 'Terciopelo', 'Gamuza'
];