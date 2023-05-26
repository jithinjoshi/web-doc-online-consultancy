import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { yearlyReport } from '../../Helpers/doctorHelper';

const YearlyReport = () => {
    const year = new Date().getFullYear();
    const [report,setReport] = useState([])
    useEffect(()=>{
        yearlyReport().then((data)=>{
            setReport(data?.data)

        })
    },[])
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [year]
        }
    };

    const series = [
        {
            name: "yearly report",
            data: report
        }
    ];
    return (
        <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold leading-none text-gray-900">Yearly Revenue</h3>
            </div>
            <div class="flow-root">
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        </div>
    )
}

export default YearlyReport