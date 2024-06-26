import { useLocation } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";
// import { useCategoryStore } from "../store/category";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../store/category";
import Spring from "../components/Spring";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

const Category = () => {
  const path = useLocation()
    .pathname.split("/")
    .filter((item) => item !== "");
  const Category = useCategoryStore((state) => state.category);
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<number[]>([0]);

  useEffect(() => {
    Category.forEach((item) => {
      if (item.path === path[path.length - 1]) {
        setCategory(item.id);
        setTitle(item.name);
      } else {
        item.child_category.forEach((child) => {
          if (child.path === path[path.length - 1]) {
            console.log(child);
            setCategory(child.parent_category_id);
            setSelected([child.id]);
            setTitle(child.name);
          }
        });
      }
    });
  }, [Category]);

  return (
    <>
      <DocumentTitle title={title} />
      <div className="mx-auto w-5/6 flex justify-between">
        <div className="w-[20%]">
          <Spring className="card ">AHihi</Spring>
          <Spring className="card ">
            <CheckboxGroup
              label="Select cities"
              color="default"
              value={selected}
              onValueChange={setSelected}
            >
              {Category.find(
                (item) => item.id === category
              )?.child_category.map((child) => {
                return (
                  <Checkbox key={child.id} value={child.id}>
                    {child.name}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
            <p className="text-default-500 text-small">
              Selected: {selected.join(", ")}
            </p>
          </Spring>
        </div>
        <div className="w-[78%]">
          <Spring className="card">AHihi</Spring>
          <Spring className="card">AHihi</Spring>
        </div>
      </div>
    </>
  );
};

export default Category;
