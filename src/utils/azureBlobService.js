import { BlobServiceClient, newPipeline, AnonymousCredential } from '@azure/storage-blob';

const AZURE_STORAGE_ACCOUNT_NAME = 'mozitstorage';
const AZURE_CONTAINER_NAME = 'mozit-container';
const SAS_TOKEN = process.env.REACT_APP_UTILS_SAS_TOKEN;

// Create a pipeline using AnonymousCredential (or SAS token)
const pipeline = newPipeline(new AnonymousCredential());
const blobServiceClient = new BlobServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${SAS_TOKEN}`, pipeline
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