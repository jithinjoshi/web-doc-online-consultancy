import React from 'react';
import { selectUser } from '../../Redux/Doctor/doctorSlice';
import { useSelector } from 'react-redux';
import { checkConversationExistance, createConversation } from '../../Helpers/doctorHelper';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Appointments = ({ appointments, totalPages, currentPage, setCurrentPage }) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const createChatHandler = async (userId) => {
        const credentials = {
            senderId: userId,
            recieverId: user?._id,
        };

        const isExist = await checkConversationExistance(credentials);

        if (isExist?.data?.success) {
            const create = await createConversation(credentials);
        }
        navigate('/doctor/chat');
    };

    const now = Date.now();
    const momentObj = moment(now);
    const formattedTime = momentObj.format('h:mm a');

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            NO:
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Username
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Mobile
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Date
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Time
                                        </th>
                                        <th scope="col" className="text-sm text-center font-medium text-gray-900 px-6 py-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {appointments?.map((appointment, index) => (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{appointment?.userId?.username}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{appointment?.userId?.email}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                +{appointment?.userId?.mobile}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {appointment?.date.split('T')[0]}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{appointment?.time}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => createChatHandler(appointment?.userId?._id)}
                                                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                    Chat
                                                </button>
                                                <Link to={`/room/${appointment?.userId?._id}`} className='inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ms-4'>
                                                    create room
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center my-6">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${i + 1 === currentPage ? 'text-blue-500' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            next
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Appointments;
