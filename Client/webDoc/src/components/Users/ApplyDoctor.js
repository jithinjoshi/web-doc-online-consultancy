import React from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';

const ApplyDoctor = () => {
    const validate = values => {
        const errors = {};


        if (!values.firstName) {
            errors.firstName = toast.error("first name is required");
        } else if (values.firstName.length < 3) {
            errors.firstName = toast.error("firstname should contain three characters")
        }
        else if (!values.lastName) {
            errors.lastName = toast.error("Last name is required");
        }
        else if (!values.address) {
            errors.address = toast.error("address is required");
        }else if (!values.startTime) {
            errors.dob = toast.error("start time is required");
        }else if(!values.endTime){
            errors.endTime = toast.error("end time is required")
        }else if(!values.about){
            errors.about = toast.error("About is required")
        }else if(!values.experience){
            errors.experience = toast.error("Experience is required")
        }else if(values.experience > 60){
            errors.experience = toast.error("enter a valid experience")
        }
        else if(!values.fees){
            errors.fees = toast.error("fees is required")
        }


        // else if (!image) {
        //     errors.image = toast.error("must contain a image")
        // }
        
        // }else if(result !== 'jpg' && result !== 'jpeg' && result !== 'png' && result !== 'webp'){
        //     errors.image = toast.error("This format of image is not supported")
        // }



        return errors
    }


return (
    <>
        <section class=" py-1 bg-blueGray-50">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div class="rounded-t bg-white mb-0 px-6 py-6">
                        <div class="text-center flex justify-between">
                            <h6 class="text-blueGray-700 text-xl font-bold">
                                Apply Doctor
                            </h6>
                            <button class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                                save
                            </button>
                        </div>
                    </div>
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Username
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='username' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Email address
                                        </label>
                                        <input type="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='email' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            First Name
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='firstName' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Last Name
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='lastName' />
                                    </div>
                                </div>
                            </div>

                            <hr class="mt-6 border-b-1 border-blueGray-300" />

                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Contact Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Address
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='address' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Mobile Number
                                        </label>
                                        <input type="number" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='mobile' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Date Of Birth
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='dob' />
                                    </div>
                                </div>
                            </div>

                            <hr class="mt-6 border-b-1 mb-2 border-blueGray-300" />

                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                Image
                            </label>
                            <input class="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="small_size" type="file" name='image' />


                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                About Me
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            About me
                                        </label>
                                        <textarea type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" name='about'></textarea>
                                    </div>
                                </div>
                            </div>

                            <hr class="mt-6 border-b-1 mb-2 border-blueGray-300" />


                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Professional Informations
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-2/6 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Department
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='department' />
                                    </div>
                                </div>
                                <div class="w-full lg:w-2/6 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Experience
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='experience' />
                                    </div>
                                </div>

                                <div class="w-full lg:w-2/6 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Fees
                                        </label>
                                        <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='fees' />
                                    </div>
                                </div>


                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            Start Time
                                        </label>

                                        <div class="container mx-auto">
                                            <div class="inline-flex text-lg border rounded-md shadow-lg p-2">
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="02">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">02</option>
                                                </select>
                                                <span class="px-2 py-2">:</span>
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="00">00</option>
                                                </select>
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="AM">AM</option>
                                                    <option value="PM">PM</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                            End Time
                                        </label>

                                        <div class="container mx-auto">
                                            <div class="inline-flex text-lg border rounded-md shadow-lg p-2">
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="02">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">02</option>
                                                </select>
                                                <span class="px-2 py-2">:</span>
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="00">00</option>
                                                </select>
                                                <select name="" id="" class="px-2 outline-none appearance-none bg-transparent">
                                                    <option value="AM">AM</option>
                                                    <option value="PM">PM</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                        Upload Medical Certificate
                                    </label>

                                    <div class="flex items-center justify-center w-full">
                                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" class="hidden" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}

export default ApplyDoctor