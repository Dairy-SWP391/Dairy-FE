import { ImageType } from "../types/image";

interface ProductImageDetailProps {
  images: ImageType[] | undefined;
  className?: string;
}

// const slides = [
//   "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g.png?alt=media&token=12d90d31-d13f-46ef-b21b-032aed33424a",
//   "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g.jpg?alt=media&token=04bdc5f5-be0f-4eb3-b7e9-4d7a58012f7c",
//   "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g%20(2).jpg?alt=media&token=b67a352b-3717-4022-8374-8cadebc29e2d",
//   "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g%20(1).jpg?alt=media&token=2c67bdad-7e4c-4970-88ca-051eb48df2aa",
// ];

const ProductImageDetail = ({
  images = [],
  className,
}: ProductImageDetailProps) => {
  return (
    <>
      {images.length > 0 ? (
        <div
          className={`grid grid-rows-5 gap-2.5 rounded w-full h-[87%] ${className}`}
        >
          <div className="w-full row-span-4 border rounded h-full p-5">
            <div className="w-full h-full">
              <img
                className="h-full rounded"
                src={images[0].image_url}
                alt="img1"
              />
            </div>
          </div>
          <div className="row-span-1 grid grid-cols-4 gap-2 relative">
            <div className="border rounded w-full h-full">
              <img
                className="h-full rounded"
                src={images[0].image_url}
                alt="img1"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default ProductImageDetail;
