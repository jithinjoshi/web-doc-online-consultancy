import moment from 'moment';
import React, { useEffect, useState } from 'react';
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

  const doctorTimings = doctor?.doctorTimings || {};
  const day = moment(date, 'MM/DD/YYYY').format('dddd');
  const timings = doctorTimings[day]?.filter((item) => !excludeDate.includes(item)) || [];

  const credentials = {
    doctorId,
    userId,
    doctorInfo,
    userInfo,
    date,
    time
  };

  const timeHandler = (e, id) => {
    setLastClickedButton(id);
    setTime(e.target.value);
    setIsAvailable(false);
  };

  const selectedDay = (val) => {
    const changedDate = moment(val).format('MM/DD/YYYY');
    setDate(changedDate);
    setIsAvailable(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const availabilityResponse = await checkAvailability({ date, doctorId });
        const { bookedDates, bookedTimes } = availabilityResponse;
        setExcludeDate(bookedTimes);
        
      } catch (error) {
        return error;
      }
    };

    if (date && doctorId) {
      fetchData();
    }
  }, [date, doctorId]);

  // Book handler
  const bookingHandler = () => {
    dispatch(paymentData(credentials));
    history(`/confirm-appointment/${id}`);
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex justify-center mx-auto p-6 w-2/6">
        <DatePicker
          getSelectedDay={selectedDay}
          labelFormat={"MMMM"}
          color={"#374e8c"}
          endDate={50}
        />
      </div>

      <div className="flex flex-wrap justify-center m-4">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {timings.map((time, index) => {
            return (
              <button
                key={index}
                className={`mt-[14px] cursor-pointer truncate rounded-[4px] border border-[#E7EAEE] p-3 text-[#191D23] ${
                  lastClickedButton === index ? 'text-white bg-green-700' : 'hover:border-green-700'
                }`}
                value={time}
                onClick={(e) => timeHandler(e, index)}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mb-5">
        {time && date && (
          <button onClick={bookingHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-3">
            Book Now
          </button>
        )}
      </div>
    </>
  );
};

export default TimeSlot;
