import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doctorProfile } from '../../Helpers/doctorHelper';
import Profile from '../../components/Doctors/Profile';
import SideBar from '../../components/Doctors/SideBar';

const DoctorsProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    doctorProfile(id)
      .then((doctor) => {
        setDoctor(doctor.data);
      })
      .catch((err) => {
        navigate('/doctor/signin'); // Redirect to the login page if the doctor is blocked
      });
  }, [id, navigate]);

  return (
    <>
      <div>
        <div className="flex overflow-hidden bg-white pt-16">
          <SideBar />
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
          <div id="main-content" className="h-full w-full relative overflow-y-auto lg:ml-64">
            <main>
              <div className="px-4">
                <h2 className="text-2xl">Profile</h2>
                <Profile doctor={doctor} id={id} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsProfile;
