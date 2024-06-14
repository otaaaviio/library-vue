function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function formatImages(images) {
  const base64Images = [];
  for (const image of images) {
    const base64Image = await fileToBase64(image);
    base64Images.push(base64Image);
  }
  return base64Images;
}
