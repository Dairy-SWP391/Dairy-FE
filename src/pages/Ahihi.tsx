import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  BlockTypeSelect,
  Separator,
  headingsPlugin,
  InsertImage,
  imagePlugin,
  ListsToggle,
  listsPlugin
} from "@mdxeditor/editor";

const Ahihi = () => {
  return (
    <>
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
          headingsPlugin({
            allowedHeadingLevels: [1, 2, 3, 4, 5, 6]
          }),
          imagePlugin({
            imageUploadHandler: () => {
              return Promise.resolve("https://picsum.photos/200/300");
            },
            imageAutocompleteSuggestions: [
              "https://picsum.photos/200/300",
              "https://picsum.photos/200"
            ]
          }),
          listsPlugin({}),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <BoldItalicUnderlineToggles />
                <Separator />
                <InsertImage />
                <Separator />
                <ListsToggle />
              </DiffSourceToggleWrapper>
            )
          })
        ]}
      />
    </>
  );
};

export default Ahihi;
