import axiosInstance from "./axiosInstance";
import { useEffect, useState } from "react";

export const getAzureToken = async () => {
  try {
    const response = await axiosInstance.post("/api/azure/token");
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Azure Storage에서 Metric 데이터를 가져오기
export const fetchAzureMetrics = async () => {
  try {
    const response = await axiosInstance.get("/api/azure/metrics");

      // 데이터를 JSON 배열로 변환
    const jsonData = response.data
      .trim() // 앞뒤 공백 제거
      .split("\n") // 개행 문자 기준으로 분할
      .map((line) => JSON.parse(line)); // 각 줄을 JSON 객체로 변환


    return jsonData;
  } catch (error) {
    console.error("Error fetching Azure metrics:", error);
    return null;
  }
};

const MetricsComponent = () => {
    const [metrics, setMetrics] = useState(null);
  
    useEffect(() => {
      // 1분마다 새로운 로그 가져오기
      const interval = setInterval(async () => {
        const data = await fetchAzureMetrics();
        if (data) setMetrics(data);
      }, 60000); // 60초마다 갱신
  
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);
  
    return (
      <div>
        <h2>Azure Metrics</h2>
        {metrics ? <pre>{JSON.stringify(metrics, null, 2)}</pre> : <p>Loading...</p>}
      </div>
    );
};
  
export default MetricsComponent;