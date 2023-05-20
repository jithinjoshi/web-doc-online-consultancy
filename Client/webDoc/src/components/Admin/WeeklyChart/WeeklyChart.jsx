import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./WeeklyChart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getChartData, getWeeklyData } from "../../../Helpers/adminHelper";



const WeeklyChart = ({ aspect, title }) => {
  const [data,setData] = useState([])
  useEffect(()=>{
    getWeeklyData().then((data)=>{
      setData(data?.data)
      
    })

  },[]);

  const options = {
    chart: {
    id: "basic-bar"
    },
    xaxis: {
    categories: ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    }
    };
    
    const series = [
    {
    name: "series-1",
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

export default WeeklyChart;
