import { useParams } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";
// import { useCategoryStore } from "../store/category";
import { useEffect } from "react";

const Category = () => {
  const categoryId = useParams().category;
  // const Category = useCategoryStore((state) => state.category);
  // const categoryId;
  useEffect(() => {
    // console.log(Category);
  }, []);

  return (
    <div>
      <DocumentTitle title={categoryId as string} />
      {categoryId}
    </div>
  );
};

export default Category;
