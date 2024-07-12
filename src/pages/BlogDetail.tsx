import Spring from "../components/Spring";
import "@mdxeditor/editor/style.css";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { BlogType, getBlogDetail } from "../apis/blog";

const BlogDetail = () => {
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getBlogDetail(1);
      setBlog(res.data.result);
    };
    fetchApi();
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
