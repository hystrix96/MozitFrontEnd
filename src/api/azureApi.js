import axios from "axios";
import { useEffect, useState } from "react";

export const getAzureToken = async () => {
  try {
    const response = await axios.post("/api/azure/token");
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Azure Storage에서 Metric 데이터를 가져오기
export const fetchAzureMetrics = async () => {
    const storageUrl = "https://mozitstorage.blob.core.windows.net/insights-metrics-pt1m/resourceId=/SUBSCRIPTIONS/0A938E62-00BA-4C73-A908-3B285014B302/RESOURCEGROUPS/MOZIT/PROVIDERS/MICROSOFT.DBFORMYSQL/FLEXIBLESERVERS/MOZIT-DB/y=2025/m=02/d=05/h=06/m=00/PT1H.json";
    const sasToken = "sp=r&st=2025-02-05T06:23:43Z&se=2025-02-20T14:23:43Z&spr=https&sv=2022-11-02&sr=c&sig=zDCK%2BRpL8vDlrU07A1lKlwkTLUQ%2FEgAsR0EADA4xHeY%3D"; // Storage에서 생성한 SAS Token
  
    try {
      const response = await axios.get(`${storageUrl}?${sasToken}`);
      console.log("Raw API Response:", response.data);

        // 데이터를 JSON 배열로 변환
      const jsonData = response.data
        .trim() // 앞뒤 공백 제거
        .split("\n") // 개행 문자 기준으로 분할
        .map((line) => JSON.parse(line)); // 각 줄을 JSON 객체로 변환

      console.log("Parsed Data:", jsonData);

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