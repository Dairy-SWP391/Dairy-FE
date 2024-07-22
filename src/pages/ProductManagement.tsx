// components
import ProductManagementTable from "../components/ProductManagementTable";
import PageHeader from "../layout/admin/PageHeader";
import { useNavigate } from "react-router-dom";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { CategoryType, useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";

const ProductsManagement = () => {
  const nav = useNavigate();
  const categoryOptions = useCategoryStore((state) => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(0);
  const [subCategory, setSubCategory] = useState<
    (Omit<CategoryType, "child_category"> & {
      parent_category_id: number;
    })[]
  >([]);

  const handleGetSubCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category_id = parseInt(event.target.value);
    setSelectedCategoryId(category_id);
    const category = categoryOptions.find(
      (category) => category.id === category_id
    );
    setSubCategory(category?.child_category || []);
    setSelectedSubCategoryId(0);
    // setValue("category_id", category?.child_category[0].id as number);
  };

  useEffect(() => {
    categoryOptions.length > 0 &&
      setSubCategory(categoryOptions[0].child_category);
  }, [categoryOptions]);

  return (
    <>
      <PageHeader title="Products Management" />
      <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
          <button
            className="btn btn--primary"
            onClick={() => nav("/admin/product-editor")}
          >
            Add new product <i className="icon-circle-plus-regular" />
          </button>
        </div>
        <div className="flex gap-5 items-center">
          <div className="field-wrapper w-60">
            <label className="field-label" htmlFor="category">
              Category *
            </label>
            <Select
              defaultSelectedKeys={"1"}
              aria-label="Category"
              onChange={(event) => handleGetSubCategory(event)}
            >
              {categoryOptions
                .filter((category) => category.name !== "TIN TỨC")
                .map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
            </Select>
          </div>
          <div className="field-wrapper w-60">
            <label className="field-label" htmlFor="subCategory">
              Sub Category *
            </label>
            <Select
              defaultSelectedKeys={""}
              aria-label="sub-category"
              onChange={(e) =>
                setSelectedSubCategoryId(parseInt(e.target.value))
              }
            >
              {subCategory.map((category) => (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              ))}
            </Select>
          </div>
          {/* <Button
            className="translate-y-4"
            color="primary"
            onClick={handleFilterProduct}
          >
            Filter
          </Button> */}
          {/* <Search wrapperClass="lg:w-[326px]" placeholder="Search Product" /> */}
        </div>
      </div>
      <ProductManagementTable
        category_id={selectedCategoryId}
        subCategory={selectedSubCategoryId}
      />
    </>
  );
};

export default ProductsManagement;
