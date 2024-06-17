import { Card, Image } from "@nextui-org/react";
import Spring from "../components/Spring";
import ProductCard from "../components/ProductCard";
import { useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";
import { getProductByCategory } from "../apis/category";
import { ProductType } from "../types/Product";
import { getSalesRatio, stringToNomalCase } from "../utils/converter";

const productTemplate = {
  id: 2,
  name: "Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure vani",
  price: 500000,
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g.png?alt=media&token=12d90d31-d13f-46ef-b21b-032aed33424a",
  rating_point: 5,
  sold: 100,
  sale: 10,
  url_detail: "/"
};

const Home = () => {
  const [productsByCate1, setProductsByCate1] = useState<ProductType[]>();
  // const [productsByCate2, setProductsByCate2] = useState<ProductType[]>();
  // const [productsByCate3, setProductsByCate3] = useState<ProductType[]>();
  // const [productsByCate4, setProductsByCate4] = useState<ProductType[]>();
  // const [productsByCate5, setProductsByCate5] = useState<ProductType[]>();
  const category = useCategoryStore((state) => state.category);

  useEffect(() => {
    const fetchData = async (id: number) => {
      const response = await getProductByCategory({
        num_of_product: 5,
        parent_category_id: id,
        page: 1
      });
      // console.log(response.data.data);
      if (id === 1) setProductsByCate1(response.data.data);
      // if (id === 2) setProductsByCate2(response.data.data);
      // if (id === 3) setProductsByCate3(response.data.data);
      // if (id === 4) setProductsByCate4(response.data.data);
      // if (id === 5) setProductsByCate5(response.data.data);
    };
    category.forEach((cate) => {
      fetchData(cate.id);
    });
    console.log(category);
    console.log("ahihi");
    console.log(productsByCate1);
    console.log(getSalesRatio(599000, 500000));
    // for (const property in productsByCate) {
    //   productsByCate[property].map((product) => {
    //     console.log(product.name);
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
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
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
            <ProductCard product={productTemplate} />
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
                  {cate.id === 1 &&
                    productsByCate1?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_urls[0],
                            rating_point: product.rating_point,
                            sold: product.sold,
                            sale: getSalesRatio(
                              product.price,
                              product.sale_price || product.price
                            ),
                            url_detail: `/${cate.path}/${cate.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${stringToNomalCase({ str: product.name, id: product.id })}`
                          }}
                          key={product.id}
                        />
                      );
                    })}
                  {cate.id === 2 &&
                    productsByCate1?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_urls[0],
                            rating_point: product.rating_point,
                            sold: product.sold,
                            sale: getSalesRatio(
                              product.price,
                              product.sale_price || product.price
                            ),
                            url_detail: `/${cate.path}/${cate.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${product.id}`
                          }}
                          key={product.id}
                        />
                      );
                    })}
                  {cate.id === 3 &&
                    productsByCate1?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_urls[0],
                            rating_point: product.rating_point,
                            sold: product.sold,
                            sale: getSalesRatio(
                              product.price,
                              product.sale_price || product.price
                            ),
                            url_detail: `/${cate.path}/${cate.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${product.id}`
                          }}
                          key={product.id}
                        />
                      );
                    })}
                  {cate.id === 4 &&
                    productsByCate1?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_urls[0],
                            rating_point: product.rating_point,
                            sold: product.sold,
                            sale: getSalesRatio(
                              product.price,
                              product.sale_price || product.price
                            ),
                            url_detail: `/${cate.path}/${cate.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${product.id}`
                          }}
                          key={product.id}
                        />
                      );
                    })}
                  {/* {productsByCate.map((cate) => {
                    return cate.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.ProductPricing[0].price,
                            image_url:
                              "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/combo-3-lon-sua-abbott-pediasure-1-10-tuoi-850g.png?alt=media",
                            rating_point: product.rating_point,
                            sold: product.sold,
                            sale: 10
                          }}
                          key={product.id}
                        />
                      );
                    });
                  })} */}
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
