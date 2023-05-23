import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { weeklyReport } from '../../Helpers/doctorHelper';

const WeeklyReport = () => {
    const [report,setReport] = useState([])
    useEffect(()=>{
       weeklyReport().then((report)=>{
        setReport(report?.data)
       })
    },[])
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
        name: "weekly report",
        data: report
        }
        ];
    return (
        <>
            <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">Weekly Revenue</h3>
                </div>
                <div class="flow-root">
                <Chart options={options} series={series} type="bar" width="500" />  
                </div>
            </div>
        </>
    )
}

export default WeeklyReport