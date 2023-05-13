import React from 'react'

const Schedule = () => {
    return (
        <div class="flex items-center justify-center p-24">
            <div class="mx-auto w-96 border h-80 p-5 flex flex-col items-center justify-center">
                <form action="">

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="time"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    starting Time
                                </label>
                                <input
                                    type="time"
                                    name="startingTime"
                                    id="time"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />

                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="time"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Ending Time
                                </label>
                                <input
                                    type="time"
                                    name="endingTime"
                                    id="time"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>



                    <div className='flex flex-col items-center justify-center'>
                        <button
                            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Schedule