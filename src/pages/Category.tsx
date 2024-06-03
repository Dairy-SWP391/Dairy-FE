import { useParams } from "react-router-dom";

const Category = () => {
  const categoryId = useParams().category;

  return <div>{categoryId}</div>;
};

export default Category;
