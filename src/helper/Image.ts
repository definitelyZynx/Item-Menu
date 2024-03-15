/* eslint-disable @typescript-eslint/no-explicit-any */

// Used ImgBB API to upload Image
export const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('key', '64291e0035cea702acbf49d70fc4e3fd'); // My ImgBB API key

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.data.url; // Return the url

  } catch (error: any) {
    throw new Error('Failed to upload image: ' + error.message);
  }
};