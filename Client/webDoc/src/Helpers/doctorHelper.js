import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;





//signin
export function signinDoctor(credentials){
    return new Promise((resolve,reject)=>{
        axios.post('/api/doctor/signin',credentials).then((user)=>{
            console.log("doctor added successfully");
            resolve(user);
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//profile

export function doctorProfile(id){
    
    return new Promise((resolve,reject)=>{
        axios.get(`/api/doctor/profile/${id}`).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//edit profile
export function editDoctorProfile(id,credentials){
    return new Promise((resolve,reject)=>{
        axios.put(`/api/doctor/edit/${id}`,credentials).then((user)=>{
            console.log(user);
            resolve(user)
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//schedule
export function scheduleTime(id,credentials){
    return new Promise((resolve,reject)=>{
        axios.post(`/api/doctor/schedule/${id}`,credentials).then((user)=>{
            console.log(user);
            resolve(user)
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//scheduled times
export  function scheduledTimes(id){
    return new Promise((resolve,reject) =>{
        axios.get(`/api/doctor/scheduledTime/${id}`).then((user)=>{
            console.log(user);
            resolve(user)
        }).catch((err)=>{
            console.log(err);
            reject(err)
        })
    })
}

//chat users
export function chatUser(id){
    return new Promise((resolve,reject)=>{
        axios.get(`/api/doctor/getMyPatients/${id}`).then((users)=>{
            resolve(users)
        }).catch((err)=>{
            reject(err)
        })
    })
}

//chat 
export function addMessage(credentials){
    return new Promise((resolve,reject)=>{
        axios.post("/api/message/addmsg",credentials).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })
}

export function getAllMessages(credentials){
    return new Promise((resolve,reject)=>{
        axios.post("/api/message/getmsg",credentials).then((data)=>{
            resolve(data);
            console.log(data);
        }).catch((err)=>{
            reject(err)
            console.log(err);
        })
    })
}

export function getMyAppointments(id){
    return new Promise((resolve,reject)=>{
        axios.get(`/api/doctor/appointments/${id}`).then((data)=>{
            resolve(data);
        }).catch((err)=>{
            reject(err)
        })
    })
}
