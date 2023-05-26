import React, { useEffect, useState } from 'react'
import Form from './Form'
import { getUser, profileOfUser } from '../../../Helpers/userHelper'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { login } from '../../../Redux/User/userSlice'



const ProfileName = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])

    let result;
   

    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [mobile, setMobile] = useState();
    const [dob, setDob] = useState();
    const [city, setCity] = useState();
    const [username, setUsername] = useState();
    const [image, setImage] = useState();
    const [gender, setGender] = useState();

    const handleUserImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFile(file)
        
    };


    const TransformFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result)
            };
        } else {
            setImage("")
        }
    }

      //validate
      if (image) {

        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        result = image.slice(index + 1, endIndex);

    }


    const validate = () => {
        const errors = {};


        if (!username) {
            errors.username = toast.error("username is required");
        } else if (username.length < 6) {
            errors.firstName = toast.error("username should contain six characters")
        }
        else if (!email) {
            errors.email = toast.error("email is required");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = toast.error("invalid email address")
        } else if (!address) {
            errors.address = toast.error("address is required");
        } else if (!city) {
            errors.city = toast.error("city name is required");

        } else if (!mobile) {
            errors.mobile = toast.error("mobile number is required")
        }

        if (image) {
            if (result !== 'jpg' && result !== 'jpeg' && result !== 'png' && result !== 'webp') {
                errors.image = toast.error("This format of image is not supported")
            }
        }



        return errors
    }


    useEffect(() => {
        getUser().then((user) => {
            setUserData(user?.data);
            setEmail(user?.data?.email);
            setUsername(user?.data?.username);
            setAddress(user?.data?.address);
            setDob(user?.data?.dob);
            setGender(user?.data?.gender);
            setMobile(user?.data?.mobile);
            setCity(user?.data?.city);

        }).catch((err) => {
            return err;
        })

    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            mobile: '',
            password: '',
            gender: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: () => {
            const credentials = {
                username,
                email,
                address,
                dob,
                image,
                gender,
                mobile,
                city
            }

            profileOfUser(credentials).then((user) => {
        
                dispatch(
                    login({
                        _id: user.data._id,
                        username: user.data.firstName,
                        mobile: user.data.mobile,
                        isActive:user.data.isActive
                    })
                );
                toast.success("user updated successfully")

                navigate("/")

            }).catch((err) => {
                toast.error("user updation failed")
                return err;
            })

        }
    });

    

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div class="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6 flex flex-col md:flex-row">
                    <Toaster position='top-center' reverseOrder={false}></Toaster>
                    <div class="w-full h-full rounded border border-1 shadow border-gray-300 flex items-center ps-10">
                        {/* <div className='relative'>
                            <img class="mb-3 w-32 h-32 rounded-full shadow-lg flex justify-start md:justify-center m-3 order-2 md:order-none md:ml-4" src={ 'https://cdn-icons-png.flaticon.com/512/149/149071.png'|| userData?.image?.secure_url} alt="product designer" />
                            <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept='image/*' onChange={handleUserImageUpload} />
                        </div> */}

                        <h1 class="text-small font-medium flex sm:text-4xl sm:ms-9">{userData?.username}</h1>
                    </div>
                </div>


                <h1 className='text-center text-2xl font-bold underline'>Personal Information</h1>
                <div className="flex items-center justify-center p-12">
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="mx-auto w-full max-w-[550px]">
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
                                            onChange={(e) => setUsername(e.target.value)} value={username}
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
                                        <select id="countries" onChange={(e) => setGender(e.target.value)} value={gender} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option selected>Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        {/* <select
                                    type="text"
                                    name="gender"
                                    id="lName"
                                    placeholder="Gender"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                                <select /> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div class="mb-5">
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
                            value={userData?.email}
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div> */}

                            <div class="-mx-3 flex flex-wrap">
                                <div class="w-full px-3 sm:w-1/2">
                                    <div class="mb-5">
                                        <label
                                            for="date"
                                            class="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="date"
                                            placeholder='email'
                                            onChange={(e) => setEmail(e.target.value)} value={email}
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
                                            Mobile
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            id="lName"
                                            placeholder="Mobile"
                                            onChange={(e) => setMobile(e.target.value)} value={mobile}
                                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
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
                                            onChange={(e) => setDob(e.target.value)} value={dob}
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
                                            onChange={(e) => setCity(e.target.value)} value={city}
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
                                    onChange={(e) => setAddress(e.target.value)} value={address}
                                    class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                    Submit
                                </button>
                            </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProfileName