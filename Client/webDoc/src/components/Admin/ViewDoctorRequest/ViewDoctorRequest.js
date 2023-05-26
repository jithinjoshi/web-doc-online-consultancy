import React, { useEffect, useState } from 'react'
import { approveDoctor, denyDoctor, getDoctorRequest } from '../../../Helpers/adminHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';


const ViewDoctorRequest = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [doctorData, setDoctorData] = useState([]);

    useEffect(() => {
        getDoctorRequest(id).then((doctordata) => {
            setDoctorData(doctordata?.data)
        })
    }, [])


    const approveHandler = (async (e) => {
        e.preventDefault();


        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure for adding this doctor!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add him!'
        }).then((result) => {
            if (result.isConfirmed) {

                const approve = approveDoctor(id);

                toast.promise(approve, {
                    loading: 'adding doctor',
                    success: <b>Doctor added successfully</b>,
                    error: <b>Error: Unable to add doctor</b>
                })
                approve.then((user) => {
                    if (user) {
                        toast.success("doctor added successfull...")
                        history("/admin/doctors");
                    }
                }).catch((err) => {
                    toast.error("doctor request failed...")
                });

                Swal.fire(
                    'Success!',
                    'Doctor added successfull.',
                    'success'
                )
            }
        })





    })

    const declineDoctor = (async (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                const decline = denyDoctor(id);
                toast.promise(decline, {
                    loading: 'deleting request of doctor',
                    success: <b>Doctor added successfully</b>,
                    error: <b>Error: Unable to add doctor</b>
                })
                decline.then((user) => {
                    if (user) {
                        toast.success("doctor declined successfull...")
                        history("/admin/doctor-requests");
                    }
                }).catch((err) => {
                    toast.error("doctor request failed...")
                });
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })




    })


    return (
        <>
            <div class="flex h-screen items-center justify-center  mt-80 mb-32">
                <div class="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
                    <Toaster position='top-center' reverseOrder={false}></Toaster>

                    <div class="flex justify-center">
                        <div class="flex">
                            <h1 class="text-gray-600 font-bold md:text-2xl text-xl">Doctor Request</h1>
                        </div>
                    </div>

                    <div class="flex justify-center py-4">
                        <div>
                            <img class="rounded w-36 h-36" src={doctorData?.image?.secure_url} alt="Extra large avatar" />
                        </div>
                    </div>


                    <form>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">First Name</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="First Name" name='firstName' value={doctorData?.firstName} disabled />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Last Name</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Last Name" name='lastName' value={doctorData?.lastName} disabled />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Email</label>
                            <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="email" placeholder="Email" name='email' value={doctorData?.email} disabled />
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Address</label>
                            <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Address" name='address' value={doctorData?.address} disabled />
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Department</label>
                            <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Address" name='address' value={doctorData?.department} disabled />

                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Mobile Number</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="number" placeholder="Mobile" name='mobile' value={doctorData?.mobile} disabled />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Fees</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="fees" name='fees' value={doctorData?.fees} disabled />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Date Of Birth</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Mobile" name='mobile' value={doctorData?.dob} disabled />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Experience</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="fees" name='fees' value={doctorData?.experience} disabled />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Start Time</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="Mobile" name='mobile' value={doctorData?.startTime} disabled />
                            </div>
                            <div class="grid grid-cols-1">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End Time</label>
                                <input class="py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" type="text" placeholder="fees" name='fees' value={doctorData?.endTime} disabled />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">About</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder={doctorData?.about} disabled>{doctorData?.about}</textarea>
                        </div>



                        <div class="grid grid-cols-1 mt-5 mx-7">
                            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">certificate</label>
                            <div class='flex items-center justify-center w-full'>
                                <div class='flex flex-col items-center justify-center'>
                                    <img src={doctorData?.certificate?.secure_url} alt='certificate' />
                                </div>
                            </div>
                        </div>

                        <div class='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                            <button class='w-auto bg-red-500 hover:bg-red-700 rounded-lg shadow-xl font-medium text-white px-4 py-2' onClick={declineDoctor}>Decline</button>
                            <button class='w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2' onClick={approveHandler}>Approve</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ViewDoctorRequest