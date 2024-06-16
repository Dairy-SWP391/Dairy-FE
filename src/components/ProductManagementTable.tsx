import Spring from "./Spring";

const ProductManagementTable = () => {
  return (
    <>
      <Spring className="w-[98%] card mx-auto">
        <div className="flex justify-between border-b-2 border-b-black pb-5 mb-7 text-blue-500 font-semibold">
          <p className="w-[3%] border">Id</p>
          <p className="w-[30%] border">Name</p>
          <p className="w-[5%] border">Stock</p>
          <p className="w-[5%] border">Price</p>
          <p className="w-[8%] border">Sale Price</p>
          <p className="w-[20%] border">Category</p>
          <p className="w-[7%] border">Actions</p>
        </div>
        <div className="flex justify-between border-b-black">
          <p className="w-10 border">1</p>
          <p className="w-80 border">Name</p>
          <p className="w-20 border">Stock</p>
          <p className="w-28 border">Price</p>
          <p className="w-28 border">Sale Price</p>
          <p className="w-60 border">Category</p>
          <p className="w-20 border">Actions</p>
        </div>
      </Spring>
    </>
  );
};

export default ProductManagementTable;
