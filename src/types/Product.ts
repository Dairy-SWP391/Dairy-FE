// export interface ProductType {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
//   rating_number: number;
//   rating_point: number;
//   category_id: number;
//   images: string[];
//   brand?: string;
//   origin?: string;
//   producer?: string;
//   manufactured_at?: string;
//   weight?: number;
//   volume?: number;
//   target: ProductTarget;
//   starting_age?: number;
//   ending_age?: number;
//   caution?: string;
//   instruction?: string;
//   preservation?: string;
//   description?: string;
// }

export interface ProductType {
  id: number;
  name: string;
  brand_id: number;
  ProductPricing: [{ price: number }];
  category: {
    parent_category_id: number;
  };
  category_id: 6;
  caution: string | null;
  description: string | null;
  instruction: string | null;
  manufactured_at: string | null;
  origin: string | null;
  preservation: string | null;
  producer: string | null;
  quantity: number;
  rating_number: number;
  rating_point: number;
  sold: number;
  images: {
    id: number;
    parent_id: number;
    parent_type: "PRODUCT" | "POST";
    image_url: string;
  };
  status: "ACTIVE" | "INACTIVE";
  target: string | null;
  volumn: number | null;
  weight: number | null;
}

export enum ProductTarget {
  Baby = "Trẻ em",
  Adult = "Người lớn"
}
