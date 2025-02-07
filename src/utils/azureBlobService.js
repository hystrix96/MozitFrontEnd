import { BlobServiceClient, newPipeline, AnonymousCredential } from '@azure/storage-blob';
import axiosInstance from '../api/axiosInstance';

const AZURE_STORAGE_ACCOUNT_NAME = 'mozitstorage';
const AZURE_CONTAINER_NAME = 'mozit-container';

// 백엔드에서 받은 액세스 토큰을 사용
let accessToken = null;

// 액세스 토큰을 백엔드에서 받아오는 함수
const fetchAzureToken = async () => {
  try {
    const response = await axiosInstance.post('/api/azure/token');
    accessToken = response.data; // 백엔드에서 받은 액세스 토큰
  } catch (error) {
    console.error('Error fetching Azure token:', error);
    throw new Error('Azure 토큰 가져오기 실패');
  }
};

// Azure Blob Storage에 파일을 업로드하는 함수
export const uploadImageToAzure = async (file) => {
  if (!accessToken) {
    // 액세스 토큰이 없으면 먼저 토큰을 받아옴
    await fetchAzureToken();
  }

  try {
    // Azure Blob Storage 클라이언트 생성
    const pipeline = newPipeline(new AnonymousCredential(), {
      authentication: {
        bearerToken: accessToken, // 받은 액세스 토큰 사용
      },
    });

    const blobServiceClient = new BlobServiceClient(
      `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, pipeline
    );

    const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);
    const blobName = `question-images/${new Date().getTime()}_${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // 파일을 Azure Blob Storage로 업로드
    const uploadBlobResponse = await blockBlobClient.uploadBrowserData(file);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);

    // 업로드된 이미지의 URL 반환
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image to Azure:', error);
    throw new Error('이미지 업로드 실패');
  }
};