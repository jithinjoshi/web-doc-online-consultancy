import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { leave } from '../../Helpers/doctorHelper';

const LeaveDatePicker = ({user}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [leaveDates, setLeaveDates] = useState([]);

    


    useEffect(()=>{
        leave(user,leaveDates)
    },[leaveDates])


    const selcetedDates = ((e) => {
        e.preventDefault();
        setSelectedDate(null)
        if(!leaveDates.includes(selectedDate.toLocaleDateString())){
        setLeaveDates((prev) => [...prev, selectedDate.toLocaleDateString()]);
        }
    })

    const removeHandler = ((dateToRemove)=>{
        setLeaveDates((prev) => prev.filter((date) => date !== dateToRemove));
        
    })
    return (
        <>
            <div className="w-64 flex justify-between">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    maxDate={new Date().setDate(new Date().getDate() + 30)}
                    className="w-full text-center bg-white border border-gray-300 rounded-md shadow p-2"
                />
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ms-9 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={selcetedDates}>Select</button>

            </div>

            <div class="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
                <div class="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">

                        {
                            leaveDates?.map((date) => {
                                return (
                                    <div class="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                                        <div class="pt--10 pr-0 pb-10 pl-0">
                                            <div class="pt-5 pr-0 pb-0 pl-0 mt-5 mr-0 mb-0 ml-0">
                                                <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                    <div class="flex items-center flex-1 min-w-0">
                                                        <div class="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                                            <p class="text-lg font-bold text-gray-800 truncate">{date}</p>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                                        <Link href="" class="bg-red-600 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                                                duration-200 hover:bg-red-700 rounded-lg" onClick={()=>removeHandler(date)}>Remove</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })
                        }




                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveDatePicker