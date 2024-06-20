import http from "../utils/http";

//   http.post<TokenResponse>("user/register", _data);
type ImageUploadResponse = {
  message: string;
  data: string[];
};

export const uploadImage = (_data: File) =>
  http.post<ImageUploadResponse>(
    "/image/upload-image",
    { images: _data },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
