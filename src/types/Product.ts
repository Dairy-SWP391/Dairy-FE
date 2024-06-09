export interface ProductType {
  id: number;
  name: string;
  quantity: number;
  price: number;
  rating_number: number;
  rating_point: number;
  category_id: number;
  images: string[];
  brand?: string;
  origin?: string;
  producer?: string;
  manufactured_at?: string;
  weight?: number;
  volume?: number;
  target: ProductTarget;
  starting_age?: number;
  ending_age?: number;
  caution?: string;
  instruction?: string;
  preservation?: string;
  description?: string;
}

export enum ProductTarget {
  Baby = "Trẻ em",
  Adult = "Người lớn"
}
