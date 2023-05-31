import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { applyDoctor, getAllDepartments } from '../../Helpers/userHelper';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/User/userSlice';

const ApplyDoctor = () => {
    const user = useSelector(selectUser);
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 23;
    const minYear = currentDate.getFullYear() - 80;
    const minDate = new Date(minYear, 0, 1);
    const dateBefore23Years = new Date(year, 0, 30);

    const [startDate, setStartDate] = useState(new Date('01/01/2000'));
    const [image, setImage] = useState("");
    const [certificate, setCertificate] = useState("")
    const [value, setFieldValue] = useState({});
    const [departments, setDepartments] = useState();

    const [starthour, setStartHour] = useState("09");
    const [startminute, setStartMinute] = useState("00");
    const [startmeridiem, setStartMeridiem] = useState("AM");

    const [endhour, setEndHour] = useState("05");
    const [endminute, setEndMinute] = useState("00");
    const [endmeridiem, setEndMeridiem] = useState("PM");


    const [startTime, setStartTime] = useState("09:00 AM");
    const [endTime, setEndTime] = useState("05:00 PM");
    const history = useNavigate();

    useEffect(() => {
        setStartTime(`${starthour}:${startminute}${startmeridiem}`);
    }, [starthour, startminute, startmeridiem]);

    useEffect(() => {
        setEndTime(`${endhour}:${endminute}${endmeridiem}`);
    }, [endhour, endminute, endmeridiem]);

    const handleDoctorImageUpload = (e) => {
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

    let result;
    if (image) {

        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        result = image.slice(index + 1, endIndex);

    }

    //certificate upload
    const handleCertificateImageUpload = (e) => {
        const file = e.target.files[0];

        TransformCertificateFile(file)
    };

    const TransformCertificateFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setCertificate(reader.result)
            };
        } else {
            setCertificate("")
        }
    }

    let certificateResult;
    if (certificate) {

        const delimiter = '/';
        const end = ';'
        const index = image.indexOf(delimiter);
        const endIndex = image.indexOf(end);
        certificateResult = image.slice(index + 1, endIndex);

    }

    const validate = values => {
        const errors = {};


        if (!values.firstName) {
            errors.firstName = toast.error("first name is required");
        } else if (values.firstName.length < 3) {
            errors.firstName = toast.error("firstname should contain three characters")
        }
        else if (!values.lastName) {
            errors.lastName = toast.error("Last name is required");
        } else if (!values.fullName) {
            errors.fullName = toast.error("fullname is required");
        } else if (values.fullName < 5) {
            errors.fullName = toast.error("invalid fullname.fullname atleast contain five characters")
        }
        else if (!values.address) {
            errors.address = toast.error("address is required");
        } else if (!values.about) {
            errors.about = toast.error("About is required")
        } else if (values.about.length < 30) {
            errors.about = toast.error("about must atleast contain thirty words")
        } else if (!values.experience) {
            errors.experience = toast.error("Experience is required")
        } else if (values.experience > 60) {
            errors.experience = toast.error("enter a valid experience")
        } else if (isNaN(values.experience)) {
            errors.experience = toast.error("enter a valid experience")
        }
        else if (!values.fees) {
            errors.fees = toast.error("fees is required")
        } else if (values.fees > 2000) {
            errors.fees = toast.error("maximum 2000 rupees is allowed")
        } else if (!values.email) {
            errors.email = toast.error("email is requried");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = toast.error("invalid email address")
        } else if (!values.mobile) {
            errors.mobile = toast.error("mobile number is required");
        } else if (values.mobile.length < 10) {
            errors.mobile = toast.error("invalid mobile number")
        }
        else if (!image) {
            errors.image = toast.error("must contain a image")
        } else if (result !== 'jpg' && result !== 'jpeg' && result !== 'png' && result !== 'webp') {
            errors.image = toast.error("This format of image is not supported")
        } else if (!certificate) {
            errors.certificate = toast.error("certificate must provide")
        } else if (certificateResult !== 'jpg' && certificateResult !== 'jpeg' && certificateResult !== 'png' && certificateResult !== 'webp') {
            errors.certificate = toast.error("This format of image is not supported")
        }



        return errors
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            address: '',
            mobile: '',
            dob: '',
            about: '',
            experience: '',
            fees: ''
        },
        validate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            const date = moment(startDate).format('MM-DD-YYYY');
            const img = { image: image, dob: date, certificate: certificate, startTime: startTime, endTime: endTime,userId:user?._id}
            const imgCopy = Object.assign({}, values, img, value);

            if (!imgCopy.department) {
                imgCopy.department = departments[0].department;
            }

            const doctor = applyDoctor(imgCopy);

            toast.promise(doctor, {
                loading: 'Creating doctor...',
                success: <b>Doctor applied successfully</b>,
                error: <b>Error: Unable to apply doctor</b>
            })
            doctor.then((user) => {
                if (user) {
                    toast.success("apply for doctor successfull...")
                    history("/");
                }
            }).catch((err) => {
                return err;
            });
        }
    });


    useEffect(() => {
        getAllDepartments().then((data) => {
            setDepartments(data)
        }).catch((err) => {
            return err;
        })
    }, []);


    return (
        <>
            <section class=" py-1 bg-blueGray-50">
                <Toaster position='top-center' reverseOrder={false}></Toaster>

                <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div class="rounded-t bg-white mb-0 px-6 py-6">
                                <div class="text-center flex justify-between">
                                    <h6 class="text-blueGray-700 text-xl font-bold">
                                        Apply Doctor
                                    </h6>
                                    <button type='submit' class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
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
                                                    Fullname
                                                </label>
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='fullName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} />
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Email address
                                                </label>
                                                <input type="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    First Name
                                                </label>
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='firstName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Last Name
                                                </label>
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='lastName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
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
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='address' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Mobile Number
                                                </label>
                                                <input type="number" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='mobile' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Date Of Birth
                                                </label>
                                                <DatePicker name="dob" id='city' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" selected={startDate} value={startDate} onChange={(date) => setStartDate(date)} maxDate={dateBefore23Years} minDate={minDate}
                                                    onBlur={formik.handleBlur} />
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="mt-6 border-b-1 mb-2 border-blueGray-300" />

                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                        Image
                                    </label>
                                    {
                                        image ?
                                            <div className="flex flex-wrap justify-center mb-2">
                                                <div className="relative w-24 h-24">
                                                    <img src={image} alt="..." className="rounded-full border border-gray-100 shadow-sm overflow-hidden" />
                                                </div>
                                            </div>

                                            :
                                            <div className="flex flex-wrap justify-center mb-5">
                                                <div className="w-16 h-16 sm:w-4/12 rounded-full">
                                                    <p>add image</p>
                                                </div>
                                            </div>
                                    }
                                    <input class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none " id="default_size" type="file" name='image' accept='image/*' onChange={handleDoctorImageUpload}></input>



                                    <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        About Me
                                    </h6>
                                    <div class="flex flex-wrap">
                                        <div class="w-full lg:w-12/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    About me
                                                </label>
                                                <textarea type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" name='about' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.about}></textarea>
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
                                                <select name="Department" id="department" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" onChange={(e) => setFieldValue({ department: e.target.value })}>

                                                    {
                                                        departments ?
                                                            departments.map((department) => {
                                                                return (
                                                                    <option value={department.department}>{department.department}</option>
                                                                )
                                                            })
                                                            :
                                                            <option></option>
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div class="w-full lg:w-2/6 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Experience
                                                </label>
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='experience' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.experience} />
                                            </div>
                                        </div>

                                        <div class="w-full lg:w-2/6 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Fees
                                                </label>
                                                <input type="text" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name='fees' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fees} />
                                            </div>
                                        </div>


                                        <div class="w-full lg:w-6/12 px-4">
                                            <div class="relative w-full mb-3">
                                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                                    Start Time
                                                </label>

                                                <div className="container mx-auto">
                                                    <div className="inline-flex text-lg border rounded-md shadow-lg p-2">
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={starthour}
                                                            onChange={(e) => setStartHour(e.target.value)}
                                                        >
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                        <span className="px-2 py-2">:</span>
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={startminute}
                                                            onChange={(e) => setStartMinute(e.target.value)}
                                                        >
                                                            <option value="00">00</option>
                                                        </select>
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={startmeridiem}
                                                            onChange={(e) => setStartMeridiem(e.target.value)}
                                                        >
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

                                                <div className="container mx-auto">
                                                    <div className="inline-flex text-lg border rounded-md shadow-lg p-2">
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={endhour}
                                                            onChange={(e) => setEndHour(e.target.value)}
                                                        >
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>
                                                            <option value="06">06</option>
                                                            <option value="07">07</option>
                                                            <option value="08">08</option>
                                                            <option value="09">09</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                        </select>
                                                        <span className="px-2 py-2">:</span>
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={endminute}
                                                            onChange={(e) => setEndMinute(e.target.value)}
                                                        >
                                                            <option value="00">00</option>
                                                        </select>
                                                        <select
                                                            name=""
                                                            id=""
                                                            className="px-2 outline-none appearance-none bg-transparent"
                                                            value={endmeridiem}
                                                            onChange={(e) => setEndMeridiem(e.target.value)}
                                                        >
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
                                                    <input id="dropzone-file" type="file" class="hidden" accept='image/*' onChange={handleCertificateImageUpload} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ApplyDoctor