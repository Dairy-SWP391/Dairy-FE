import { useEffect, useState } from "react";
import DocumentTitle from "../components/DocumentTitle";
import Spring from "../components/Spring";
import ProfileBar from "../layout/user/ProfileBar";
import { getWishList, WishlistType } from "../apis/user";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { numberToVND } from "../utils/converter";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getWishList(page, 10);
        if (response.status === 200) {
          setWishlist(response.data.result.products);
        }
        setPage(1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
    console.log(wishlist);
  }, []);

  return (
    <>
      <DocumentTitle title="Thông Tin Cá Nhân" />
      <div className="mx-auto w-5/6 grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <ProfileBar />
        </div>
        <Spring className="card col-span-9">
          <div className="border-b-1 pb-3 border-b-slate-500">
            <h3 className="text-xl">Danh Sách Yêu Thích</h3>
          </div>
          <div>
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn width={50}>No.</TableColumn>
                <TableColumn width={100}>ẢNH</TableColumn>
                <TableColumn>TÊN SẢN PHẨM</TableColumn>
                <TableColumn width={200}>GIÁ THÀNH</TableColumn>
              </TableHeader>
              <TableBody>
                {wishlist.length > 0
                  ? wishlist?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <div className="w-full">
                            <img
                              src={item.image_urls[0]}
                              alt={item.name}
                              className="w-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{numberToVND(item.price)}</TableCell>
                      </TableRow>
                    ))
                  : []}
              </TableBody>
            </Table>
          </div>
        </Spring>
      </div>
    </>
  );
};

export default Wishlist;
