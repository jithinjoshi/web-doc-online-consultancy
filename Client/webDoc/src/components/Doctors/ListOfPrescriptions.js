import React, { useEffect, useState } from 'react';
import { deletePrescription, getsingleUser, prescriptions } from '../../Helpers/doctorHelper';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const ListOfPrescriptions = () => {
  const { userId } = useParams();
  const [prescription, setPrescription] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const prescriptionData = await prescriptions(userId);
        setPrescription(prescriptionData?.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getsingleUser(userId);
        setUser(userData?.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const deleteHandler = async (id) => {
    try {
      await deletePrescription(id);
      toast.success('Delete data successfully');
      // Remove the deleted prescription from the state
      setPrescription((prevPrescriptions) =>
        prevPrescriptions.filter((prescription) => prescription._id !== id)
      );
    } catch (error) {
      console.error('Error deleting prescription:', error);
      toast.error('Failed to delete data');
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex flex-col col-span-3">
          <div className="flex flex-col space-y-4 p-6 text-gray-600">
            <div className="flex flex-row text-sm">
              <span className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="20px" viewBox="0 0 24 24" fill="#64748b">
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z" />
                  </g>
                </svg>
              </span>
              <p className="flex items-center text-gray-500">
                <span className="font-semibold mr-2 text-xs uppercase">Name:</span>
                <span>{user?.username}</span>
              </p>
            </div>

            <div className="flex flex-row items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <span className="mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 1H6C4.89 1 4 1.89 4 3v18c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V3c0-1.11-.89-2-2-2zm0 18H6V5h12v14zm-6-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm2-3H8v-1h6v1zm2-2H8V9h6v5z" />
                  </svg>
                </span>
                <p className="flex items-center text-gray-500">
                  <span className="font-semibold mr-2 text-xs uppercase">Mobile:</span>
                  <span>+{user?.mobile}</span>
                </p>
              </div>
              <Link
                to={`/doctor/prescription/${user?._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Prescription
              </Link>
            </div>
          </div>
        </div>
      </div>

      {prescription.length > 0 ? (
        <div className="flex flex-wrap ml-8 gap-5">
          {prescription?.map((prescription, index) => (
            <div key={index} className="flex flex-col border rounded-lg overflow-hidden bg-white my-12 max-w-lg">
              <div className="grid grid-cols-1">
                <div className="flex flex-col">
                  <div className="flex flex-col space-y-4  p-6 text-gray-600">
                    <h2>{prescription?.title}</h2>
                    <div className="flex flex-row text-sm">
                      <p className="flex items-center text-gray-500">{prescription?.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full relative bottom-0">
                    <div className="grid grid-cols-3 border-t divide-x text-gray-500 bg-gray-50 dark:bg-transparent py-3">
                      <Link to={`/doctor/updatePrescription/${prescription?._id}`} className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold">
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 0 24 24"
                            width="20px"
                            fill="#64748b"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                            />
                          </svg>
                        </div>
                        Update
                      </Link>
                      <button
                        onClick={() => deleteHandler(prescription?._id)}
                        className="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold"
                      >
                        <div className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20px"
                            viewBox="0 0 24 24"
                            width="20px"
                            fill="#64748b"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                          </svg>
                        </div>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="py-4 overflow-hidden">
          <div className="container px-4 mx-auto">
            <img
              className="mx-auto w-28"
              src="https://thumbs.dreamstime.com/b/no-stop-prescription-rx-recipe-icon-medicine-drugs-pills-sign-prohibited-ban-stop-symbol-no-prescription-drugs-icon-vector-148088334.jpg"
              alt=""
            />
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-heading mb-3 text-2xl font-semibold">No Prescriptions are added</h2>
              <p className="mb-7 text-neutral-500">Please add prescription</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ListOfPrescriptions;
