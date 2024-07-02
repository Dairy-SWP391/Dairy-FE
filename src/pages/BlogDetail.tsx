import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper
} from "@mdxeditor/editor";
import Spring from "../components/Spring";
import "@mdxeditor/editor/style.css";
import { Progress } from "@nextui-org/react";
import Toast from "../components/Toast";

const BlogDetail = () => {
  return (
    <>
      {/* <Spring className="mx-auto card flex flex-col lg:col-span-3 xl:col-span-1 w-5/6">
        <MDXEditor
          onChange={console.log}
          markdown={"hello world"}
          plugins={[
            // the viewMode parameter lets you switch the editor to diff or source mode.
            // you can get the diffMarkdown from your backend and pass it here.
            diffSourcePlugin({
              diffMarkdown: "An older version",
              viewMode: "rich-text"
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                </DiffSourceToggleWrapper>
              )
            })
          ]}
        />
      </Spring> */}
      <Toast />
    </>
  );
};

export default BlogDetail;
