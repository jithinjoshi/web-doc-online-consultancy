import axios from "axios";
axios.defaults.withCredentials = true

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;




//signup
export async function registerUser(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/register', credentials).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

//signup with google
export async function googleRegister(token) {

    try {
        const res = await axios.get('/api/user/register-with-google', {
            headers: {
                Authorization: "Bearer " + token,
            },
        })

        return res.data
    } catch (error) {
        return error
    }

}

//sign in with google
export async function googleLogin(token) {
    try {
        const res = await axios.get('/api/user/login-with-google', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data
    } catch (err) {
      
        return err;

    }
}


//login
export async function loginUser(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/login', credentials).then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}




//user
export async function getUser() {
    return new Promise((resolve, reject) => {
        axios.get('/api/user/user', { withCredentials: true }).then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}


//get all doctors
export const getAllDoctors = async () => {
    try {
        const doctors = await axios.get('/api/user/doctors');
        return doctors.data

    } catch (error) {
        return error;
    }
}

//get all departments 
export const getAllDepartments = async () => {
    try {
        const departments = await axios.get('/api/user/get-all-departments');
        return departments?.data?.departments;
    } catch (error) {
        return error

    }
}

//get single doctor
export const getSingleDoctor = async (id) => {
    try {
        const doctor = await axios.get(`/api/user/doctor/${id}`)
        return doctor

    } catch (error) {
        return error;

    }
}


//available doctor schedules

export const getAllSchedules = async (id) => {
    try {
        const schedules = await axios.get(`/api/user/availableSlots/${id}`);
        if (schedules) {
            return schedules;
        } else {
            return "can't get the data"
        }

    } catch (error) {
        return error;

    }
}

//create timings
// export const timingsF = async (credentials)=>{
//     try {
//         const createTime = await axios.post('/api/user/doctor/timings',credentials);
//         if(createTime){
//             return createTime;
//         }else{
//             return 'something went wrong'
//         }

//     } catch (error) {
//         return error;
//     }
// }

// //update
// export const updateTime = async(credentials)=>{
//     try {
//         const updateTime = await axios.put('/api/user/doctor/updateTimings',credentials);
//         if(updateTime){
//             return updateTime

//         }else{
//             return false
//         }
//     } catch (error) {
//         throw error

//     }
// }

//check availability
export const checkAvailability = async (credentials) => {
    try {
      const response = await axios.post('/api/user/doctor/checkAvailability', credentials);
      const { bookedDates, bookedTimes } = response.data;
      return { bookedDates, bookedTimes };
    } catch (error) {
      throw error;
    }
  };
//appointment
export const appointmentDoctor = (async credentials => {
    try {
        const appointment = await axios.post('/api/user/doctor/appointment', credentials);
        if (appointment) {
            return appointment;
        } else {
            return "something went wrong"
        }
    } catch (error) {
        return error
    }

});

//payment
export const paymentGate = (async credentials => {
    try {
        const payment = await axios.post('/api/user/payment', credentials);
        if (payment) {
            return payment;
        }
    } catch (error) {
        return error;
    }
});

//appointment update
// export const appointmentUpdate = (async credentials =>{
//     try {
//         const updateAppointment = await axios.put('/api/user/update-appointment',credentials);
//         if(updateAppointment){
//             return updateAppointment;
//         }

//     } catch (error) {
//         return error;

//     }
// })

export const loginWithOtp = async (credentials) => {
    try {
        const users = await axios.post('/api/user/login-with-otp', credentials);
        if (users) {
            return users
        }
    } catch (error) {
        return error;

    }
}

export const forgotPassword = async (credentials) => {
    try {
        const resetLink = await axios.post('/api/user/forgot-password', credentials);

        if (resetLink) {
            return resetLink;
        } else {
            return "can't find data"
        }

    } catch (error) {
        return error;

    }
}

//update password
export const updatePassword = async (id, token, credentials) => {
    try {
        const user = await axios.post(`/api/user/reset-password/${id}/${token}`, credentials);
        return user;

    } catch (error) {
        return error;

    }
}

//user appointments
export const singleUserAppointments = async (id, status,page) => {
    try {
       
        const appointments = await axios.get(`/api/user/my-appointments/${status}/${id}?page=${page}`);
        return appointments;
    } catch (error) {
        return error;
    }
}

//get all appointed doctors
export const getAllAppointmentDoctors = async (id) => {
    try {
        const doctors = await axios.get(`/api/user/my-doctors/${id}`);
        return doctors;
    } catch (error) {
        return error

    }
}

//add message to db
export function addMessage(credentials) {
    return new Promise((resolve, reject) => {
        axios.post("/api/message/addmsg", credentials).then((data) => {
        
        }).catch((err) => {
            return err;
        })
    })
}

//get all messages
export function getAllMessages(credentials) {
    return new Promise((resolve, reject) => {
        axios.post("/api/message/getmsg", credentials).then((data) => {
            resolve(data);
          
        }).catch((err) => {
            reject(err)
            return err;
        })
    })
}


//get user profile
export function getUserData(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/user/get-profile/${id}`).then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err);
        })
    })
}

export function getAllConversations(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/conversation/${id}`).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err);
        })
    })
};

export function getMessages(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/message/${id}`).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

export function newMessages(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/message', credentials).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

//apply doctor
export function applyDoctor(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/apply-doctor', credentials).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err)
        })

    })
}

//user profile
export function profileOfUser(credentials){
    return new Promise((resolve,reject)=>{
        axios.put('/api/user/profile',credentials).then((response)=>{
            resolve(response)
        }).catch((err)=>{
            reject(err)
        })
    })
}



//signout user
export const signoutUser = async () => {
    try {
        const signout = await axios.post('/api/user/signout');

    } catch (error) {
        return error;

    }
}


//get appointed doctors
export const getAppointedDoctors = (async()=>{
    try {
        const appointedDoctors = await axios.get('/api/user/appointedDoctors');
        return appointedDoctors; 
    } catch (error) {
        return error;
        
    }
})

//get all prescriptions
export const getDoctorPrescription = (async(doctorId)=>{
    try {
        const prescripions = await axios.get(`/api/user/prescriptions/${doctorId}`);
        return prescripions;
    } catch (error) {
        return error
        
    }
})
