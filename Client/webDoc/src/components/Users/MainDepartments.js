import React from 'react'

const MainDepartments = ({departments}) => {
    return (
        <>
            <div class=" bg-gray-50 overflow-hidden mb-4">
                <div class="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
                <div class="flex flex-col text-center w-full mb-20">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Departments</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Highly qualified team of some of the best names in Hospitality who deliver improved well-being to you. Carefully vetted through a rigorous selection process. Trained and experienced in all various techniques.</p>
                    </div>
                    <div class="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            departments.map((department)=>{
                                return(
                                    <div class="relative group bg-white transition hover:z-[1] hover:shadow-2xl mt-4">
                            <div class="relative p-8 space-y-8">
                                <div class="space-y-2">
                                    <h5 class="text-xl text-gray-800 font-medium transition group-hover:text-blue-500">{department?.department}</h5>
                                    <p class="text-sm text-gray-600">{`Highly qualified and experienced ${department.department}'s helps you to cure your diseases`}</p>
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

export default MainDepartments