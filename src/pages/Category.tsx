/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";
// import { useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../store/category";
import Spring from "../components/Spring";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  SelectItem
} from "@nextui-org/react";
import { ProductType } from "../types/Product";
import { getProductByCategory } from "../apis/category";
import ProductCard from "../components/ProductCard";
import { getSalesRatio, stringToNomalCase } from "../utils/converter";
// import Spring from "../components/Spring";
// import { Checkbox, CheckboxGroup } from "@nextui-org/react";

const Category = () => {
  const location = useLocation();
  const nav = useNavigate();
  const Category = useCategoryStore((state) => state.category);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [product, setProduct] = useState<ProductType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

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
        num_of_items_per_page: 16,
        parent_category_id: id,
        page: page,
        order_by: order_by,
        sort_by: sort_by
      });
      setProduct(response.data.data.products);
      setTotalPage(response.data.data.totalPage);
    };
    setTitle("Category");
    fetchData({ id: 0 });
  }, [page]);

  useEffect(() => {
    const path = location.pathname.split("/");
    const cate = Category.find((cate) => cate.path === path[1]);
    if (!cate && !path.includes("all-products")) {
      nav("/404");
    }
    if (cate) {
      setSelected([cate?.id.toString()]);
    }
    // setSelected((prev) => [...prev, cate?.id.toString() || ""]);
    if (path[2]) {
      const subCate = cate?.child_category.find(
        (item) => item.path === path[2]
      );
      setSelected((prev) => [...prev, subCate?.id.toString() || ""]);
    }
  }, [Category, location.pathname]);

  return (
    <>
      <DocumentTitle title={title} />
      <div className="mx-auto w-11/12 flex justify-between">
        <div className="w-[18%]">
          <Spring className="card ">
            <CheckboxGroup
              label="Select Category"
              color="default"
              value={selected}
              onValueChange={setSelected}
            >
              {Category.map(
                (child) =>
                  child.name !== "TIN TỨC" && (
                    <>
                      <Checkbox key={child.id} value={child.id.toString()}>
                        {child.name}
                      </Checkbox>
                      {selected.includes(child.id.toString()) &&
                        child.child_category.map((sub) => {
                          return (
                            <Checkbox
                              key={sub.id}
                              value={sub.id.toString()}
                              className="ml-3"
                            >
                              {sub.name}
                            </Checkbox>
                          );
                        })}
                    </>
                  )
              )}
            </CheckboxGroup>
            <RadioGroup label="Sort By" color="default" className="mt-5">
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
            >
              <SelectItem key="asc" value="asc">
                Tăng Dần
              </SelectItem>
              <SelectItem key="desc" value="desc">
                Giảm Dần
              </SelectItem>
            </Select>
            <Button
              onClick={() => {
                console.log(selected);
              }}
              color="secondary"
              className="w-full mt-5"
            >
              Search
            </Button>
          </Spring>
        </div>
        <div className="w-[80%]">
          <Spring className="card ">
            <div className="flex flex-wrap gap-5 justify-between">
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
                    url_detail: `/${Category.find((cate) => cate.id === item.parent_category_id)?.path}/${Category.find((cate) => cate.id === item.parent_category_id)?.child_category.find((subCate) => (subCate.id = item.category_id))?.path}/${stringToNomalCase({ str: item.name, id: item.id })}`
                  }}
                  key={item.id}
                />
              ))}
            </div>

            <Pagination
              total={totalPage}
              initialPage={page}
              className="mt-5"
              onChange={(page) => setPage(page)}
            />
          </Spring>
        </div>
      </div>
    </>
  );
};

export default Category;
