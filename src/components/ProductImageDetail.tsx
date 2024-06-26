import { ImageType } from "../types/image";
import Carousel from "./Carousel";

interface ProductImageDetailProps {
  images: ImageType[];
  className?: string;
}

const ProductImageDetail = ({ images, className }: ProductImageDetailProps) => {
  const imagesUrl = images?.reduce((acc: string[], cur: ImageType) => {
    return [...acc, cur.image_url];
  }, []);
  return (
    <>
      {imagesUrl.length > 0 && <Carousel slides={imagesUrl} subSlide="IMAGE" />}
    </>
  );
};

export default ProductImageDetail;
