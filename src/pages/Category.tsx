/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";
// import { useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";
import { CategoryType, useCategoryStore } from "../store/category";
import Spring from "../components/Spring";
import {
  Button,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  SelectItem
} from "@nextui-org/react";
import { ProductType } from "../types/Product";
import { getProductByCategory, SortType } from "../apis/category";
import ProductCard from "../components/ProductCard";
import { getSalesRatio, stringToNomalCase } from "../utils/converter";

const Category = () => {
  const location = useLocation();
  // const nav = useNavigate();
  const categoryOptions = useCategoryStore((state) => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();
  const [sort_by, setSortBy] = useState<
    "price" | "rating_point" | "sold" | "discount"
  >("price");
  const [order_by, setOrderBy] = useState<"ASC" | "DESC">("ASC");
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [subCategory, setSubCategory] = useState<
    (Omit<CategoryType, "child_category"> & {
      parent_category_id: number;
    })[]
  >([]);

  const handleGetSubCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category_id = parseInt(event.target.value);
    setSelectedCategoryId(category_id);
    setSelectedSubCategoryId(undefined);
    const category = categoryOptions.find(
      (category) => category.id === category_id
    );
    setSubCategory(category?.child_category || []);
    // setValue("category_id", category?.child_category[0].id as number);
  };

  useEffect(() => {
    categoryOptions.length > 0 &&
      selectedCategoryId !== 0 &&
      setSubCategory(categoryOptions[0].child_category);
  }, [categoryOptions]);

  useEffect(() => {
    const fetchData = async ({
      id,
      order_by,
      sort_by,
      sub_id
    }: {
      id: number;
      order_by?: "ASC" | "DESC";
      sort_by?: SortType;
      sub_id?: number;
    }) => {
      const body = sub_id
        ? {
            num_of_items_per_page: 16,
            parent_category_id: id,
            page: page,
            order_by: order_by,
            sort_by: sort_by,
            category_id: sub_id
          }
        : {
            num_of_items_per_page: 16,
            parent_category_id: id,
            page: page,
            order_by: order_by,
            sort_by
          };
      const response = await getProductByCategory(body);
      setProduct(response.data.data.products);
      setTotalPage(response.data.data.totalPage);
    };
    setTitle("Category");
    if (selectedCategoryId) {
      if (selectedSubCategoryId) {
        fetchData({
          id: selectedCategoryId,
          sub_id: selectedSubCategoryId
        });
      } else {
        fetchData({ id: selectedCategoryId });
      }
    } else {
      fetchData({ id: 0 });
    }
  }, [page, selectedCategoryId, selectedSubCategoryId]);

  useEffect(() => {
    const path = location.pathname.split("/");
    const cate = categoryOptions.find((cate) => cate.path === path[1]);
    // if (!cate && !path.includes("all-products")) {
    //   nav("/404");
    // }
    if (path.pop() === "all-products") {
      setSelectedCategoryId(0);
      setSelectedSubCategoryId(undefined);
    }
    if (cate) {
      setSelectedCategoryId(cate?.id);
      setSubCategory(cate?.child_category);
    }
    if (path[2]) {
      const subCate = cate?.child_category.find(
        (item) => item.path === path[2]
      );
      setSelectedSubCategoryId(subCate?.id);
    }
  }, [categoryOptions, location.pathname, setSelectedSubCategoryId]);

  const handleFilterProduct = async () => {
    console.log(order_by, sort_by);
    try {
      const body = selectedSubCategoryId
        ? {
            num_of_items_per_page: 16,
            parent_category_id: selectedCategoryId,
            page: page,
            order_by: order_by,
            sort_by: sort_by,
            category_id: selectedSubCategoryId
          }
        : {
            num_of_items_per_page: 16,
            parent_category_id: selectedCategoryId,
            page: page,
            order_by: order_by,
            sort_by
          };
      const response = await getProductByCategory(body);
      setProduct(response.data.data.products);
      setTotalPage(response.data.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DocumentTitle title={title} />
      <div className="mx-auto w-11/12 flex justify-between">
        <div className="w-[18%]">
          <Spring className="card ">
            <RadioGroup
              label="Sort By"
              color="default"
              className="mt-5"
              value={sort_by}
              onChange={(e) => setSortBy(e.target.value as SortType)}
            >
              <Radio value="price">Price</Radio>
              <Radio value="rating_point">Rating Point</Radio>
              <Radio value="sold">Sold</Radio>
              <Radio value="discount">Discount</Radio>
            </RadioGroup>
            <Select
              label="Sắp xếp theo"
              className="mt-5"
              size="sm"
              aria-label="Price"
              selectedKeys={[order_by]}
              onChange={(e) => setOrderBy(e.target.value as "ASC" | "DESC")}
            >
              <SelectItem key="ASC" value="ASC">
                Tăng Dần
              </SelectItem>
              <SelectItem key="DESC" value="DESC">
                Giảm Dần
              </SelectItem>
            </Select>
            <Button
              color="secondary"
              className="w-full mt-5"
              onClick={handleFilterProduct}
            >
              Search
            </Button>
          </Spring>
        </div>
        <div className="w-[80%]">
          <Spring className="card">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <div className="field-wrapper w-60">
                  <label className="field-label" htmlFor="category">
                    Category *
                  </label>
                  <Select
                    selectedKeys={selectedCategoryId.toString()}
                    aria-label="Category"
                    onChange={(event) => handleGetSubCategory(event)}
                  >
                    {categoryOptions
                      .filter((category) => category.name !== "TIN TỨC")
                      .map((category) => (
                        <SelectItem key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </Select>
                </div>
                <div className="field-wrapper w-60">
                  <label className="field-label" htmlFor="subCategory">
                    Sub Category *
                  </label>
                  <Select
                    // value={selectedSubCategoryId}
                    selectionMode="single"
                    selectedKeys={
                      selectedSubCategoryId?.toString()
                        ? [selectedSubCategoryId?.toString()]
                        : subCategory[0]?.id.toString()
                    }
                    aria-label="sub-category"
                    onChange={(e) =>
                      setSelectedSubCategoryId(parseInt(e.target.value))
                    }
                  >
                    {subCategory.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <Pagination
                total={totalPage}
                initialPage={page}
                onChange={(page) => setPage(page)}
              />
            </div>
            <div className="flex flex-wrap gap-5 justify-around">
              {product.map((item) => (
                <ProductCard
                  product={{
                    id: item.id,
                    name: item.name,
                    price: item.sale_price || item.price,
                    image_url: item.image_urls[0],
                    rating_point: item.rating_point,
                    sold: item.sold,
                    sale: getSalesRatio(
                      item.price,
                      item.sale_price || item.price
                    ),
                    url_detail: `/${categoryOptions.find((cate) => cate.id === item.parent_category_id)?.path}/${categoryOptions.find((cate) => cate.id === item.parent_category_id)?.child_category.find((subCate) => (subCate.id = item.category_id))?.path}/${stringToNomalCase({ str: item.name, id: item.id })}`
                  }}
                  key={item.id}
                />
              ))}
            </div>
          </Spring>
        </div>
      </div>
    </>
  );
};

export default Category;
