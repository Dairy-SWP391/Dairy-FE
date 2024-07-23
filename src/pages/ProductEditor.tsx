import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import classNames from "classnames";
import { toast } from "react-toastify";
import Spring from "../components/Spring";
import PageHeader from "../layout/admin/PageHeader";
import { CategoryType, useCategoryStore } from "../store/category";
import SingleFileUploader from "../components/SingleFileUploader";
import { useEffect, useState } from "react";
import { addProduct, getBrandName, updateProduct } from "../apis/product";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "../types/Product";
import _ from "lodash";

export interface ProductEditorForm {
  name: string;
  quantity: number;
  rating_number: number;
  rating_point: number;
  brand_name: string;
  producer?: string;
  manufactured_at?: string;
  target?: string;
  volumn?: number;
  weight?: number;
  caution?: string;
  images: string[];
  origin?: string;
  preservation?: string;
  description?: string;
  instruction?: string;
  category_id: number;
  price: number;
  status: "ACTIVE" | "INACTIVE";
  sale_price?: number;
  starting_timestamp: dayjs.Dayjs;
  ending_timestamp?: dayjs.Dayjs;
  ship_category_id: "BABY" | "MOMY";
}

const ProductEditor = () => {
  const categoryOptions = useCategoryStore((state) => state.category);
  const location = useLocation();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<
    (Omit<CategoryType, "child_category"> & {
      parent_category_id: number;
    })[]
  >([]);
  const [productId, setProductId] = useState<number>(0);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<ProductEditorForm>();

  useEffect(() => {
    const product: ProductType = location.state.product;
    if (product) {
      const fetchBrand = async () => {
        const brand = await getBrandName(product.brand_id);
        setValue("brand_name", brand.data.data.name);
      };
      fetchBrand();
      handleGetSubCategory(product.parent_category_id);
      setValue("name", product.name);
      setValue("quantity", product.quantity);
      setValue("rating_number", product.rating_number);
      setValue("rating_point", product.rating_point);
      // setValue("brand_name", product.description || "");
      setValue("producer", product.producer || "");
      setValue("manufactured_at", product.manufactured_at || "");
      setValue("target", product.target || "");
      setValue("volumn", product.volumn || 0);
      setValue("weight", product.weight || 0);
      setValue("caution", product.caution || "");
      setValue("images", product.image_urls);
      setValue("origin", product.origin || "");
      setValue("preservation", product.preservation || "");
      setValue("description", product.description || "");
      setValue("instruction", product.instruction || "");
      setValue("category_id", product.category_id);
      setValue("price", product.price);
      setValue("status", product.status);
      setValue("sale_price", product.sale_price || 0);
      setValue("starting_timestamp", dayjs(product.starting_timestamp));
      console.log(product.starting_timestamp);
      setValue("ending_timestamp", dayjs(product.ending_timestamp));
      setValue("ship_category_id", "BABY");
      setProductImages(product.image_urls);
      setProductId(product.id);
    }
  }, []);

  useEffect(() => {
    categoryOptions.length > 0 &&
      setSubCategory(categoryOptions[0].child_category);
  }, [categoryOptions]);

  const handleGetSubCategory = (value: number) => {
    const category = categoryOptions.find((category) => category.id === value);
    setSubCategory(category?.child_category || []);
    setValue("category_id", category?.child_category[0].id as number);
  };

  // do something with the data
  const handlePublish = (data: string) => {
    setProductImages([...productImages, data]);
  };

  // do something with the data
  const handleSave = async (data: ProductEditorForm) => {
    setValue("images", productImages);
    const starting_timestamp = getValues("starting_timestamp").isValid()
      ? getValues("starting_timestamp").toDate().toISOString()
      : dayjs().toISOString();
    const ending_timestamp = getValues("ending_timestamp")?.isValid()
      ? getValues("ending_timestamp")?.toDate().toISOString()
      : undefined;
    if (productId !== 0) {
      // update
      try {
        const body = ending_timestamp
          ? {
              ...data,
              images: productImages,
              starting_timestamp,
              ending_timestamp,
              id: productId
            }
          : {
              ..._.omit(data, ["ending_timestamp"]),
              starting_timestamp,
              images: productImages,
              id: productId
            };
        const response = await updateProduct(body);
        if (response.status === 200) {
          toast.success(
            "Update product successfully, redirecting to product management"
          );
          nav("/admin/products-management");
          reset();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      // create
      try {
        const response = await addProduct({
          ...data,
          images: productImages,
          starting_timestamp,
          ending_timestamp
        });
        if (response.status === 200) {
          toast.success("Add product successfully");
          reset();
        }
      } catch (e) {
        console.log(e);
      }
    }
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
              <div className="grid gap-5 grid-cols-4">
                <div
                  className={`min-h-[200px] border-1 border-slate-600 border-dotted flex flex-col items-center ${productImages[0] ? "justify-between" : "justify-center"}`}
                >
                  {productImages[0] && (
                    <div className="max-h-36">
                      <img
                        src={productImages[0]}
                        alt="img1"
                        className="h-full"
                      />
                    </div>
                  )}
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="max-h-12"
                    placeholder="Upload Image"
                  />
                </div>
                <div
                  className={`max-h-50 border-1 border-slate-600 border-dotted flex flex-col items-center ${productImages[1] ? "justify-between" : "justify-center"}`}
                >
                  {productImages[1] && (
                    <div className="max-h-36">
                      <img
                        src={productImages[1]}
                        alt="img2"
                        className="h-full"
                      />
                    </div>
                  )}
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="max-h-12"
                    placeholder="Upload Image"
                  />
                </div>
                <div
                  className={`max-h-50 border-1 border-slate-600 border-dotted flex flex-col items-center ${productImages[2] ? "justify-between" : "justify-center"}`}
                >
                  {productImages[2] && (
                    <div className="max-h-36">
                      <img
                        src={productImages[2]}
                        alt="img3"
                        className="h-full"
                      />
                    </div>
                  )}
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="max-h-12"
                    placeholder="Upload Image"
                  />
                </div>
                <div
                  className={`max-h-50 border-1 border-slate-600 border-dotted flex flex-col items-center ${productImages[3] ? "justify-between" : "justify-center"}`}
                >
                  {productImages[3] && (
                    <div className="max-h-36">
                      <img
                        src={productImages[3]}
                        alt="img4"
                        className="h-full"
                      />
                    </div>
                  )}
                  <SingleFileUploader
                    handleGetUrl={handlePublish}
                    className="max-h-12"
                    placeholder="Upload Image"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-5">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[90px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.description }
                  )}
                  id="description"
                  {...register("description")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="instruction">
                  Instruction
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[90px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.instruction }
                  )}
                  id="description"
                  {...register("instruction")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="caution">
                  Caution
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[90px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.caution }
                  )}
                  id="caution"
                  {...register("caution")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="preservation">
                  Preservation
                </label>
                <textarea
                  className={classNames(
                    `field-input !h-[90px] !py-[15px] !overflow-y-auto`,
                    { "field-input--error": errors.preservation }
                  )}
                  id="description"
                  {...register("preservation")}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productName">
                Product Name *
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.name
                })}
                id="productName"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="category">
                  Category *
                </label>
                <Select
                  // value={value}
                  defaultSelectedKeys={"1"}
                  aria-label="Category"
                  onChange={(event) =>
                    handleGetSubCategory(Number(event.target.value))
                  }
                >
                  {categoryOptions
                    .filter((category) => category.name !== "TIN TỨC")
                    .map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                </Select>
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="subCategory">
                  Sub Category *
                </label>
                <Select
                  defaultSelectedKeys={""}
                  {...register("category_id", { required: true })}
                  aria-label="sub-category"
                  selectedKeys={[watch("category_id")]}
                >
                  {subCategory.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="brandName">
                  Brand Name *
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.brand_name
                  })}
                  id="brandName"
                  placeholder="Enter brand name"
                  {...register("brand_name", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="origin">
                  Origin
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.origin
                  })}
                  id="brandName"
                  placeholder="Enter origin"
                  {...register("origin")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="producer">
                  Producer
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.producer
                  })}
                  id="producer"
                  placeholder="Enter producer"
                  {...register("producer")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="manufactured_at">
                  Manufactured At
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.manufactured_at
                  })}
                  id="manufactured_at"
                  placeholder="Enter Manufactured Location"
                  {...register("manufactured_at")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="target">
                  Target
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.target
                  })}
                  id="target"
                  placeholder="Enter target"
                  {...register("target")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="volumn">
                  Volumn
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.volumn
                  })}
                  id="volumn"
                  placeholder="Enter volumn"
                  {...register("volumn")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="quantity">
                  Quantity *
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.quantity
                  })}
                  id="quantity"
                  placeholder="Enter quantity"
                  {...register("quantity", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="weight">
                  Weight
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.weight
                  })}
                  id="weight"
                  // defaultValue={defaultValues.weight}
                  placeholder="Enter weight"
                  {...register("weight")}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="regularPrice">
                  Regular Price *
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.price
                  })}
                  id="regularPrice"
                  placeholder="$99.99"
                  {...register("price", {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="salePrice">
                  Sale Price
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.sale_price
                  })}
                  id="salePrice"
                  placeholder="$99.99"
                  {...register("sale_price", {
                    pattern: /^[0-9]*$/
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="productSchedule">
                  Starting Timestamp *
                </label>
                <Controller
                  name="starting_timestamp"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id="starting_timestamp"
                      aria-label="Starting Timestamp"
                      // innerRef={field.ref}
                      // value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="max-w-xs"
                      size="md"
                    />
                  )}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="productSchedule">
                  Ending Timestamp
                </label>
                <Controller
                  name="ending_timestamp"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id="ending_timestamp"
                      aria-label="Ending Timestamp"
                      // innerRef={field.ref}
                      // value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className=""
                      size="md"
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="status">
                  Status *
                </label>
                <Select
                  selectedKeys={[watch("status")]}
                  {...register("status", { required: true })}
                  aria-label="status"
                >
                  <SelectItem key={"ACTIVE"}>ACTIVE</SelectItem>
                  <SelectItem key={"INACTIVE"}>INACTIVE</SelectItem>
                </Select>
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="ship_category_id">
                  Ship Category *
                </label>
                <Select
                  aria-label="ship category id"
                  {...register("ship_category_id", { required: true })}
                  defaultSelectedKeys={["BABY"]}
                >
                  <SelectItem key={"BABY"}>BABY</SelectItem>
                  <SelectItem key={"MOMY"}>MOMMY</SelectItem>
                </Select>
              </div>
            </div>
            <button
              className="btn btn--primary w-full"
              onClick={handleSubmit(handleSave)}
            >
              Publish Product
            </button>
          </div>
        </form>
      </Spring>
    </>
  );
};

export default ProductEditor;
