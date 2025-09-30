export interface Product {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
}

export interface ProductApi {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}