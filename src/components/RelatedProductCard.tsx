/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Rating } from "react-simple-star-rating";
import { numberToVND } from "../utils/converter";
import { Chip, Image } from "@nextui-org/react";
import TruncatedText from "./TruncatedText";
import { useNavigate } from "react-router-dom";

interface RelatedProductCardProps {
  image_url: string;
  name: string;
  rating_point: number;
  rating_number: number;
  price: number;
  sale: number;
  url: string;
}

const RelatedProductCard = ({
  image_url,
  name,
  price,
  rating_point,
  rating_number,
  sale,
  url
}: RelatedProductCardProps) => {
  const nav = useNavigate();
  return (
    <>
      <div className="gap-3 cursor-pointer" onClick={() => nav(url)}>
        <div className="mx-auto">
          <Image
            className="rounded h-56 w-56 object-contain z-0"
            src={image_url ? image_url : ""}
            alt="img1"
          />
        </div>
        <div className="mt-5">
          <div className="min-h-12">
            <TruncatedText text={name ? name : ""} width={200} />
          </div>
          <div className="flex items-start text-sm">
            <Rating
              initialValue={rating_point ? rating_point : 0}
              readonly
              size={18}
              allowFraction
              SVGclassName={`inline-block`}
            />
            <p className="ml-1 translate-y-[2px]">
              ({rating_number ? rating_number : 0})
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xl font-bold pr-5">
              {numberToVND(price ? price : 0)}
            </p>
            {sale > 0 && (
              <Chip
                color="default"
                variant="bordered"
                classNames={{
                  content: "font-semibold text-xs text-pink-600",
                  base: "bg-transparent border-pink-600 px-0 ml-3"
                }}
                size="sm"
              >
                - {sale}%
              </Chip>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProductCard;
