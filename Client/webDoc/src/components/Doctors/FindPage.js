import React, { useEffect, useState } from 'react';
import { getMyAppointments } from '../../Helpers/doctorHelper';
import Appointments from './Appointments';

const FindPage = () => {
    const [searchInput, setSearchInput] = useState('');
  const [filterDoctor, setFilterDoctor] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [report, setReport] = useState([]);

  const fetchAppointments = async (page) => {
    try {
      const data = await getMyAppointments(page);
      setReport(data?.data?.appointments);
      setTotalPages(data?.data?.totalPages);
    } catch (error) {
      console.error(error);
      setReport([]);
      setTotalPages(0);
    }
  };

  console.log(report)
  useEffect(() => {
    fetchAppointments(currentPage);
  }, [currentPage]);

  const keys = ["userId.username","userId.email"];
  const search = (item) => {
    if (!searchInput) {
      return item;
    }
    return item.filter((i) =>
      keys.some((key) => i[key.split('.')[0]][key.split('.')[1]]?.toLowerCase()?.includes(searchInput))
    );
  };


  return (
    <>
      <div className="p-6 grid grid-cols-1 gap-6  shadow-lg rounded-lg mt-6">
        <h4 className="text-2xl font-bold">Search</h4>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Doctors...."
              required
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Appointments
        appointments={search(report)}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FindPage;
