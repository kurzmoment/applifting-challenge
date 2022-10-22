export async function getImagePath(image: HTMLInputElement) {
  const enteredImage = image;

  const data = new FormData();
  //@ts-ignore
  for (var file of enteredImage.files) {
    data.append("file", file);
  }

  data.append("upload_preset", "applifting");

  const imageData = await fetch(
    "https://api.cloudinary.com/v1_1/di8ushvnv/image/upload",
    {
      method: "POST",
      body: data,
    }
  ).then((r) => r.json());

  const newImageURL = imageData.secure_url;
  return newImageURL;
}
