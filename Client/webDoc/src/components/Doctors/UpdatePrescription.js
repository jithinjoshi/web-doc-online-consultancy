import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { getSinglePrescription, updatePrescription } from '../../Helpers/doctorHelper';

const UpdatePrescription = ({ prescriptionId }) => {
    const navigate = useNavigate();
    const [prescription, setPrescription] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        getSinglePrescription(prescriptionId).then((prescription) => {
            setPrescription(prescription?.data?.prescription);
            setTitle(prescription?.data?.prescription?.title);
            setDescription(prescription?.data?.prescription?.description);

        })
    }, [])

    const submitHandler = async (e) => {
        if (title.trim().length < 3) {
            toast.error('invalid title')
        } else if (description.trim().length < 20) {
            toast.error('description atleast need 20 characters')
        } else {
            e.preventDefault();
            const credentials = {
                title,
                description
            }
            try {
                const update = await updatePrescription(prescriptionId,credentials);
                setTimeout(()=>{
                    toast.success('prescription updated successfully');
                },1000)
                navigate(`/doctor/prescriptionList/${prescription?.userId?._id}`)
                
                
            } catch (error) {
                return error;
                
            }
            




        }

        



    }


    return (
        <>
            {
                prescription ?
                    <>
                        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Edit Prescription</div>
                        <Toaster position='top-center' reverseOrder={false}></Toaster>
                        <form onSubmit={submitHandler}>
                            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                                <div className="input-row flex mb-4">
                                    <input className="input bg-gray-100 border border-gray-300 p-2 outline-none flex-grow mr-2" spellCheck="false" placeholder="Name" value={prescription?.userId?.username} type="text" disabled />
                                    <input className="input bg-gray-100 border border-gray-300 p-2 outline-none flex-grow ml-2" spellCheck="false" placeholder="Email" value={prescription?.userId?.email} type="email" disabled />
                                </div>
                                <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" value={title} onChange={((e)=>setTitle(e.target.value))}/>
                                <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about the disease here" onChange={((e)=>setDescription(e.target.value))} value={description}></textarea>
                                <div className="buttons flex mt-2">
                                    <button type='submit' className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 bg-indigo-500">Update Prescription</button>
                                </div>
                            </div>
                        </form>
                    </>

                    :

                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>

            }

        </>
    );
};

export default UpdatePrescription;
