export interface Product {
  id: string;
  image: string;
  category: string;
  liked: boolean;
  addedToCart: boolean;
  originalPrice: string;
  discountPrice: string;
  name: string;
}

export type ProductsState = {
  products: Product[];
};
