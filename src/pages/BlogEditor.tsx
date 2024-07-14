import PageHeader from "../layout/admin/PageHeader";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  InsertImage,
  imagePlugin,
  ListsToggle,
  listsPlugin,
  Separator,
  BlockTypeSelect,
  headingsPlugin
} from "@mdxeditor/editor";
import { Button, Card, CardBody, Image, Input } from "@nextui-org/react";
import { uploadImage } from "../apis/images";
import { useState } from "react";
import { addPost } from "../apis/post";
import { toast } from "react-toastify";
import SingleFileUploader from "../components/SingleFileUploader";
import TruncatedText from "../components/TruncatedText";

async function imageUploadHandler(image: File) {
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await uploadImage(image);
  const json = response.data.data[0];
  return json;
}

const BlogEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("Hello World");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleCreatePost = async () => {
    try {
      const response = await addPost({
        title,
        content,
        post_category: category,
        images: [image]
      });
      if (response.status === 200) {
        toast.success("Post created successfully");
        setTitle("");
        setContent("");
        setCategory("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadImage = (data: string) => {
    setImage(data);
  };

  return (
    <>
      <PageHeader title="Blog Editor" />
      <div className="card no-hover min-h-[70vh]">
        <div className="flex gap-5">
          <div className="w-3/4">
            <Input
              className="mt-5 w-[full]"
              label="Title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <Input
              className="mt-5"
              label="Category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="w-3/4">
            <MDXEditor
              className="mt-5 min-h-[50vh] w-full"
              onChange={setContent}
              markdown={content}
              plugins={[
                // the viewMode parameter lets you switch the editor to diff or source mode.
                // you can get the diffMarkdown from your backend and pass it here.
                diffSourcePlugin({ viewMode: "rich-text" }),
                imagePlugin({
                  imageUploadHandler
                }),
                listsPlugin(),
                headingsPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <DiffSourceToggleWrapper>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                      <InsertImage />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                    </DiffSourceToggleWrapper>
                  )
                })
              ]}
            />
          </div>
          <div className="w-1/4 mt-5 flex flex-col items-center">
            <Card>
              <CardBody>
                <Image src={image} alt="image" className="min-h-10" />
                <h6 className="mt-5">{title}</h6>
                <TruncatedText text={content} width={200} className="mt-2" />
              </CardBody>
            </Card>
            <SingleFileUploader
              handleGetUrl={handleUploadImage}
              placeholder="Upload Cover Image"
              className="mt-5"
            />
          </div>
        </div>

        <Button color="primary" size="lg" onClick={handleCreatePost}>
          CREATE POST
        </Button>
      </div>
    </>
  );
};

export default BlogEditor;
