import React, { useRef } from "react";
import { uploadImage } from "../apis/images";

type SingleFileUploaderProps = {
  onUpload?: (file: File) => void;
  placeholder?: string;
  handleGetUrl: (url: string) => void;
  className?: string;
};

const SingleFileUploader = ({
  placeholder,
  handleGetUrl,
  className
}: SingleFileUploaderProps) => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const res = await uploadImage(e.target.files[0] as File);
      handleGetUrl(res.data.data[0]);
    }
  };

  const handleUpload = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    fileUploadRef.current?.click();
  };

  return (
    <>
      <div className={`${className}`}>
        <div>
          <label htmlFor="file" className="sr-only text-xl">
            Choose a file
          </label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            ref={fileUploadRef}
            hidden
            accept="image/*"
          />
        </div>
        <button
          className="border px-5 py-2 text-lg"
          onClick={(e) => handleUpload(e)}
        >
          {placeholder}
        </button>
      </div>
    </>
  );
};

export default SingleFileUploader;
