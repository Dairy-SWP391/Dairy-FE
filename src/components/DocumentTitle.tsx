import { Helmet } from "react-helmet";

const DocumentTitle = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title} | Dairy</title>
    </Helmet>
  );
};

export default DocumentTitle;
