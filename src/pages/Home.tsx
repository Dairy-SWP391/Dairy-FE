import { Card, Image, Link } from "@nextui-org/react";
import Spring from "../components/Spring";
import ProductCard from "../components/ProductCard";
import { useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";
import { getProductByCategory } from "../apis/category";
import { ProductType } from "../types/Product";
import { getSalesRatio, stringToNomalCase } from "../utils/converter";
import { useNavigate } from "react-router-dom";
import { BlogType, getAllBlog } from "../apis/blog";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [hotDeal, setHotDeal] = useState<ProductType[]>();
  const [bestSeller, setBestSeller] = useState<ProductType[]>();
  const [productsByCate1, setProductsByCate1] = useState<ProductType[]>();
  const [productsByCate2, setProductsByCate2] = useState<ProductType[]>();
  const [productsByCate3, setProductsByCate3] = useState<ProductType[]>();
  const [productsByCate4, setProductsByCate4] = useState<ProductType[]>();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const nav = useNavigate();

  const category = useCategoryStore((state) => state.category);

  useEffect(() => {
    const fetchData = async ({
      id,
      order_by,
      sort_by
    }: {
      id: number;
      order_by?: "ASC" | "DESC";
      sort_by?: "price" | "rating_point" | "sold" | "discount";
    }) => {
      const response = await getProductByCategory({
        num_of_product: 5,
        parent_category_id: id,
        page: 1,
        order_by: order_by,
        sort_by: sort_by
      });
      // console.log(response.data.data);
      if (id === 1) setProductsByCate1(response.data.data.products);
      if (id === 2) setProductsByCate2(response.data.data.products);
      if (id === 3) setProductsByCate3(response.data.data.products);
      if (id === 4) setProductsByCate4(response.data.data.products);
      if (id === 0 && order_by === "DESC" && sort_by === "discount")
        setHotDeal(response.data.data.products);
      if (id === 0 && order_by === "DESC" && sort_by === "sold")
        setBestSeller(response.data.data.products);
      // if (id === 5) setProductsByCate5(response.data.data);
    };
    category.forEach((cate) => {
      fetchData({ id: cate.id });
    });
    fetchData({ id: 0, order_by: "DESC", sort_by: "discount" });
    fetchData({ id: 0, order_by: "DESC", sort_by: "sold" });
  }, [category]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllBlog({ limit: 3, page: 1 });
        if (response.status === 200) {
          setBlogs(response.data.result.posts);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  }, []);

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
            {/* <p className="text-lg text-pink-500 font-medium cursor-pointer">
              Xem tất cả {`>>`}
            </p> */}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {hotDeal?.map((product) => {
              return (
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.sale_price || product.price,
                    image_url: product.image_urls[0],
                    rating_point: product.rating_point,
                    sold: product.sold,
                    sale: getSalesRatio(
                      product.price,
                      product.sale_price || product.price
                    ),
                    url_detail: `/${category.find((item) => item.id === product.parent_category_id)?.path}/${category.find((item) => item.id === product.parent_category_id)?.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${stringToNomalCase({ str: product.name, id: product.id })}`
                  }}
                  key={product.id}
                />
              );
            })}
          </div>
        </Spring>

        <Spring className="card mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-pink-500">Bán Chạy</h3>
            {/* <p className="text-lg text-pink-500 font-medium cursor-pointer">
              Xem tất cả {`>>`}
            </p> */}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {bestSeller?.map((product) => {
              return (
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.sale_price || product.price,
                    image_url: product.image_urls[0],
                    rating_point: product.rating_point,
                    sold: product.sold,
                    sale: getSalesRatio(
                      product.price,
                      product.sale_price || product.price
                    ),
                    url_detail: `/${category.find((item) => item.id === product.parent_category_id)?.path}/${category.find((item) => item.id === product.parent_category_id)?.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${stringToNomalCase({ str: product.name, id: product.id })}`
                  }}
                  key={product.id}
                />
              );
            })}
          </div>
        </Spring>

        {category.map((cate, index) => {
          return (
            cate.name !== "TIN TỨC" && (
              <Spring className="card mt-6" key={index}>
                <div className="flex items-center justify-between">
                  <h3 className="text-pink-500">{cate.name}</h3>
                  <button
                    className="text-lg text-pink-500 font-medium cursor-pointer"
                    onClick={() => nav(`${cate.path}`)}
                  >
                    Xem tất cả {`>>`}
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {cate.id === 1 &&
                    productsByCate1?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.sale_price || product.price,
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
                    productsByCate2?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.sale_price || product.price,
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
                  {cate.id === 3 &&
                    productsByCate3?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.sale_price || product.price,
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
                  {cate.id === 4 &&
                    productsByCate4?.map((product) => {
                      return (
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            price: product.sale_price || product.price,
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
                </div>
              </Spring>
            )
          );
        })}

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="pl-5 text-pink-500">THÔNG TIN BỔ ÍCH</h3>
            <Link
              className="text-lg text-pink-500 font-medium cursor-pointer"
              href="/tin-tuc"
            >
              Xem tất cả {`>>`}
            </Link>
          </div>
          <div className="w-full flex justify-between h-[60vh] mt-4">
            <div className="w-[63%] h-full">
              <Card className="h-full">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-fill"
                  src={blogs[0]?.image}
                />
                <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                  <Link
                    className="text-white font-semibold text-large z-10 hover:text-blue-500"
                    href={`/tin-tuc/${blogs[0]?.id}`}
                  >
                    {blogs[0]?.title}
                  </Link>
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
                    src={blogs[1]?.image}
                  />
                  <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                    <Link
                      className="text-white font-semibold text-base z-10 hover:text-blue-500"
                      href={`/tin-tuc/${blogs[1]?.id}`}
                    >
                      {blogs[1]?.title}
                    </Link>
                  </div>
                </Card>
              </div>
              <div className="h-[49%] w-full">
                <Card className="h-full">
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-fill"
                    src={blogs[2]?.image}
                  />
                  <div className="bg-gradient-to-t from-black absolute w-full bottom-0 px-5 pb-3 pt-16">
                    <Link
                      className="text-white font-semibold text-base z-10 hover:text-blue-500"
                      href={`/tin-tuc/${blogs[1]?.id}`}
                    >
                      {blogs[2]?.title}
                    </Link>
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
