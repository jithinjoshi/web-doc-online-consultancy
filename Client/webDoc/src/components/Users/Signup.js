import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { googleRegister, loginWithOtp, registerUser } from '../../Helpers/userHelper'

import { app } from '../../config/firebase-config'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const validate = values => {
    const errors = {};

    //username
    if (!values.username) {
        errors.username = toast.error('Username Required')
    } else if (values.username.length < 4) {
        errors.username = toast.error('username should contain atleast Four characters')
    }


    //email
    else if (!values.email) {
        errors.email = toast.error("email is required")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("invalid email address")
    }

    //mobile
    else if (!values.mobile) {
        errors.mobile = toast.error("mobile number is required");
    }
    else if (!/^[1-9]{1}[0-9]{9}$/.test(values.mobile)) {
        errors.mobile = toast.error("invalid mobile number")
    }


    //password
    else if (!values.password) {
        errors.password = toast.error('password is required');
    } else if (values.password.length < 6) {
        errors.password = toast.error("password should contain atleast Six characters")
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('wrong password');
    }

    //confirm password

    else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = toast.error("it doesn't match with the first password")
    }

    return errors
}

const Signup = () => {
    const history = useNavigate()

    //validation
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {

            const register = registerUser(values)

            toast.promise(register, {
                loading: 'creating...',
                success: <b>sign up successfully</b>,
                error: <b>Can't sign up user</b>
            })

            register.then((data) => {
                if (data) {
                    history("/signin")
                }
            })


        }
    })

    //signup with google

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const loginwithGoogle = async () => {
        const response = await signInWithPopup(firebaseAuth, provider);
    }

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                   
                    googleRegister(token).then(data => {
                        if (data.user) {
                            history("/")
                        }

                    }).catch((err) => {
                        return err;
                    })
                })
            }
        })
    }, []);

    return (
        <div class="antialiased">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 class="text-4xl font-medium">Sign Up</h1>
                <p class="text-slate-500">Hello, Welcome</p>

                <div class="my-5">
                    <button class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150" onClick={loginwithGoogle}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt="" /> <span>Signup with Google</span>
                    </button>
                </div>
                <form class="my-10" onSubmit={formik.handleSubmit}>
                    <div class="flex flex-col space-y-5">
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">Username</p>
                            <input id="text" name="username" type="username" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username} />
                        </label>
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">Email address</p>
                            <input id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email} />
                        </label>
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">Mobile Number</p>
                            <input id="mobile" name="mobile" type="number" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile} />
                        </label>
                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">Password</p>
                            <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}/>
                        </label>
                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">confirm Password</p>
                            <input id="password" name="confirmPassword" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}/>
                        </label>
                       
                        <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Signup</span>
                        </button>
                        <p class="text-center">Already have an account <Link to='/signin' class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span></Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup