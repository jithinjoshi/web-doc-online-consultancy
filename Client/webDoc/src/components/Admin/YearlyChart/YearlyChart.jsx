import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./YearlyChart.scss";
import {
  ResponsiveContainer,
} from "recharts";
import { getYearlyData } from "../../../Helpers/adminHelper";


const currentYear = new Date().getFullYear();

const YearlyChart = ({ aspect, title }) => {
  const [data,setData] = useState([])
  useEffect(()=>{
    getYearlyData().then((data)=>{
      setData(data?.data)
      
    })

  },[]);



  const options = {
    chart: {
    id: "basic-bar"
    },
    xaxis: {
    categories:[currentYear]
    }
    };
    
    const series = [
    {
    name: "yearly report",
    data: data
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

export default YearlyChart;
