import { BlobServiceClient, newPipeline, AnonymousCredential } from '@azure/storage-blob';

const AZURE_STORAGE_ACCOUNT_NAME = 'mozitstorage';
const AZURE_CONTAINER_NAME = 'mozit-container';
const SAS_TOKEN = 'sp=racwd&st=2025-02-07T14:49:12Z&se=2025-02-19T22:49:12Z&spr=https&sv=2022-11-02&sr=c&sig=lmIYpzdacUYflxTuybd9eUpCK9WRHzDdIAE%2F%2BpI3x%2FQ%3D';

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
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);

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
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);

    // 업로드된 비디오의 URL 반환
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading video to Azure", error);
    throw new Error("비디오 업로드 실패");
  }
};