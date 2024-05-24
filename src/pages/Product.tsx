import Spring from "@components/Spring";
import { ProductType, ProductTarget } from "../types/Product";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Image,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { numberToVND } from "@utils/converter";
const product: ProductType = {
  id: 1,
  name: "Sữa Meiji Infant Formula 800g Sữa Meiji 800g (0-12 tháng)",
  quantity: 10,
  price: 529000,
  rating_number: 100,
  rating_point: 4.5,
  category_id: 1,
  images: [
    "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/uong_sua_th_true_milk_co_tang_chieu_cao_khong_1_8225eaac60.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFKlDn5zkmYyC91FgIXHg433W2Kkdwz94TGzVwlRBKWA&s",
  ],
  brand: "Meiji",
  origin: "Nhật Bản",
  manufactured_at: "Nhật Bản",
  weight: 800,
  target: ProductTarget.Baby,
  starting_age: 0,
  ending_age: 12,
  caution: "Sữa không phải là thức ăn chính",
  instruction:
    "Rửa tay trước khi pha.. Đảm bảo các đồ dùng và thiết bị sạch sẽ và được tiệt trùng trong nước sôi.. Sử dụng muỗng kèm trong hộp để lấy chính xác lượng bột cần thiết và đổ vào bình đã được tiệt trùng.. Đổ nước nóng vào bình khoảng 2/3 tổng khối lượng nước được chỉ định.. Đóng nắp bình và lắc nhẹ đến khi bột tan hoàn toàn.. Cho thêm nước sôi cho đủ khối lượng nước được chỉ định rồi lắc nhẹ..Để nguội xuống còn tầm 38 độ thì cho bé uống..Nếu muốn làm nguội nhanh, bạn có thể cho bình ngâm trong bát nước lạnh..Trước khi cho bé dùng, hãy kiểm tra nhiệt độ để tránh bỏng vòm họng của bé, nếu như nhỏ một vài giọt ra cổ tay mà chỉ còn âm ấm là có thể cho bé dùng được.",
  preservation:
    "Đậy kín nắp hộp sau khi mở và để ở nơi mát, khô ráo..Không nên cho sản phẩm vào tủ lạnh..Nên sử dụng trong vòng 4 tuần từ khi mở sản phẩm",
  description: "Sữa Meiji Infant Formula 800g (0-12 tháng)",
};

const relatedPost = {
  img: "https://yingcool.com.vn/wp-content/uploads/2023/11/yingcool-super-size-L.png",
  title: "Top 8 bỉm thấm hút tốt ban đêm cho bé ngủ ngon hơn",
  view_count: 100,
};

const ProductPropsList = [
  {
    name: "Tên sản phẩm",
    value: product.name,
  },
  {
    name: "Thương hiệu",
    value: product.brand,
  },
  {
    name: "Xuất xứ thương hiệu",
    value: product.origin,
  },
  {
    name: "Sản xuất tại",
    value: product.manufactured_at,
  },
  {
    name: "Trọng lượng sản phẩm",
    value: product.weight,
  },
  {
    name: "Thể tích sản phẩm",
    value: product.volume,
  },
  {
    name: "Độ tuổi phù hợp",
    value: `Cho trẻ từ ${product.starting_age} đến ${product.ending_age}`,
  },
  {
    name: "Cảnh báo",
    value: product.caution,
  },
  {
    name: "Hướng dẫn sử dụng",
    value: product.instruction,
  },
  {
    name: "Hướng dẫn bảo quản",
    value: product.preservation,
  },
];

type QuantityAction = "increase" | "decrease";

