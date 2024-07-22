import { useEffect, useState } from "react";
import { BlogType, getAllBlog } from "../apis/blog";
import Spring from "../components/Spring";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Pagination
} from "@nextui-org/react";
import TruncatedText from "../components/TruncatedText";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const nav = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllBlog({ limit: 12, page });
        if (response.status === 200) {
          setBlogs(response.data.result.posts);
          setTotalPage(response.data.result.total_page);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchApi();
  }, [page]);

  return (
    <>
      <Spring className="mx-auto card w-5/6">
        <div className="grid grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              isPressable={true}
              isHoverable={true}
              shadow="md"
              onPress={() => nav(`${blog.id}`)}
            >
              <CardHeader className="z-0">
                <Image src={blog.image} className="z-0" />
              </CardHeader>
              <CardBody>
                <h5 className="">{blog.title}</h5>
                <TruncatedText
                  text={blog.content.replace(/[^a-z0-9- ]/g, "")}
                  width={720}
                />
              </CardBody>
            </Card>
          ))}
        </div>
        <Pagination
          page={page}
          total={totalPage}
          onChange={setPage}
          className="mt-5"
        />
      </Spring>
    </>
  );
};

export default Blog;
