import { useEffect, useState } from "react";
import { ProductType } from "../types/Product";
import Spring from "./Spring";
import { getProductByCategoryAdmin } from "../apis/category";
import {
  Button,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import dayjs from "dayjs";
import { useCategoryStore } from "../store/category";
import { numberToVND } from "../utils/converter";
import { useNavigate } from "react-router-dom";

const ProductManagementTable = ({
  category_id,
  subCategory
}: {
  category_id: number;
  subCategory: number;
}) => {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const category = useCategoryStore().category;
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [categoryObj, setCategoryObj] = useState<
    { id: number; name: string }[]
  >([]);
  const nav = useNavigate();
  console.log(productList[0]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const fetchData =
          subCategory !== 0 && subCategory !== undefined
            ? {
                parent_category_id: category_id,
                num_of_items_per_page: 10,
                page: page,
                category_id: subCategory
              }
            : {
                parent_category_id: category_id || 0,
                num_of_items_per_page: 10,
                page: page
              };

        const response = await getProductByCategoryAdmin(fetchData);
        if (response.status === 200) {
          setProductList(response.data.data.products);
          setTotalPage(response.data.data.totalPage);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();

    const cate = category.reduce(
      (acc: { id: number; name: string }[], item) => {
        item.child_category.forEach((child) => {
          acc.push({ id: child.id, name: child.name });
        });
        return acc;
      },
      []
    );
    setCategoryObj(cate);
  }, [page, category, category_id, subCategory]);

  return (
    <>
      <Spring className="w-[98%] card mx-auto ">
        <Table aria-label="Product Table">
          <TableHeader>
            <TableColumn width={20}>ID</TableColumn>
            <TableColumn width={100}>IMAGE</TableColumn>
            <TableColumn width={200}>NAME</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>SALE PRICE</TableColumn>
            <TableColumn>START DAY</TableColumn>
            <TableColumn>END DAY</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn width={80}>QUANTITY</TableColumn>
            <TableColumn width={50}>SOLD</TableColumn>
            <TableColumn width={80}>STATUS</TableColumn>
            <TableColumn width={150}>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {productList.length > 0
              ? productList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Image src={item.image_urls[0]} />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.price ? numberToVND(item.price) : "NaN"}
                    </TableCell>
                    <TableCell>
                      {item.sale_price ? numberToVND(item.sale_price) : "NaN"}
                    </TableCell>
                    <TableCell>
                      {item.starting_timestamp
                        ? dayjs(item.starting_timestamp)
                            .format("DD/MM/YYYY")
                            .toString()
                        : "NaN"}
                    </TableCell>
                    <TableCell>
                      {item.ending_timestamp
                        ? dayjs(item.ending_timestamp)
                            .format("DD/MM/YYYY")
                            .toString()
                        : "NaN"}
                    </TableCell>
                    <TableCell>
                      {
                        categoryObj.find((cate) => cate.id === item.category_id)
                          ?.name
                      }
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.sold}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell
                      className="flex gap-2 items-center min-h-full"
                      height={90}
                    >
                      <Button
                        color="primary"
                        onClick={() =>
                          nav("/admin/product-editor", {
                            state: { product: item }
                          })
                        }
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
        <div className="mt-5">
          <Pagination
            showControls
            total={totalPage}
            initialPage={page}
            onChange={setPage}
          />
        </div>
      </Spring>
    </>
  );
};

export default ProductManagementTable;
