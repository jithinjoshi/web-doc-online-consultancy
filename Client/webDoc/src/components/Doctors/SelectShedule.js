import React, { useState } from 'react';
import { generateDoctorTimings } from '../../Helpers/doctorHelper';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialTimings = [
  { day: 'Sunday', startTime: '', endTime: '' },
  { day: 'Monday', startTime: '', endTime: '' },
  { day: 'Tuesday', startTime: '', endTime: '' },
  { day: 'Wednesday', startTime: '', endTime: '' },
  { day: 'Thursday', startTime: '', endTime: '' },
  { day: 'Friday', startTime: '', endTime: '' },
  { day: 'Saturday', startTime: '', endTime: '' },
];

const SelectSchedule = () => {
    const navigate = useNavigate();
  const [timings, setTimings] = useState(initialTimings);
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [interval, setInterval] = useState(30);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleStartTimeChange = (e, day) => {
    const updatedTimings = timings.map((timing) =>
      timing.day === day ? { ...timing, startTime: e.target.value } : timing
    );
    setTimings(updatedTimings);
    const selectedTimingIndex = updatedTimings.findIndex((timing) => timing.day === selectedTiming?.day);
    if (selectedTimingIndex !== -1) {
      setSelectedTiming(updatedTimings[selectedTimingIndex]);
    }
    validateTimings(updatedTimings);
  };

  const handleEndTimeChange = (e, day) => {
    const updatedTimings = timings.map((timing) =>
      timing.day === day ? { ...timing, endTime: e.target.value } : timing
    );
    setTimings(updatedTimings);
    const selectedTimingIndex = updatedTimings.findIndex((timing) => timing.day === selectedTiming?.day);
    if (selectedTimingIndex !== -1) {
      setSelectedTiming(updatedTimings[selectedTimingIndex]);
    }
    validateTimings(updatedTimings);
  };

  const handleDayClick = (day) => {
    const selectedTiming = timings.find((timing) => timing.day === day);
    setSelectedTiming(selectedTiming);
    setValidationErrors([]);
  };

  const handleIntervalChange = (e) => {
    setInterval(parseInt(e.target.value));
  };

  const validateTimings = (updatedTimings) => {
    const errors = [];
    updatedTimings.forEach((timing) => {
      if (!timing.startTime || !timing.endTime) {
        errors.push(timing.day);
      }
    });
    setValidationErrors(errors);
  };

  const handleGenerateOutput = async () => {
    const filteredTimings = timings.filter((timing) => timing.startTime && timing.endTime);
    const output = {
      timings: filteredTimings.length > 0 ? filteredTimings : [{ day: 'Not available', startTime: '', endTime: '' }],
      interval,
    };
    const timingData = await generateDoctorTimings(output);
    setTimeout(()=>{
            toast.success('timeslot updated')
        },1000)
        navigate('/doctor/')
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h1 className="text-2xl font-bold mb-4">Select Start Time and End Time</h1>
      <div className="flex space-x-4 mb-8">
        <div>
          <label htmlFor="start-time" className="text-sm font-medium">
            Start Time:
          </label>
          <select
            id="start-time"
            className="block w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedTiming ? selectedTiming.startTime : ''}
            onChange={(e) => handleStartTimeChange(e, selectedTiming?.day)}
          >
            <option value="">Select</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
            <option value="08:00 PM">08:00 PM</option>
            {/* Add more options as needed */}
          </select>
          {validationErrors.includes(selectedTiming?.day) && !selectedTiming.startTime && (
            <p className="text-red-500 text-xs mt-1">Please select a start time.</p>
          )}
        </div>
        <div>
          <label htmlFor="end-time" className="text-sm font-medium">
            End Time:
          </label>
          <select
            id="end-time"
            className="block w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedTiming ? selectedTiming.endTime : ''}
            onChange={(e) => handleEndTimeChange(e, selectedTiming?.day)}
          >
            <option value="">Select</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="01:00 PM">01:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
            <option value="05:00 PM">08:00 PM</option>
            <option value="05:00 PM">09:00 PM</option>
            <option value="08:00 PM">10:00 PM</option>
            <option value="05:00 PM">11:00 PM</option>
          </select>
          {validationErrors.includes(selectedTiming?.day) && !selectedTiming.endTime && (
            <p className="text-red-500 text-xs mt-1">Please select an end time.</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="interval" className="text-sm font-medium">
          Interval (minutes):
        </label>
        <select
          id="interval"
          className="block w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={interval}
          onChange={handleIntervalChange}
        >
          <option value="15">15Min</option>
          <option value="30">30Min</option>
          <option value="60">1 Hour</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="grid grid-cols-7 gap-4 mb-8">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`p-2 rounded-md border ${
              selectedTiming?.day === day ? 'border-blue-500' : 'border-gray-300'
            } ${validationErrors.includes(day) ? 'bg-red-200' : 'bg-gray-100'}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        onClick={handleGenerateOutput}
      >
        Update time schedule
      </button>
    </div>
  );
};

export default SelectSchedule;
