import React from 'react'
import { Link } from 'react-router-dom'

const MainDoctors = ({ doctors }) => {
    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-20">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Doctors</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Highly qualified team of some of the best names in Hospitality who deliver improved well-being to you. Carefully vetted through a rigorous selection process. Trained and experienced in all various techniques.</p>
                    </div>
                    <div class="flex flex-wrap -m-4">
                        {
                            doctors.map((doctor) => {
                                return (
                                    <div class="lg:w-1/4 sm:w-1/2 p-4">
                                        <div class="flex relative">
                                            <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center" src={doctor?.image?.secure_url} />
                                            <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{doctor?.department}</h2>
                                                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{`${doctor?.firstName} ${doctor?.lastName}`}</h1>
                                                <p class="leading-relaxed">{doctor?.about}</p>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                    <div class="flex flex-col justify-center items-center mt-3">
                        <Link to='/doctors' class="bg-blue-500 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded">View All Doctors</Link>
                    </div>


                </div>
            </section>
        </>
    )
}

export default MainDoctors