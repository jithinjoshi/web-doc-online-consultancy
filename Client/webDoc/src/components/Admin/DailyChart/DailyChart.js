import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./DailyChart.scss";
import {
  ResponsiveContainer,
} from "recharts";
import { getChartData, getDailyData } from "../../../Helpers/adminHelper";



const DailyChart = ({ aspect, title }) => {
  const [data,setData] = useState([])
  useEffect(()=>{
    getDailyData().then((data)=>{
      setData(data?.data)
      
    })

  },[]);


  const options = {
    chart: {
    id: "basic-bar"
    },
    xaxis: {
    categories: ['Today']
    }
    };
    
    const series = [
    {
    name: "daily report",
    data: [data]
    }
    ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <Chart options={options} series={series} type="bar" width="500" />  
      </ResponsiveContainer>
    </div>
  );
};

export default DailyChart;
