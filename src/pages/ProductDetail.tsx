import Spring from "../components/Spring";
import { Avatar, Button, Card, CardBody, Chip, Image } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSalesRatio,
  numberToVND,
  stringToNomalCase
} from "../utils/converter";
import { useNavigate, useParams } from "react-router-dom";
import { Product, getProductDetail } from "../apis/product";
import { Rating } from "react-simple-star-rating";
import ProductImageDetail from "../components/ProductImageDetail";
import { useCartStore } from "../store/cart";
import RelatedProductCard from "../components/RelatedProductCard";
import { getProductByCategory } from "../apis/category";
import { useCategoryStore } from "../store/category";
import { ProductType } from "../types/Product";
// import RelatedProductCard from "../components/RelatedProductCard";

const relatedPost = {
  img: "https://yingcool.com.vn/wp-content/uploads/2023/11/yingcool-super-size-L.png",
  title: "Top 8 bỉm thấm hút tốt ban đêm cho bé ngủ ngon hơn",
  view_count: 100
};

type QuantityAction = "increase" | "decrease";

const ProductDetail = () => {
  const nav = useNavigate();
  const params = useParams<{ id: string }>().id;
  const [relatedProduct, setRelatedProduct] = useState<ProductType[]>([]);
  const setRelatedProductMemoized = useCallback((data: ProductType[]) => {
    setRelatedProduct(data);
  }, []);
  const [parent_category_id, setParent_category_id] = useState<number>(0);
  const id = params?.split("-").pop();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const ProductPropsList = [
    {
      name: "Tên sản phẩm",
      value: product?.name
    },
    {
      name: "Thương hiệu",
      value: product?.brand
    },
    {
      name: "Xuất xứ thương hiệu",
      value: product?.origin
    },
    {
      name: "Sản xuất tại",
      value: product?.manufactured_at
    },
    {
      name: "Trọng lượng sản phẩm",
      value: product?.weight
    },
    {
      name: "Thể tích sản phẩm",
      value: product?.volume
    },
    {
      name: "Độ tuổi phù hợp",
      value: product?.target
    },
    {
      name: "Cảnh báo",
      value: product?.caution
    },
    {
      name: "Hướng dẫn sử dụng",
      value: product?.instruction
    },
    {
      name: "Hướng dẫn bảo quản",
      value: product?.preservation
    }
  ];
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const productPropsList = ProductPropsList.reduce<
    { name: string; value: string | number | undefined }[]
  >((acc, prop) => {
    if (prop.value) {
      acc.push(prop);
    }
    return acc;
  }, []);
  const addToCart = useCartStore((state) => state.setCart);
  const cart = useCartStore((state) => state.cart);
  const category = useCategoryStore((state) => state.category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductDetail(id as string);
        if (
          params !==
          stringToNomalCase({
            str: response.data.data.name,
            id: response.data.data.id
          })
        ) {
          nav("/404");
        }
        setProduct(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getParentCategoryId = (category_id: number) => {
      category.forEach((cate) => {
        cate.child_category.forEach((subCate) => {
          if (subCate.id === category_id) {
            setParent_category_id(subCate.parent_category_id);
          }
        });
      });
    };
    getParentCategoryId(product?.category_id as number);
    const getRelatedProduct = async () => {
      try {
        const response = await getProductByCategory({
          page: 1,
          num_of_product: 5,
          parent_category_id: parent_category_id,
          category_id: product?.category_id
        });
        setRelatedProductMemoized(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    window.scrollTo(0, 0);
    fetchData();
    getRelatedProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setRelatedProductMemoized, product?.id, parent_category_id]);

  const handleChangeQuantity = (action: QuantityAction) => {
    if (action === "increase" && product) {
      quantity + 1 > product.quantity
        ? toast.error("Số lượng sản phẩm không đủ")
        : setQuantity(quantity + 1);
    } else {
      quantity - 1 >= 1 && setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const ahihi = cart.find((item) => item.id === product?.id);
    if (ahihi) {
      const newCart = cart.map((item) => {
        if (item.id === product?.id) {
          if (item.quantity + quantity > item.max_quantity) {
            toast.error("Số lượng sản phẩm không đủ");
            return item;
          }
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
      addToCart(newCart);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    } else {
      addToCart([
        ...cart,
        {
          id: product?.id as number,
          name: product?.name as string,
          price: product?.price as number,
          sale: 10,
          quantity: quantity,
          max_quantity: product?.quantity as number,
          image: product?.images[0].image_url as string
        }
      ]);
      toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    }
  };

  return (
    <>
      <Spring className="mx-auto card flex flex-col lg:col-span-3 xl:col-span-1 w-5/6">
        <div className="grid grid-cols-5 gap-16 h-[80vh]">
          <div className="col-span-2 h-full w-full">
            <ProductImageDetail images={product?.images} />
            <div className="h-[10%] flex items-end justify-center">
              <div className="flex items-center">
                <p className="mr-2">Chia sẻ:</p>
                <i className="fa fa-facebook-square text-blue-500 text-3xl mx-1 hover:cursor-pointer"></i>
                <i className="fa fa-facebook-square text-blue-500 text-3xl mx-1 hover:cursor-pointer"></i>
                <i className="fa fa-facebook-square text-blue-500 text-3xl mx-1 hover:cursor-pointer"></i>
              </div>
              <p className="mx-7 text-3xl font-thin text-slate-300">|</p>
              <div className="flex items-center">
                <i
                  className="fa fa-heart-o text-pink-500 text-3xl hover:cursor-pointer font-bold mr-2"
                  aria-hidden="true"
                ></i>
                <p className="mr-1">Đã thích</p>
                <p className="text-pink-500">(280)</p>
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="tracking-wide">
              Thương hiệu:
              <p className="inline text-indigo-600 font-bold text-base hover:cursor-pointer">
                {product?.brand}
              </p>
            </div>
            <h3 className="mt-5">{product?.name}</h3>
            <div className="mt-5 flex items-center">
              <p className="inline font-bold underline mr-3">
                {product?.rating_point}
              </p>
              <Rating
                initialValue={product?.rating_point}
                readonly
                size={25}
                allowFraction
                SVGclassName={`inline-block`}
              />
              <div className="inline mx-4">|</div>
              <p className="inline font-bold underline mr-1">
                {product?.rating_number}
              </p>
              đánh giá
            </div>
            <Card className="mt-7 bg-pink-600 w-2/3 ">
              <CardBody className="text-white font-normal text-sm">
                Kết thúc sau: 12:27:45
              </CardBody>
            </Card>
            <Card className="mt-7 px-3 bg-slate-100 w-2/3 ">
              <CardBody>
                <div className="flex items-center">
                  <p className="text-3xl mr-5">
                    {product?.price && numberToVND(product?.price * 0.9)}
                  </p>
                  <Chip
                    color="default"
                    variant="bordered"
                    classNames={{
                      content: "font-normal text-xl text-pink-600",
                      base: "bg-transparent border-pink-600"
                    }}
                  >
                    - 10%
                  </Chip>
                </div>
                <p className="mt-2 text-xl line-through">
                  {product?.price && numberToVND(product?.price)}
                </p>
              </CardBody>
            </Card>
            <div className="mt-8 flex items-center">
              <p className="tracking-wide">Số lượng</p>
              <Button
                className="text-2xl ml-20 mr-5"
                onClick={() => handleChangeQuantity("decrease")}
                size="sm"
                isIconOnly
              >
                -
              </Button>
              <p>{quantity}</p>
              <Button
                className="text-2xl ml-5"
                onClick={() => handleChangeQuantity("increase")}
                size="sm"
                isIconOnly
              >
                +
              </Button>
            </div>
            <div className="w-2/3 grid grid-cols-2 gap-5 mt-7 ">
              <Button
                className="text-white text-xl"
                size="lg"
                color="warning"
                onClick={handleAddToCart}
                type="button"
              >
                Thêm Vào Giỏ Hàng
              </Button>
              <Button className="text-white text-xl" size="lg" color="danger">
                Mua Ngay
              </Button>
            </div>
          </div>
        </div>
      </Spring>

      <Spring className="mx-auto card w-5/6 mt-10 h-auto">
        <h3>Sản Phẩm Tương Tự</h3>
        <div className="grid grid-cols-5 gap-4 mt-5 h-[48vh]">
          {relatedProduct.map((item) => (
            <RelatedProductCard
              key={item.id}
              image_url={item?.image_urls[0]}
              name={item?.name as string}
              price={item.sale_price || item?.price}
              rating_point={item?.rating_point as number}
              rating_number={item.rating_number}
              sale={getSalesRatio(item?.price, item.sale_price || item.price)}
            />
          ))}
        </div>
      </Spring>

      <div className="mx-auto w-5/6 grid grid-cols-7 gap-10 mt-10">
        <div className="col-span-5">
          <Spring className="card">
            <h1>Chi Tiết Sản Phẩm</h1>
            <table className="border border-black border-collapse p-3 mt-5">
              {productPropsList?.map(({ name, value }, index) => {
                return (
                  value && (
                    <tr
                      key={name}
                      className={`${index % 2 !== 0 && "bg-slate-100"}`}
                    >
                      <td className="border border-slate-300 w-1/4 p-3">
                        {name}
                      </td>
                      <td className="border border-slate-300 w-3/4 p-3">
                        {value}
                      </td>
                    </tr>
                  )
                );
              })}
            </table>
            {!showDescription && (
              <Button
                className="mx left-1/2 -translate-x-2/4 mt-5 w-1/3 text-lg bg-transparent border border-slate-700"
                onClick={() => setShowDescription(true)}
              >
                Xem thêm
              </Button>
            )}

            {showDescription && (
              <div className="mt-5">{product?.description}</div>
            )}
          </Spring>
          <div className="col-span-4 mt-10">
            <Spring className="card">
              <h3>Đánh giá</h3>
              <Card className="mt-5 bg-orange-100 mb-10">
                <CardBody>
                  <div className="grid grid-cols-9 gap-3">
                    <div className="col-span-3 flex flex-col items-center">
                      <div>
                        <p className="inline text-4xl font-bold text-pink-500">
                          5.0
                        </p>
                        <p className="inline text-2xl font-bold text-gray-600">
                          /5.0
                        </p>
                      </div>
                      <div className="text-xl">
                        <Rating
                          initialValue={product?.rating_point}
                          readonly
                          size={30}
                          allowFraction
                          SVGclassName={`inline-block`}
                        />
                      </div>
                      <p className="font-bold text-gray-600 text-base">
                        Có <p className="inline text-black">82</p> lượt đánh giá
                      </p>
                    </div>
                    <div className="grid grid-rows-2 gap-5">
                      <div className="flex items-center">
                        <Button
                          className="w-5/12 font-semibold mr-4 text-pink-500 border-pink-500 text-md"
                          variant="bordered"
                        >
                          Mới nhất
                        </Button>
                        <Button
                          className="w-5/12 font-semibold text-md"
                          variant="bordered"
                        >
                          Đã mua nhiều nhất
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <Button
                          size="md"
                          variant="bordered"
                          className="mr-3 text-lg"
                        >
                          5{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          4{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          3{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          2{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          1{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              {productPropsList?.map((_item, index) => {
                return (
                  index <= 3 && (
                    <div className="grid grid-cols-10 gap-5 mt-5 border-b-2 pb-5">
                      <div className="flex col-span-1 justify-center mt-2">
                        <Avatar
                          name="B"
                          size="lg"
                          classNames={{
                            base: "border border-pink-400 bg-pink-200",
                            name: "text-slate-500 text-2xl font-bold"
                          }}
                        />
                      </div>
                      <div className="col-span-9">
                        <p className="text-lg font-bold">Ba Mẹ</p>
                        <div className="flex items-center">
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                          <p className="text-sm text-slate-500 px-2">
                            21/05/2024 10:37
                          </p>
                        </div>
                        <div className="min-h-6">
                          <p>Hàng tốt giá rẻ, nên mua Hàng tốt giá rẻ</p>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </Spring>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center sticky top-32 h-fit">
          <p className="text-2xl font-bold">Thông Tin Bổ Ích</p>
          <div className="hover:cursor-pointer">
            <Spring className="mt-5 w-full rounded bg-pink-100 p-3">
              <div className="">
                <Image src={relatedPost.img} />
              </div>
              <p className="px-1 mt-2 font-medium">{relatedPost.title}</p>
              <div className="px-2 mt-1 flex justify-between">
                <div className="flex items-center">
                  <i
                    className="fa fa-eye text-slate-500"
                    aria-hidden="true"
                  ></i>
                  <p className="ml-2">{relatedPost.view_count}</p>
                </div>
                <button className="bg-white rounded-full py-1 px-2 right-1/4">
                  <i
                    className="fa fa-arrow-right text-pink-500"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </Spring>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
