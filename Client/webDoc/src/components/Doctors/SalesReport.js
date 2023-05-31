import React, { useEffect, useRef, useState } from 'react';
import { salesReport } from '../../Helpers/doctorHelper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

const SalesReport = () => {
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const generatePDF = () => {
        html2canvas(tableRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('sales report.pdf');
        });
    };

    const [report, setReport] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchTransactions = async (page) => {
        try {
            const data = await salesReport(page);
            setReport(data.transactions);
            setTotalPages(data.totalPages);
        } catch (error) {
            navigate('/doctor/signin'); 
            console.error(error);
            setReport([]);
            setTotalPages(0);
        }
    };

    useEffect(() => {
        fetchTransactions(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    return (
        <div className='bg-gray-50'>
            <div className='overflow-x-auto w-full'>
                <div className='flex justify-end'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5' onClick={generatePDF}>
                        Download PDF
                    </button>
                </div>

                <table ref={tableRef} className='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                    <thead class="bg-gray-900">
                        <tr class="text-white text-left">
                            <th class="font-semibold text-sm uppercase px-6 py-4"> NO:</th>
                            <th class="font-semibold text-sm uppercase px-6 py-4"> Patient</th>
                            <th class="font-semibold text-sm uppercase px-6 py-4">Consulted Date</th>
                            <th class="font-semibold text-sm uppercase px-6 py-4">Consulted Time</th>
                            <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Price </th>
                            <th class="font-semibold text-sm uppercase px-6 py-4 text-center">status</th>
                            <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Paid By </th>
                            <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        {
                            report?.map((user, index) => {
                                return (
                                    <tr>
                                        <td class="px-6 py-4">
                                            <p class="">{index + 1}</p>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center space-x-3">
                                                {/* <div class="inline-flex w-10 h-10"> <img class='w-10 h-10 object-cover rounded-full' alt='User avatar' src='https://i.imgur.com/siKnZP2.jpg' /> </div> */}
                                                <div>
                                                    <p> {user?.userId?.username}</p>
                                                    <p class="text-gray-500 text-sm font-semibold tracking-wide"> {user?.userId?.email} </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <p class="">{user?.date?.split("T")[0]}</p>
                                        </td>
                                        <td class="px-6 py-4">
                                            <p class="">{user?.time}</p>
                                        </td>
                                        <td class="px-6 py-4">
                                            <p class="">₹{user?.price}</p>
                                        </td>

                                        {
                                            user?.userId?.isActive ?
                                                <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> Active </span> </td>
                                                :
                                                <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-red-600 font-semibold px-2 rounded-full"> InActive </span> </td>
                                        }

                                        <td class="px-6 py-4">
                                            <p class=""> {user?.paymentOwner} </p>
                                            <p class="text-gray-500 text-sm font-semibold tracking-wide"> {user?.paymentOwnerEmail} </p>
                                        </td>
                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>

                <div className="w-full border-t border-gray-300 mt-9">
                    <div className="mt-5 flex items-center justify-between">
                        <div>
                            <p>
                                showing <strong>{currentPage}</strong> of <strong>{totalPages}</strong> results
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                onClick={() => handlePageChange(currentPage - 1)} // Handle previous page
                                disabled={currentPage === 1} // Disable button if already on the first page
                            >
                                &larr; Previous
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                onClick={() => handlePageChange(currentPage + 1)} // Handle next page
                                disabled={currentPage === totalPages} // Disable button if already on the last page
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SalesReport;