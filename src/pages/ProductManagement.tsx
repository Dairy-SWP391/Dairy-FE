// components
import Search from "../components/Search";
import ProductManagementTable from "../components/ProductManagementTable";
import PageHeader from "../layout/admin/PageHeader";

const ProductsManagement = () => {
  return (
    <>
      <PageHeader title="Products Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button className="btn btn--primary">
            Add new product <i className="icon-circle-plus-regular" />
          </button>
        </div>
        <Search wrapperClass="lg:w-[326px]" placeholder="Search Product" />
      </div>
      <ProductManagementTable />
    </>
  );
};

export default ProductsManagement;
