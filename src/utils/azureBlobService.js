import { BlobServiceClient } from '@azure/storage-blob';

const AZURE_STORAGE_ACCOUNT_NAME = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME || window._env_.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_CONTAINER_NAME = process.env.REACT_APP_AZURE_CONTAINER_NAME || window._env_.REACT_APP_AZURE_CONTAINER_NAME;
const SAS_TOKEN = process.env.REACT_APP_SAS_TOKEN || window._env_.REACT_APP_SAS_TOKEN;

if (!SAS_TOKEN) {
  throw new Error("SAS_TOKEN is not set in the environment variables");
}

// Create a pipeline using AnonymousCredential (or SAS token)
const blobServiceClient = new BlobServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${SAS_TOKEN}`
);

export const uploadImageToAzure = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    const blobName = `question-images/${new Date().getTime()}_${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the image file to Azure Blob Storage
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);

    // Return the image URL
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image to Azure', error);
    throw new Error('이미지 업로드 실패');
  }
};

export const uploadVideoToAzure = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    const blobName = `uploaded-videos/${new Date().getTime()}_${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the video file to Azure Blob Storage
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);

    // 업로드된 비디오의 URL 반환
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading video to Azure", error);
    throw new Error("비디오 업로드 실패");
  }
};