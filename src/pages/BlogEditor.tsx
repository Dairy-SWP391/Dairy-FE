import PageHeader from "../layout/admin/PageHeader";

const BlogEditor = () => {
  return (
    <>
      <PageHeader title="Blog Editor" />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                 lg:items-center lg:gap-4"
      ></div>
    </>
  );
};

export default BlogEditor;
