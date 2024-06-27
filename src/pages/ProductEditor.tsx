import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import classNames from "classnames";
import { toast } from "react-toastify";
import Spring from "../components/Spring";
import PageHeader from "../layout/admin/PageHeader";
import { useCategoryStore } from "../store/category";
import { useState } from "react";
import SingleFileUploader from "../components/SingleFileUploader";

const ProductEditor = () => {
  const categoryOptions = useCategoryStore((state) => state.category);
  // const [subCategory, setSubCategory] = useState(
  //   categoryOptions[0].child_category
  // );
  const defaultValues = {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    productType: "",
    dimensions: "10 * 10 * 10",
    weight: 0.1,
    description:
      "Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh",
    productName: "",
    brandName: "",
    category: 1,
    subCategory: 6,
    regularPrice: null,
    salePrice: null,
    productSchedule: [dayjs().startOf("week"), dayjs().endOf("week")],
    stockStatus: "In Stock",
    productSKU: "SKU-123456",
    qty: 100,
    unit: "BOX"
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues
  });

  // do something with the data
  const handlePublish = (data) => {
    console.log(data);
    toast.success("Product published successfully");
  };

  // do something with the data
  const handleSave = (data) => {
    console.log(data);
    toast.info("Product saved successfully");
  };

  return (
    <>
      <PageHeader title="Product Editor" />
      <Spring className="card flex-1 xl:py-10">
        <h5 className="mb-[15px]">Product Settings</h5>
        <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
          <div>
            <div>
              <span className="block field-label mb-2.5">Product Images</span>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]">
                <SingleFileUploader
                  handleGetUrl={handlePublish}
                  className="media-dropzone 2xl:col-span-2"
                  placeholder="Upload Image"
                />
                <SingleFileUploader
                  handleGetUrl={handlePublish}
                  className="media-dropzone 2xl:col-span-2"
                  placeholder="Upload Image"
                />
                <div className="grid grid-cols-2 col-span-2 gap-5 2xl:col-span-1 2xl:grid-cols-1">
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="media-dropzone"
                    placeholder="Upload Image"
                  />
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="media-dropzone"
                    placeholder="Upload Image"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,205px)]">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="productType">
                    Attributes
                  </label>
                  <Controller
                    name="productType"
                    control={control}
                    defaultValue={defaultValues.productType}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        // isInvalid={errors.productType}
                        id="productType"
                        placeholder="Product type"
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectItem key={"ahihi"}>AHihi</SelectItem>
                        <SelectItem key={"hehee"}>hehehe</SelectItem>
                      </Select>
                    )}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="dimensions">
                    L * W * H, inches
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.dimensions
                    })}
                    id="dimensions"
                    defaultValue={defaultValues.dimensions}
                    placeholder="Product dimensions"
                    {...register("dimensions", { required: true })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="weight">
                    Weight, kg
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.weight
                    })}
                    id="weight"
                    defaultValue={defaultValues.weight}
                    placeholder="Product weight"
                    {...register("weight", {
                      required: true,
                      pattern: /^[0-9]*$/
                    })}
                  />
                </div>
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.description }
                  )}
                  id="description"
                  defaultValue={defaultValues.description}
                  {...register("description", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productName">
                Product Name
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.productName
                })}
                id="productName"
                defaultValue={defaultValues.productName}
                placeholder="Enter product name"
                {...register("productName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="brandName">
                  Brand Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.brandName
                  })}
                  id="brandName"
                  defaultValue={defaultValues.brandName}
                  placeholder="Enter brand name"
                  {...register("brandName", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="category">
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={defaultValues.category}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select value={field.value} defaultSelectedKeys={"all"}>
                      {categoryOptions
                        .filter((category) => category.name !== "TIN TỨC")
                        .map((category) => (
                          <SelectItem key={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="regularPrice">
                  Regular Price
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.regularPrice
                  })}
                  id="regularPrice"
                  placeholder="$99.99"
                  {...register("regularPrice", {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                />
              </div>
              <div className="field-wrapper"></div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="salePrice">
                  Sale Price
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.salePrice
                  })}
                  id="salePrice"
                  placeholder="$99.99"
                  {...register("salePrice", {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="productSchedule">
                  Schedule
                </label>
                <Controller
                  name="productSchedule"
                  control={control}
                  defaultValue={defaultValues.productSchedule}
                  render={({ field }) => (
                    <DateRangePicker
                      id="productSchedule"
                      // innerRef={field.ref}
                      // value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="max-w-xs"
                      size="md"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="productType">
                  Product Type
                </label>
                <Controller
                  name="productType"
                  control={control}
                  defaultValue={defaultValues.productType}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select>
                      <SelectItem key={"Ahihi"}>Ahihi</SelectItem>
                      <SelectItem key={"hehee"}>hehee</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="stockStatus">
                  Stock Status
                </label>
                <Controller
                  name="stockStatus"
                  control={control}
                  defaultValue={defaultValues.stockStatus}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select>
                      <SelectItem key={"Ahihi"}>Ahihi</SelectItem>
                      <SelectItem key={"hehee"}>hehee</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productSKU">
                SKU
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.productSKU
                })}
                id="productSKU"
                placeholder="SKU"
                defaultValue={defaultValues.productSKU}
                {...register("productSKU", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="stockStatus">
                  Stock Status
                </label>
                <Controller
                  name="stockStatus"
                  control={control}
                  defaultValue={defaultValues.stockStatus}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select>
                      <SelectItem key={"Ahihi"}>Ahihi</SelectItem>
                      <SelectItem key={"hehee"}>hehee</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-[minmax(0,1fr)_,minmax(0,112px)]">
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="qty">
                    Quantity in Stock
                  </label>
                  <input
                    className={classNames("field-input", {
                      "field-input--error": errors.qty
                    })}
                    id="qty"
                    placeholder="0"
                    defaultValue={defaultValues.qty}
                    {...register("qty", {
                      required: true,
                      pattern: /^[0-9]*$/
                    })}
                  />
                </div>
                <div className="field-wrapper">
                  <label className="field-label" htmlFor="unit">
                    Unit
                  </label>
                  <Controller
                    name="unit"
                    control={control}
                    defaultValue={defaultValues.unit}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select>
                        <SelectItem key={"Ahihi"}>Ahihi</SelectItem>
                        <SelectItem key={"hehee"}>hehee</SelectItem>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2 mt-5 sm:grid-cols-2 sm:mt-10 md:mt-11">
              <button
                className="btn btn--secondary"
                onClick={handleSubmit(handleSave)}
              >
                Save to Drafts
              </button>
              <button
                className="btn btn--primary"
                onClick={handleSubmit(handlePublish)}
              >
                Publish Product
              </button>
            </div>
          </div>
        </form>
      </Spring>
    </>
  );
};

export default ProductEditor;
