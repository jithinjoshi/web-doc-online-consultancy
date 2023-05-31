import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { getUser, googleLogin, loginUser } from '../../Helpers/userHelper'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../config/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/User/userSlice'

//validation
const validate = values => {
    const errors = {};

    //email
    if (!values.email) {
        errors.email = toast.error("email is required")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = toast.error("invalid email address")
    }

    //password
    else if (!values.password) {
        errors.password = toast.error('password is required');
    } else if (values.password.includes(' ')) {
        errors.password = toast.error('wrong password');
    }
    return errors

}

const Signin = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [loginWithGoogle,setLoginwithGoogle] = useState();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const signin = loginUser(values)
            toast.promise(signin, {
                loading: 'searching...',
                success: <b>sign in successfull</b>,
                error: <b>can't find the user</b>
            })

            signin.then((user) => {
                if (user) {
             
                    dispatch(
                        login({
                            _id: user.data.user._id,
                            email: user.data.user.email,
                            username: user.data.user.username,
                            token: user?.data?.token,
                            mobile:user?.data?.mobile,
                            loggedIn: true
                        })
                    )

                    getUser().then((user) => {
                        setUser(user)
                    });

                    setTimeout(() => {
                        history("/")
                    }, 1000)


                }
            }).catch((err) => {
                return err;
            })

        }
    })

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const loginwithGoogle = async () => {
        const response = await signInWithPopup(firebaseAuth, provider);
        setLoginwithGoogle(response);

    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                   
                    googleLogin(token).then(data => {
                       
                        if (data.user) {
                            setTimeout(() => {
                                history("/")
                            }, 2000)

                        }

                    }).catch((err) => {
                        return err;
                    })
                })
            }
        })
    }, [loginWithGoogle])
    return (
        <div class="antialiased">
            <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
                <h1 class="text-4xl font-medium">Login</h1>
                <p class="text-slate-500">Hi, Welcome back</p>

                <div class="my-5">
                    <button class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150" onClick={loginwithGoogle}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt="" /> <span>Login with Google</span>
                    </button>
                    <Link to='/phone' class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                        <img src="https://www.svgrepo.com/show/381137/transaction-password-otp-verification-code-security.svg" class="w-6 h-6" alt="" /> <span>Login with OTP</span>
                    </Link>
                </div>
                <form onSubmit={formik.handleSubmit} class="my-10">
                    <div class="flex flex-col space-y-5">
                        <label for="email">
                            <p class="font-medium text-slate-700 pb-2">Email address</p>
                            <input id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email} />
                        </label>
                        <label for="password">
                            <p class="font-medium text-slate-700 pb-2">Password</p>
                            <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} />
                        </label>
                        <div class="flex flex-row justify-between">

                            <div>
                                <Link to='/forgot-password' class="font-medium text-indigo-600">Forgot Password?</Link>
                            </div>
                        </div>
                        <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center" type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Login</span>
                        </button>
                        <p class="text-center">Not registered yet? <Link to='/signup' class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg></span></Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signin