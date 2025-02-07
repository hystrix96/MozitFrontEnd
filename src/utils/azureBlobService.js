import { BlobServiceClient, newPipeline, AnonymousCredential } from '@azure/storage-blob';
import axiosInstance from '../api/axiosInstance';

export const uploadImageToAzure = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // 백엔드 API로 파일 업로드
    const response = await axiosInstance.put('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const uploadedFileUrl = response.data;
    console.log('File uploaded successfully:', uploadedFileUrl);
    return uploadedFileUrl;
  } catch (error) {
    console.error('Error uploading image to Azure', error);
    throw new Error('이미지 업로드 실패');
  }
};