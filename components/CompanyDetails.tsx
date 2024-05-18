"use client";
import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Chart } from "react-google-charts";
interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface AlphaVantageResponse {
  "Time Series (5min)": Record<string, TimeSeriesData>;
}

const CompanyDetails = () => {
  const params = useParams<{ stockname: string }>();
  const stocknanme = params.stockname;
  const APIKEY = process.env.API_KEY
  const [data, setData] = useState<Record<string, TimeSeriesData>>();
  const [chartData, setChartData] = useState<(string | number)[][]>([
    ["Time", "Low", "Opening Value", "Closing Value", "High"],
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState("60");
  useEffect(() => {
    const getCompanyDetails = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stocknanme}&interval=5min&outputsize=full&apikey=${APIKEY}`
      );
      const data: AlphaVantageResponse = await response.json();
      const timeSeries = data["Time Series (5min)"];

     
      const transformedData = Object.entries(timeSeries)
        .filter((_, index) => index % Number(interval) === 0)
        .map(([time, value]) => {
          return [time, Number(value["3. low"]), Number(value["1. open"]), Number(value["4. close"]), Number(value["2. high"])];
        });

      setChartData(prevState => [...prevState, ...transformedData]);
      setData(timeSeries);
    };
    getCompanyDetails();
  }, [stocknanme ,interval]);
  console.log(startDate, endDate, data, chartData);
  const options = {
    legend: "none",
    bar: { groupWidth: "100%" },
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" },
      risingColor: { strokeWidth: 0, fill: "#0f9d58" },
    },
  };

  console.log(data);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '50px', backgroundColor: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '20px', color: '#333', fontSize: '2em' }}>Stock Market Analysis</h1>
      <select 
        value={interval} 
        onChange={e => setInterval(e.target.value)}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '1em', borderRadius: '5px', border: '1px solid #ccc' }}
      >
        <option value="12">5 minutes</option>
        <option value="60">1 hour</option>
        <option value="144">1 day</option>
      </select>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default CompanyDetails;
