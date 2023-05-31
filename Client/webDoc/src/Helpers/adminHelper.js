import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

//sign in
export function signInAdmin(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/admin/signin', credentials).then((user) => {
          
            resolve(user)
        }).catch((err) => {
       
            reject(err)
        })
    })
}

//all doctors
export async function listDoctors() {
    try {
        return await axios.get('/api/admin/allDoctors');
    } catch (error) {
   
        return error
    }
}

//doctor requests
export async function doctorRequests() {
    try {
        return await axios.get('/api/admin/doctor-requests');
    } catch (error) {
      
        return error
    }
}

//add doctor
export function addDoctor(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/admin/addDoctor', credentials).then((response) => {
            resolve(response);
        }).catch((err) => {
        
            reject(err)
        })

    })
}

//all departments
export async function getAllDepartments() {
    try {
        return await axios.get('/api/admin/departments')
    } catch (error) {
      
        return error;
    }
}

//add departments
export function createDepartments(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/admin/addDepartment', credentials).then((data) => {
            resolve(data);
        }).catch(err => {
            reject(err)
        })

    });
}

//get all patients
export function getAllPatients() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/patients').then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}

//delete a doctor
export const deleteDoctor = async (id) => {
    try {
        const deleteDoc = await axios.delete(`/api/admin/delete-doctor/${id}`);
        return deleteDoc;
    } catch (error) {
        return error;

    }

}

//block doctor
export const blockDoctor = async(id)=>{
    try {
        const blockDoc = await axios.put(`/api/admin/block-doctor/${id}`);
        return blockDoc;
        
    } catch (error) {
        return error;
        
    }
}

//unblock doctor
export const unblockDoctor = async(id)=>{
    try {
        const unblockDoctor = await axios.put(`/api/admin/unblock-doctor/${id}`);
        return unblockDoctor;
    } catch (error) {
        return error;     
    }
}

//get doctor
export const getDoctor = async(id)=>{
    try {
        const doctor = await axios.get(`/api/admin/doctor-profile/${id}`);
        return doctor;
        
    } catch (error) {
        return error;
        
    }
}

//delete department
export const deleteDepartment = async (id) => {
    try {
        const deleteDep = await axios.delete(`/api/admin/delete-department/${id}`);
        return deleteDep;
    } catch (error) {
        return error;

    }
}

//edit doctor
export function editDoctorProfile(id, credentials) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/admin/edit-doctor/${id}`, credentials).then((user) => {
           
            resolve(user)
        }).catch((err) => {
           
            reject(err)
        })
    })
}

//get all notifications
export function getAllNotifications() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/notifications').then((notifications) => {
            resolve(notifications)
        }).catch((err) => {
            reject(err);
        })

    })
}

//get all notification count
export function getAllNotificationCount() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/notificationCount').then((notificationCount) => {
            resolve(notificationCount)
        }).catch((err) => {
            reject(err)
        })
    })
}

//get doctor request 
export function getDoctorRequest(id) {
    return new Promise((resolve, reject) => {
        axios.get(`/api/admin/view-doctor-requests/${id}`).then((doctorData) => {
            resolve(doctorData)
        }).catch((err) => {
            reject(err)
        })
    })
}

//apporve doctor

export function approveDoctor(id) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/admin/approve-doctor/${id}`).then((doctor) => {
            resolve("doctor approved successfully")
        }).catch((err) => {
            reject("doctor approval failed")
        })
    })
}

//deny doctor

export function denyDoctor(id) {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/admin/deny-doctor/${id}`).then((data) => {
            resolve('doctor denied successfully')
        }).catch((err) => {
            reject("something wrong")
        })
    })
}

//get all datas

export function getAllData() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/admin/data-count`).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
};

//get chart data
export function getChartData() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/admin/sales-monthly`).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })

    })
}

//get weekly report
export function getWeeklyData() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/weeklySales').then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}


//get daily report
export function getDailyData() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/dailySales').then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

//get daily report
export function getYearlyData() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/yearlySales').then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err)
        })
    })
}

//transactions
export const getAllTransactions = async (page) => {
    try {
        const response = await axios.get(`/api/admin/salesReport?page=${page}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export async function getAdmin() {
    return new Promise((resolve, reject) => {
        axios.get('/api/admin/', { withCredentials: true }).then((user) => {
            resolve(user)
        }).catch((err) => {
            reject(err)
        })
    })
}