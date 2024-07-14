import Spring from "../components/Spring";
import "@mdxeditor/editor/style.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { BlogDetailType, getBlogDetail } from "../apis/blog";
import { useLocation, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const [blog, setBlog] = useState<BlogDetailType>();
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    console.log(Number.isNaN(Number.parseInt("a")));
    if (id && !Number.isNaN(Number.parseInt(id))) {
      const fetchApi = async () => {
        const res = await getBlogDetail(Number(id));
        setBlog(res.data.result);
      };
      fetchApi();
    } else {
      nav("/404");
    }
  }, []);

  return (
    <>
      <Spring className="mx-auto card flex flex-col lg:col-span-3 xl:col-span-1 w-5/6">
        <h4>{blog?.title}</h4>
        <p className="text-sm mt-3">{blog?.created_at}</p>
        <Markdown>{blog?.content}</Markdown>
      </Spring>
    </>
  );
};

export default BlogDetail;
