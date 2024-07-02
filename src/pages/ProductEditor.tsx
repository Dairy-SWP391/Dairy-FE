import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import classNames from "classnames";
import { toast } from "react-toastify";
import Spring from "../components/Spring";
import PageHeader from "../layout/admin/PageHeader";
import { useCategoryStore } from "../store/category";
import SingleFileUploader from "../components/SingleFileUploader";

interface ProductEditorForm {
  images: string[];
  product_name: string;
  quantity: number;
  brand_name: string;
  origin?: string;
  producer?: string;
  manufactured_at?: string;
  targer?: string;
  volumn?: number;
  weight?: number;
  sold?: number;
  caution?: string;
  instruction?: string;
  preservation?: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  category_id: number;
  ship_category_id: "BABY" | "MOMY";
  number_of_packs?: number;
}

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
  } = useForm<ProductEditorForm>({
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
              <div className="grid gap-5 grid-cols-4">
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
                <SingleFileUploader
                  handleGetUrl={handlePublish}
                  className="media-dropzone "
                  placeholder="Upload Image"
                />
                <SingleFileUploader
                  handleGetUrl={handlePublish}
                  className="media-dropzone"
                  placeholder="Upload Image"
                />
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
                  defaultValue={defaultValues.description}
                  {...register("description", { required: true })}
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
                  // defaultValue={defaultValues.instruction}
                  {...register("instruction", { required: true })}
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
                  // defaultValue={defaultValues.caution}
                  {...register("caution", { required: true })}
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
                  // defaultValue={defaultValues.preservation}
                  {...register("preservation", { required: true })}
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
                  "field-input--error": errors.product_name
                })}
                id="productName"
                defaultValue={defaultValues.productName}
                placeholder="Enter product name"
                {...register("product_name", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
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
              <div className="field-wrapper">
                <label className="field-label" htmlFor="subCategory">
                  Sub Category
                </label>
                <Controller
                  name="subCategory"
                  control={control}
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
                <label className="field-label" htmlFor="brandName">
                  Brand Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.brand_name
                  })}
                  id="brandName"
                  defaultValue={defaultValues.brandName}
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
                  defaultValue={defaultValues.origin}
                  placeholder="Enter origin"
                  {...register("origin", { required: true })}
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
                  defaultValue={defaultValues.producer}
                  placeholder="Enter producer"
                  {...register("producer", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="manufactured_at">
                  Manufactured At
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.manufacturedAt
                  })}
                  id="manufactured_at"
                  defaultValue={defaultValues.manufacturedAt}
                  placeholder="Enter Manufactured Location"
                  {...register("manufactured_at", { required: true })}
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
                  defaultValue={defaultValues.target}
                  placeholder="Enter target"
                  {...register("target", { required: true })}
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
                  defaultValue={defaultValues.volumn}
                  placeholder="Enter volumn"
                  {...register("volumn", { required: true })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.quantity
                  })}
                  id="quantity"
                  defaultValue={defaultValues.quantity}
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
                  {...register("weight", { required: true })}
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
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
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
              <div className="field-wrapper">
                <label className="field-label" htmlFor="status">
                  Stock Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={defaultValues.stockStatus}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select>
                      <SelectItem key={"ACTIVE"}>ACTIVE</SelectItem>
                      <SelectItem key={"INACTIVE"}>INACTIVE</SelectItem>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="ship_category_id">
                  Ship Category
                </label>
                <Controller
                  name="ship_category_id"
                  control={control}
                  defaultValue={defaultValues.shipCategory}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select>
                      <SelectItem key={"BABY"}>BABY</SelectItem>
                      <SelectItem key={"MOMY"}>MOMMY</SelectItem>
                    </Select>
                  )}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="number_of_packs">
                  Number Of Packs
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.number_of_packs
                  })}
                  id="number_of_packs"
                  placeholder="Enter number of packs"
                  {...register("number_of_packs", {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                />
              </div>
            </div>
            <button
              className="btn btn--primary w-full"
              onClick={handleSubmit(handlePublish)}
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
