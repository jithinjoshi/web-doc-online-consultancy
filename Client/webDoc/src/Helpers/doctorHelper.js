import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;


//signin
export function signinDoctor(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/doctor/signin', credentials).then((user) => {
            resolve(user);
        }).catch((err) => {
            reject(err)
        })
    })
}

//profile

export function doctorProfile(id) {

    return new Promise((resolve, reject) => {
        axios.get(`/api/doctor/profile/${id}`).then((user) => {
            if (user?.data?.isActive === false) {
                reject('Doctor is blocked');
            } else {
                resolve(user);
            }
        }).catch((err) => {

            reject(err)
        })
    })
}

//edit profile
export function editDoctorProfile(id, credentials) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/doctor/edit/${id}`, credentials).then((user) => {

            if (user?.data?.status === 'Doctor is blocked') {
                reject(new Error('Doctor is blocked'));
            } else {
                resolve(user);
            }
        }).catch((err) => {

            reject(err)
        })
    })
}

//schedule
export function scheduleTime(id, credentials) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/doctor/schedule/${id}`, credentials).then((user) => {

            resolve(user)
        }).catch((err) => {

            reject(err)
        })
    })
}

//scheduled times
export function scheduledTimes(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/doctor/scheduledTime/${id}`).then((user) => {

            resolve(user)
        }).catch((err) => {

            reject(err)
        })
    })
}

//chat users
export function chatUser(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/doctor/getMyPatients/${id}`).then((users) => {
            resolve(users)
        }).catch((err) => {
            reject(err)
        })
    })
}

//chat 
export function addMessage(credentials) {
    return new Promise((resolve, reject) => {
        axios.post("/api/message/addmsg", credentials).then((data) => {

        }).catch((err) => {
            return err;
        })
    })
}

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

export function getMyAppointments(page) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/doctor/appointments?page=${page}`, null, { withCredentials: true })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

//sales report
export async function salesReport(page) {
    try {
        const response = await axios.get(`/api/doctor/salesReport?page=${page}`, null, { withCredentials: true });
        return response.data;

    } catch (error) {
        throw error;

    }
}


export function getTotalPayments(id) {

    return new Promise((resolve, reject) => {
        axios.get(`/api/doctor/getFullProfit/${id}`).then((result) => {
            resolve(result);
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

//get single user
export function getsingleUser(id) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/doctor/getSingleDoctor/${id}`).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}


//apply doctor
export function applyDoctor(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/doctor/apply-doctor', credentials).then((response) => {
            resolve(response);
        }).catch((err) => {

            reject(err)
        })

    })
}

//get all departments 
export const getAllDepartments = async () => {
    try {
        const departments = await axios.get('/api/doctor/get-all-departments');
        return departments?.data?.departments;
    } catch (error) {
        return error

    }
}

//signup 
export const signupDoctor = async (id) => {

    try {
        const emailData = await axios.get(`/api/doctor/signup-doctor/${id}`);
        return emailData;
    } catch (error) {
        return error

    }
}

//password update
export const addPassword = async (id, credentials) => {

    return new Promise((resolve, reject) => {
        axios.post(`/api/doctor/addPassword/${id}`, credentials).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

//leave
export const leave = async (id, credentials) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/doctor/leave/${id}`, credentials).then((data) => {

        }).catch((err) => {
            return err;
        })
    })
}

//get all patients
export const getPatients = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/doctor/getMyPatients`, null, { withCredentials: true }).then((data) => {
            resolve(data)

        }).catch((err) => {
            reject(err);
        })
    })
}

//get monthly report
export const getMonthlyReport = async (id) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/doctor/monthly-report').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

//get weekly report
export const weeklyReport = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/doctor/weekly-report').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

//get daily report 
export const dailyReport = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/doctor/daily-report').then((doctor) => {
            resolve(doctor);
        }).catch((err) => {
            reject(err)
        })
    })
}

//get yearly report
export const yearlyReport = async () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/doctor/yearly-report').then((doctor) => {
            resolve(doctor)
        }).catch((err) => {
            reject(err)
        })
    })
}

//doctor details
export async function getDoctor() {
    try {
        const response = await axios.post('/api/doctor/', null, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



//get single appointment
export async function getSingleAppointment(userId) {
    try {
        const appointment = await axios.get(`/api/doctor/singleAppointment/${userId}`);
        return appointment;

    } catch (error) {
        return error;

    }

}

//prescriptions
export async function prescriptions(userId) {
    try {
        const prescription = await axios.get(`/api/doctor/prescriptions/${userId}`);
        return prescription;

    } catch (error) {
        throw error;

    }
}

//add prescriptions 
export async function addPrescription(credentials) {
    try {
        const data = await axios.post('/api/doctor/addprescription', credentials);
        return data;
    } catch (error) {
        return error;

    }
}

//remove prescription
export async function deletePrescription(id) {
    try {
        const deleteReport = await axios.delete(`/api/doctor/deletePrescription/${id}`);
        return deleteReport;
    } catch (error) {
        return error;

    }
}

//update prescription
export async function updatePrescription(id, credentials) {
    try {
        const update = await axios.put(`/api/doctor/editPrescription/${id}`, credentials);
        return update;

    } catch (error) {
        return error;

    }
}

//get single prescription
export async function getSinglePrescription(id) {
    try {
        const prescription = await axios.get(`/api/doctor/singlePrescription/${id}`);
        return prescription

    } catch (error) {
        return error;

    }
}

//get single doctor
export async function getSingleUserData(id) {
    try {
        const user = await axios.get(`/api/doctor/getSingleUser/${id}`);
        return user;

    } catch (error) {
        return error

    }
}

export async function createConversation(credentials) {
    try {
        const conversation = await axios.post('/api/conversation', credentials);
        return conversation;

    } catch (error) {
        return error;

    }
}

export async function checkConversationExistance(credentials) {
    try {
        const existance = await axios.post('/api/conversation/check-existance', credentials);
        return existance;

    } catch (error) {
        return error

    }
}

export async function generateDoctorTimings(credentials) {
    try {
        const result = await axios.put('/api/doctor/update-timeslots', credentials);
        return result;

    } catch (error) {
        return error;

    }
}