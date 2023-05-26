import React, { useEffect, useState } from 'react'
import { getDoctorPrescription } from '../../Helpers/userHelper'
import { Link, useParams } from 'react-router-dom'

const Prescriptions = () => {
    const { doctorId } = useParams();
    const [prescripions, setPrescriptions] = useState([])
    useEffect(() => {
        getDoctorPrescription(doctorId).then((prescription) => {
            setPrescriptions(prescription?.data)
        })

    }, [])
    return (
        <>

            <div class="flex justify-center min-h-screen p-10">
                <div class="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5">
                    <h1 class="py-5 text-2xl">Prescriptions</h1>

                    {/* <div class="flex bg-opacity-20 border border-gray-200 rounded-md">
                        <ion-icon class="py-4 p-3" name="search-outline"></ion-icon>
                        <input type="email" name="email" id="email" placeholder="Search Review" class="p-2 bg-transparent focus:outline-none"/>
                    </div> */}


                    {
                        prescripions?.length > 0 ?

                            prescripions?.map((prescripion) => {
                                return (
                                    <div class="flex flex-col gap-3">
                                        <div class="flex flex-col gap-4 bg-gray-100 p-4">

                                            <div class="flex justify justify-between">
                                                <div class="flex gap-2">
                                                    <img src={prescripion?.doctorId?.image?.secure_url} alt='' class="w-10 h-10 text-center rounded-full" />
                                                    <span className='text-xl'>{`${prescripion?.doctorId?.firstName}  ${prescripion?.doctorId?.lastName}`}</span>
                                                </div>
                                            </div>

                                            <div>
                                                {prescripion?.description}
                                            </div>

                                            <div class="flex justify-between">
                                                <span className='text-blue-600'>{prescripion?.createdAt?.split('T')[0]}</span>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })

                            :
                            <section className="py-4 overflow-hidden">
                                <div className="container px-4 mx-auto">
                                    <img
                                        className="mx-auto w-28"
                                        src="https://images.assetsdelivery.com/compings_v2/blankstock/blankstock1903/blankstock190300973.jpg"
                                        alt=""
                                    />
                                    <div className="max-w-md mx-auto text-center">
                                        <h2 className="font-heading mb-3 text-2xl font-semibold">No prescriptions available</h2>
                                        <p className="mb-7 text-neutral-500">
                                            Doctor does'nt added any prescriptions
                                        </p>
                                    </div>
                                </div>
                            </section>
                    }


                </div>
            </div>
        </>
    )
}

export default Prescriptions