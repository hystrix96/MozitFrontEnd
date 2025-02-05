import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { fetchAzureMetrics } from "../../api/azureApi";

const AzureMonitorChart = ({ metric }) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const loadMetrics = async () => {
      const data = await fetchAzureMetrics();
      setMetrics(
        data
          .filter((item) => item.metricName === metric) // 선택한 메트릭만 필터링
          .sort((a, b) => new Date(a.time) - new Date(b.time)) // 시간순 정렬
      );
    };

    loadMetrics();
  }, [metric]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="average" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AzureMonitorChart;