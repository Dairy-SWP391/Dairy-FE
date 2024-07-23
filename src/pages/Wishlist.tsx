import { useEffect, useState } from "react";
import DocumentTitle from "../components/DocumentTitle";
import Spring from "../components/Spring";
import ProfileBar from "../layout/user/ProfileBar";
import { getWishList, removeFromWishlist, WishlistType } from "../apis/user";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { numberToVND } from "../utils/converter";
import { toast } from "react-toastify";

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

  const handleRemoveWishlist = async (id: number) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này ?");
    if (confirm) {
      try {
        const response = await removeFromWishlist(id);
        if (response.status === 200) {
          toast.success("Xóa sản phẩm khỏi danh sách yêu thích thành công");
          const newWishlist = wishlist.filter((item) => item.id !== id);
          setWishlist(newWishlist);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
                <TableColumn width={100}>ACTION</TableColumn>
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
                        <TableCell>
                          <Button
                            color="danger"
                            onClick={() => handleRemoveWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
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
