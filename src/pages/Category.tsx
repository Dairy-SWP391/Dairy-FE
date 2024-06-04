import { useParams } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";

const Category = () => {
  const categoryId = useParams().category;

  return (
    <div>
      <DocumentTitle title={categoryId as string} />
      {categoryId}
    </div>
  );
};

export default Category;
