export async function getCloudinaryImages() {
  try {
    const response = await fetch("/api/images");
    if (!response.ok) throw new Error("Failed to fetch images");
    return await response.json();
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return { resources: [] };
  }
}

export async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    return await response.json();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
