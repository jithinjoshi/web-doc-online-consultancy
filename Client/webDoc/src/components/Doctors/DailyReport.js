import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { dailyReport } from '../../Helpers/doctorHelper';


const DailyReport = () => {
    const today = new Date().toISOString().slice(0, 10)
    const [report,setReport] = useState([])
    useEffect(()=>{
        dailyReport().then((report)=>{
            setReport(report?.data)

        })
    },[])

  
    
    const options = {
        chart: {
        id: "basic-bar"
        },
        xaxis: {
        categories: [today]
        }
        };
        
        const series = [
        {
        name: "daily report",
        data: [report]
        }
        ];
  return (
    <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold leading-none text-gray-900">Daily Revenue</h3>
            </div>
            <div class="flow-root">
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        </div>
  )
}

export default DailyReport