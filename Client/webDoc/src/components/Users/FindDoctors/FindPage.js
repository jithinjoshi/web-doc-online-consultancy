import React, { useEffect, useState } from 'react'
import ListOfDoctors from '../ListOfDoctors';
import { getAllDepartments, getAllDoctors } from '../../../Helpers/userHelper';

const FindPage = () => {
    const [searchInput, setSearchInput] = useState();
    const [filterDoctor, setFilterDoctor] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        getAllDoctors().then((doctors) => {
            setFilterDoctor(doctors);
            setAllDoctors(doctors);
        })
    }, []);



    const keys = ["firstName","lastName","department"]

    const search = (item)=>{
        if(!searchInput){
            return item;
        }
        return item.filter((i)=>keys.some((key)=> i[key].toLowerCase().includes(searchInput)));

    }



    return (
        <>

            <div class="p-6 grid grid-cols-1 gap-6 bg-slate-100 shadow-lg rounded-lg mt-6">
                <h4 className='text-2xl font-bold'>Search</h4>
                <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Doctors...." required onChange={(e)=>setSearchInput(e.target.value)}/>
                    </div>
                </div>
                {/* <div class="flex justify-center mt-3"><button class="p-2 border w-1/4 rounded-md bg-blue-500 text-white" onClick={searchHandler}>Search</button></div> */}
            </div>

            <ListOfDoctors doctors={search(allDoctors)} />

        </>
    )
}

export default FindPage