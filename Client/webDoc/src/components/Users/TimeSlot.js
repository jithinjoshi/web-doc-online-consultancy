import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Schedule from './Schedule';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/User/userSlice';
import { appointmentDoctor, checkAvailability } from '../../Helpers/userHelper';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { paymentData } from '../../Redux/User/Paymentslice';

import DatePicker from "react-horizontal-datepicker";




const TimeSlot = ({ doctor, id }) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useNavigate();

    const [time, setTime] = useState();
    const [lastClickedButton, setLastClickedButton] = useState(null);
    const [date, setDate] = useState();
    const [isAvailable, setIsAvailable] = useState(false);
    const [excludeDate, setExcludeDate] = useState([]);

    const doctorId = doctor?._id;
    const userId = user?._id;
    const doctorInfo = [
        {
            doctorName: doctor?.firstName + doctor?.lastName,
            department: doctor?.department,
            fees: doctor?.fees,
            image: doctor?.image?.secure_url,
            email: doctor?.email
        }
    ];
    const userInfo = [
        {
            userName: user?.username,
            email: user?.email,
        }
    ];

    let timings = doctor?.timings;




    if (time) {
        timings.filter((item) => item !== time);
    }



    const credentials = {
        doctorId, userId, doctorInfo, userInfo, date, time
    }

    const timeHandler = ((e, id) => {
        setLastClickedButton(id);
        setTime(e.target.value)
        setIsAvailable(false)


    })


    //select date

    // const onSelectedDay = (d) => {
    //     console.log(d,":::");
    //     const changedDate = moment(d).format('MM/DD/YYYY');
    //     setDate(changedDate);
    // }

    const selectedDay = (val) => {
        const changedDate = moment(val).format('MM/DD/YYYY');
        setDate(changedDate);
        setIsAvailable(false)
    };






    //check availability
    // const checkAvailabilityF = async () => {
    //     const credentials = {
    //         date,
    //         time,
    //         doctorId
    //     }

    //     if (!date || !time || !doctorId) {
    //         toast.error("please enter the details properly")
    //     } else {
    //         const availability = await checkAvailability(credentials);
    //         try {
    //             if (availability?.data?.success) {
    //                 setIsAvailable(true);
    //                 toast.success(availability?.data?.message)

    //             } else {
    //                 setIsAvailable(false)
    //                 toast.error(availability?.data?.message)
    //             }

    //         } catch (error) {
    //             console.log(error);

    //         }

    //     }


    // }

    useEffect(() => {
        const credentials = {
            date,
            doctorId
        }

        checkAvailability(credentials).then((response) => {
            setExcludeDate(response?.data);
            console.log(response?.data);


        }).catch((err) => {
            console.log("something error");
        })

    }, [date,doctor])

    //book handler
    const bookingHandler = () => {

        dispatch(paymentData(credentials))


        // appointmentDoctor(credentials).then((data) => {
        //     console.log("success");

        // }).catch((err) => {
        //     console.log(err);
        // })


        history(`/confirm-appointment/${id}`)

    }


    return (
        <>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center mx-auto p-6 w-2/6">
                <DatePicker
                    getSelectedDay={selectedDay}
                    labelFormat={"MMMM"}
                    color={"#374e8c"}
                    endDate={31}
                />
            </div>


            <div class="flex flex-wrap justify-center m-4">
            <div class="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
  {
    timings && timings.filter((time) => {
      const excludeTimes = excludeDate.map((date) => moment(date, ["h:mmA"]).format("HH:mm"));
      return !excludeTimes.includes(moment(time, ["h:mmA", "h:mm"]).format("HH:mm"));
    }).map((time, index) => {
      const changedTime = moment(time, ["h:mmA", "h:mm"]).format("hh A");
      return (
        <button
          key={index}
          class={`mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23] ${lastClickedButton === index ? 'text-white bg-green-700' : 'hover:border-green-700'}`}
          value={changedTime}
          onClick={(e) => timeHandler(e, index)}
        >
          {changedTime}
        </button>
      )
    })
  }
</div>
</div>


            <div class="flex justify-center mb-5">

                {
                    time  && date && 
                    <button onClick={bookingHandler} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-3">
                        Book Now
                    </button>
                }
            </div>


        </>
    )
}

export default TimeSlot