import { Card, Image } from "@nextui-org/react";
import Spring from "../components/Spring";
import ProductCard from "../components/ProductCard";
import { useCategoryStore } from "../store/category";

const product = {
  id: 2,
  name: "Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure vani",
  price: 500000,
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g.png?alt=media&token=12d90d31-d13f-46ef-b21b-032aed33424a",
  rating_point: 5,
  sold: 100,
  sale: 10
};

const Home = () => {
  const category = useCategoryStore((state) => state.category);

  return (
    <>
      <div className="w-4/5 mx-auto z-0">
        <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/slide-img9.jpg?1717043803052" />
        <div className="flex items-center flex-col w-full mt-10">
          <button className="text-3xl px-16 py-6 border-none rounded-3xl bg-pink-300 text-white font-bold">
            MẸ CẦN TÌM GÌ
          </button>
          <div className="grid grid-cols-6 gap-16 w-full px-20 mt-5">
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_1.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Sữa bột
              </p>
            </div>
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_2.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Sữa tươi
              </p>
            </div>
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_4.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Sữa cho mẹ
              </p>
            </div>
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_3.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Sữa cho bé
              </p>
            </div>
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_7.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Vitamin
              </p>
            </div>
            <div className="w-full flex items-center flex-col cursor-pointer">
              <Image src="https://bizweb.dktcdn.net/100/416/540/themes/839121/assets/image_cat_7.jpg?1717043803052" />
              <p className="font-bold text-xl text-indigo-700 text-center">
                Đồ dùng mẹ & bé
              </p>
            </div>
          </div>
        </div>

        <Spring className="card mt-10 z-0">
          <div className="flex items-center justify-between">
            <h3>
              Giá <p className="inline text-red-500">Sốc</p>
            </h3>
            <p className="text-lg text-pink-500 font-medium cursor-pointer">
              Xem tất cả {`>>`}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
          </div>
        </Spring>

        <Spring className="card mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-pink-500">Bán Chạy</h3>
            <p className="text-lg text-pink-500 font-medium cursor-pointer">
              Xem tất cả {`>>`}
            </p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
            <ProductCard product={product} />
          </div>
        </Spring>

        {category.map((cate, index) => {
          return (
            cate.name !== "TIN TỨC" && (
              <Spring className="card mt-6" key={index}>
                <div className="flex items-center justify-between">
                  <h3 className="text-pink-500">{cate.name}</h3>
                  <p className="text-lg text-pink-500 font-medium cursor-pointer">
                    Xem tất cả {`>>`}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  <ProductCard product={product} />
                  <ProductCard product={product} />
                  <ProductCard product={product} />
                  <ProductCard product={product} />
                  <ProductCard product={product} />
                </div>
              </Spring>
            )
          );
        })}

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="pl-5 text-pink-500">THÔNG TIN BỔ ÍCH</h3>
            <p className="text-lg text-pink-500 font-medium cursor-pointer">
              Xem tất cả {`>>`}
            </p>
          </div>
          <div className="w-full flex justify-between h-[60vh] mt-4">
            <div className="w-[63%] h-full">
              <Card className="h-full">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-fill"
                  src="https://cdn1.concung.com/img/news/2023/1030-1684377364-cover.webp"
                />
                <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                  <h4 className="text-white font-semibold text-large z-10">
                    Top 5 loại đồ chơi cho bé 2 tuổi phát triển trí thông minh
                  </h4>
                </div>
              </Card>
            </div>
            <div className="w-[36%] flex flex-col justify-between">
              <div className="h-[49%] w-full">
                <Card className="h-full">
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-fill"
                    src="https://cdn1.concung.com/img/news/2023/1030-1684377364-cover.webp"
                  />
                  <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                    <h4 className="text-white font-semibold text-base z-10">
                      Top 5 loại đồ chơi cho bé 2 tuổi phát triển trí thông minh
                    </h4>
                  </div>
                </Card>
              </div>
              <div className="h-[49%] w-full">
                <Card className="h-full">
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-fill"
                    src="https://cdn1.concung.com/img/news/2023/1030-1684377364-cover.webp"
                  />
                  <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                    <h4 className="text-white font-semibold text-base z-10">
                      Top 5 loại đồ chơi cho bé 2 tuổi phát triển trí thông minh
                    </h4>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
