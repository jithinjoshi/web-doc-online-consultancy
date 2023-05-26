import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { getMonthlyReport } from '../../Helpers/doctorHelper';

const MonthlyReport = ({userId}) => {
    const [data,setData] = useState([])

    useEffect(()=>{
        getMonthlyReport().then((report)=>{
            setData(report?.data)

        })

    },[])
    const options = {
        chart: {
        id: "basic-bar"
        },
        xaxis: {
        categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]
        }
        };
        
        const series = [
        {
        name: "monthly report",
        data: data
        }
        ];
    return (
        <>
            <div class="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold leading-none text-gray-900">Monthly Revenue</h3>
                </div>
                <div class="flow-root">
                <Chart options={options} series={series} type="bar" width="500" />  
                </div>
            </div>
        </>
    )
}

export default MonthlyReport