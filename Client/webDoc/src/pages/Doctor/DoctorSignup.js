import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import { addPassword, signupDoctor } from '../../Helpers/doctorHelper';
import { useParams } from 'react-router-dom';


const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = toast.error('password is required');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('wrong password');
    }else if(values.password.length <= 5){
        errors.password = toast.error('password must contain 6 characters')
    }else if(values.password !== values.confirmPassword){
        errors.confirmPassword = toast.error("passwords does'nt matching")
    }
    return errors

}

const DoctorSignup = () => {
    const history = useNavigate();

    const { id } = useParams();
    const [email, setEmail] = useState()
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const addPswd = addPassword(id,values)
            toast.promise(addPswd, {
                loading: 'updating...',
                success: <b>password updated successfull</b>,
                error: <b>can't update the data</b>
            })

            addPswd.then((user) => {
                if (user) {

                    setTimeout(() => {
                        history("/doctor/signin");
                    }, 2000)

                }
            }).catch((err) => {
                return err;
            })

        }
    })

    

    useEffect(() => {

        signupDoctor(id).then((email) => {
            setEmail(email?.data?.email?.email)
        })

    }, [])
    return (
        <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <Toaster position='top-center' reverseOrder={false}></Toaster>
                        <div>
                            <h1 class="text-2xl font-semibold">Doctor Signup</h1>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="divide-y divide-gray-200">
                                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div class="relative">
                                        <input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address"
                                            value={email} disabled />
                                        <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div class="relative">
                                        <input autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password} />
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div class="relative">
                                        <input autocomplete="off" id="password" name="confirmPassword" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="re enter the password again" onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}/>
                                        <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">confirm Password</label>
                                    </div>
                                    <div class="relative">
                                        <button class="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSignup