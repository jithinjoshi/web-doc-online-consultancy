import React from 'react'

const Form = () => {
    return (
        <div class="flex items-center justify-center p-12">
            <div class="mx-auto w-full max-w-[550px]">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="fName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="fName"
                                    placeholder="Name"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="age"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    name="gender"
                                    id="lName"
                                    placeholder="Gender"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label
                            for="email"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="guest"
                            placeholder="Email"
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="date"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    id="date"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="time"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    city
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    id="lName"
                                    placeholder="City"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mb-5">
                        <label
                            for="email"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="guest"
                            placeholder="Address"
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div>
                        <button
                            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form