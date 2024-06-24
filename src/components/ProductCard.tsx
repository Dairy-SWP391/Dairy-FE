import { Chip, Image } from "@nextui-org/react";
import TruncatedText from "./TruncatedText";
import { Rating } from "react-simple-star-rating";
import { numberToVND } from "../utils/converter";
import { CartIcon } from "./CartIcon";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image_url: string;
    rating_point: number;
    sold: number;
    sale: number;
    url_detail: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const nav = useNavigate();
  return (
    <>
      <button
        onClick={() => nav(product.url_detail)}
        className="flex flex-col border border-slate-500 bg-slate-100 rounded p-2 cursor-pointer"
      >
        <Image className="h-[200px] object-center" src={product.image_url} />
        <TruncatedText
          className="text-left min-h-12"
          text={product.name}
          width={200}
        />
        <div className="flex items-center justify-between w-full">
          <Rating
            initialValue={product.rating_point}
            readonly
            allowFraction
            SVGclassName={`inline-block`}
            size={16}
          />
          <p className="relative -top-[7px] translate-y-1/2 ml-3 text-slate-500 text-sm">
            Đã bán {product.sold}
          </p>
        </div>

        <div className="flex items-center mt-1 justify-between w-full">
          <div className="flex items-center">
            <p className="text-base font-semibold tracking-tight">
              {numberToVND(product.price)}
            </p>
            {product.sale > 0 && (
              <Chip
                color="default"
                variant="bordered"
                classNames={{
                  content: "font-semibold text-xs text-pink-600",
                  base: "bg-transparent border-pink-600 px-0 ml-3"
                }}
                size="sm"
              >
                - {product.sale}%
              </Chip>
            )}
          </div>
          <div className="flex items-center cursor-pointer">
            <CartIcon size={25} />
          </div>
        </div>
      </button>
    </>
  );
};

export default ProductCard;
