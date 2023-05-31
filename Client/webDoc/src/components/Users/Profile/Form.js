import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { profileOfUser } from '../../../Helpers/userHelper';
import { useNavigate } from 'react-router-dom';

const validate = values => {
  const errors = {};

  //username
  if (!values.username) {
    errors.username = toast.error('Username Required');
  } else if (values.username.length < 4) {
    errors.username = toast.error('Username should contain at least four characters');
  }

  //email
  else if (!values.email) {
    errors.email = toast.error('Email is required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error('Invalid email address');
  }

  //mobile
  else if (!values.mobile) {
    errors.mobile = toast.error('Mobile number is required');
  } else if (!/^[1-9]{1}[0-9]{9}$/.test(values.mobile)) {
    errors.mobile = toast.error('Invalid mobile number');
  }

  //dob
  else if (!values.dob) {
    errors.dob = toast.error('Date of Birth is required');
  }

  //city
  else if (!values.city) {
    errors.city = toast.error('City is required');
  }

  //address
  else if (!values.address) {
    errors.address = toast.error('Address is required');
  }

  return errors;
};

const Form = ({ userData }) => {
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: userData?.email || '',
      username: userData?.username || '',
      mobile: userData?.mobile || '',
      dob: userData?.dob || '',
      city: userData?.city || '',
      address: userData?.address || '',
      gender: userData?.gender || '',
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      const profile = profileOfUser(values);
      toast.promise(profile, {
        loading: 'Updating...',
        success: <b>Update user successful</b>,
        error: <b>Can't update the user</b>,
      });

      profile
        .then(user => {
          if (user) {
            setTimeout(() => {
              history('/');
            }, 1000);
          }
        })
        .catch(err => {
            return err;
        });
    },
  });

  return (
    <div className="flex items-center justify-center p-12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={formik.handleSubmit}>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
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
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mobile}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div>
                        <button
                            type='submit'
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