const Product = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const productPropsList = useMemo(
    () =>
      ProductPropsList.reduce<
        { name: string; value: string | number | undefined }[]
      >((acc, prop) => {
        if (prop.value) {
          acc.push(prop);
        }
        return acc;
      }, []),
    [],
  );

  const handleChangeQuantity = (action: QuantityAction) => {
    if (action === "increase") {
      quantity + 1 > product.quantity
        ? toast.error("Số lượng sản phẩm không đủ")
        : setQuantity(quantity + 1);
    } else {
      quantity - 1 >= 1 && setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="mx-auto w-5/6 mt-6 text-lg">
        <Breadcrumbs>
          <BreadcrumbItem>Trang Chủ</BreadcrumbItem>
          <BreadcrumbItem>Sữa, thực phẩm</BreadcrumbItem>
          <BreadcrumbItem>Sữa bột cao cấp</BreadcrumbItem>
          <BreadcrumbItem>{product.name}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Spring className="mx-auto card flex flex-col lg:col-span-3 xl:col-span-1 w-5/6 mt-6">
        <div className="grid grid-cols-5 gap-16 h-[80vh]">
          <div className="col-span-2 h-full w-full">
            <div className="grid grid-rows-6 gap-2.5 rounded w-full h-[90%]">
              <div className="w-full row-span-5 border rounded">
                <img
                  className="w-full h-full rounded"
                  src={product.images[0]}
                  alt="img1"
                />
              </div>
              <div className="grid grid-cols-4 row-span-1 gap-2">
                <div className="border rounded">
                  <img
                    className="w-full h-full rounded"
                    src={product.images[0]}
                    alt="img1"
                  />
                </div>
                <div className="border rounded">
                  <img
                    className="w-full h-full rounded"
                    src={product.images[0]}
                    alt="img1"
                  />
                </div>
                <div className="border rounded">
                  <img
                    className="w-full h-full rounded"
                    src={product.images[0]}
                    alt="img1"
                  />
                </div>
                <div className="border rounded">
                  <img
                    className="w-full h-full rounded"
                    src={product.images[0]}
                    alt="img1"
                  />
                </div>
              </div>
            </div>
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
                {product.brand}
              </p>
            </div>
            <h3 className="mt-5">{product.name}</h3>
            <div className="mt-5">
              <p className="inline font-bold underline mr-3">
                {product.rating_point}
              </p>
              <span className="fa fa-star checked text-yellow-400 mr-1"></span>
              <span className="fa fa-star checked text-yellow-400 mr-1"></span>
              <span className="fa fa-star checked text-yellow-400 mr-1"></span>
              <span className="fa fa-star mr-1"></span>
              <span className="fa fa-star "></span>
              <div className="inline mx-4">|</div>
              <p className="inline font-bold underline mr-1">
                {product.rating_number}
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
                    {numberToVND(product.price * 0.9)}
                  </p>
                  <Chip
                    color="default"
                    variant="bordered"
                    classNames={{
                      content: "font-normal text-xl text-pink-600",
                      base: "bg-transparent border-pink-600",
                    }}
                  >
                    - 10%
                  </Chip>
                </div>
                <p className="mt-2 text-xl line-through">
                  {numberToVND(product.price)}
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
              <Button className="text-white text-xl" size="lg" color="warning">
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
          <div className="grid grid-rows-7 gap-3">
            <div className="row-span-5 mx-auto">
              <img
                className="w-full h-full rounded"
                src={product.images[0]}
                alt="img1"
              />
            </div>
            <div className="row-span-2 ">
              <p className="text-sm">{product.name}</p>
              <div className="flex items-center text-sm">
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <p className="ml-1">(289)</p>
              </div>
              <p className="text-xl font-bold">{numberToVND(product.price)}</p>
            </div>
          </div>
          <div className="grid grid-rows-7 gap-3">
            <div className="row-span-5 mx-auto">
              <img
                className="w-full h-full rounded"
                src={product.images[0]}
                alt="img1"
              />
            </div>
            <div className="row-span-2 ">
              <p className="text-sm">{product.name}</p>
              <div className="flex items-center text-sm">
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <p className="ml-1">(289)</p>
              </div>
              <p className="text-xl font-bold">{numberToVND(product.price)}</p>
            </div>
          </div>
          <div className="grid grid-rows-7 gap-3">
            <div className="row-span-5 mx-auto">
              <img
                className="w-full h-full rounded"
                src={product.images[0]}
                alt="img1"
              />
            </div>
            <div className="row-span-2 ">
              <p className="text-sm">{product.name}</p>
              <div className="flex items-center text-sm">
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <p className="ml-1">(289)</p>
              </div>
              <p className="text-xl font-bold">{numberToVND(product.price)}</p>
            </div>
          </div>
          <div className="grid grid-rows-7 gap-3">
            <div className="row-span-5 mx-auto">
              <img
                className="w-full h-full rounded"
                src={product.images[0]}
                alt="img1"
              />
            </div>
            <div className="row-span-2 ">
              <p className="text-sm">{product.name}</p>
              <div className="flex items-center text-sm">
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <p className="ml-1">(289)</p>
              </div>
              <p className="text-xl font-bold">{numberToVND(product.price)}</p>
            </div>
          </div>
          <div className="grid grid-rows-7 gap-3">
            <div className="row-span-5 mx-auto">
              <img
                className="w-full h-full rounded"
                src={product.images[0]}
                alt="img1"
              />
            </div>
            <div className="row-span-2 ">
              <p className="text-sm">{product.name}</p>
              <div className="flex items-center text-sm">
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <span className="fa fa-star checked text-yellow-400 mr-0.5"></span>
                <p className="ml-1">(289)</p>
              </div>
              <p className="text-xl font-bold">{numberToVND(product.price)}</p>
            </div>
          </div>
        </div>
      </Spring>

      <div className="mx-auto w-5/6 grid grid-cols-7 gap-10 mt-10">
        <div className="col-span-5">
          <Spring className="card">
            <h1>Chi Tiết Sản Phẩm</h1>
            <table className="border border-black border-collapse p-3 mt-5">
              {productPropsList.map(({ name, value }, index) => {
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
              <div className="mt-5">{product.description}</div>
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
                        <span className="fa fa-star checked text-yellow-400 mr-1"></span>
                        <span className="fa fa-star checked text-yellow-400 mr-1"></span>
                        <span className="fa fa-star checked text-yellow-400 mr-1"></span>
                        <span className="fa fa-star checked text-yellow-400 mr-1"></span>
                        <span className="fa fa-star checked text-yellow-400 mr-1"></span>
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
                          5{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          5{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          5{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                        <Button size="md" variant="bordered" className="mr-3">
                          5{" "}
                          <span className="fa fa-star checked text-lg text-yellow-400 mr-1"></span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              {productPropsList.map((_item, index) => {
                return (
                  index <= 3 && (
                    <div className="grid grid-cols-10 gap-5 mt-5 border-b-2 pb-5">
                      <div className="flex col-span-1 justify-center mt-2">
                        <Avatar
                          name="B"
                          size="lg"
                          classNames={{
                            base: "border border-pink-400 bg-pink-200",
                            name: "text-slate-500 text-2xl font-bold",
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

export default Product;
