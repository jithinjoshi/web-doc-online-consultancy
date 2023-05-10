import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import express from 'express'
const router = express.Router();


import admin from '../config/firebase.config.js';

import { User } from '../Model/user.js';
import Doctor from '../Model/Doctor.js';
import { Schedule } from '../Model/Schedules.js';
import { Appointment } from '../Model/Appointment.js';
import Stripe from 'stripe';
import nodemailer from 'nodemailer'
import { Department } from '../Model/Department.js';


import dotenv from 'dotenv'
dotenv.config()


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

let refreshTokens = []

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

}

const generateRefreshToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_RESFRESH_SECRET);

}

//refresh
export const refresh = async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).json({ err: "you are not authenticated" });
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ err: "refresh token is not valid" })
    }

    jwt.verify(refreshToken, process.env.JWT_RESFRESH_SECRET, async (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        const updateToken = await User.findByIdAndUpdate(user._id, { tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken } });

        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    })
}


//register
export const register = async (req, res) => {
    try {

        const { username, email, password, mobile } = req.body;


        const checkUsername = new Promise((resolve, reject) => {
            if (!username || username?.length < 4) {
                reject(new Error('invalid username'))

            } else {
                resolve();
            }
        });

        const checkEmail = new Promise((resolve, reject) => {
            User.findOne({ email }).then(user => {
                if (user) {
                    reject(new Error('emaill is already exist'))
                } else {
                    resolve();
                }

            })
        })

        const checkMobile = new Promise((resolve, reject) => {
            User.findOne({ mobile }).then(user => {
                if (user) {
                    reject(new Error('mobile is already exist'))
                } else {
                    resolve();
                }

            })
        })



        Promise.all([checkUsername, checkEmail, checkMobile]).then(() => {
            if (password) {
                bcrypt.hash(password, 10, function (err, hash) {
                    if (err) {
                        console.log("pass err", err);
                        return res.status(500).json({ err: err })
                    }
                    const newUser = new User({
                        username,
                        email,
                        password: hash,
                        mobile
                    })

                    newUser.save().then((user) => {
                        res.status(201).json({ success: "registration successfull" })
                    })

                })

            }
        }).catch((error) => {
            res.status(500).json({ err: error })
        })

    } catch (error) {
        res.status(500).send(error)

    }
}

//register with google

const newUserData = async (decodeValue, req, res) => {
    const newUser = new User({
        username: decodeValue.name,
        email: decodeValue.email,
    })

    try {
        const saveUser = await newUser.save();
        res.status(201).send({ user: saveUser })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })

    }
}

const updateUserData = async (decodeValue, req, res) => {
    const filter = { userId: decodeValue.email };
    const options = {
        upsert: true,
        new: true
    };
    try {
        const result = await User.findOneAndUpdate(
            filter,
            options
        );
        res.status(200).send({ user: result })
    } catch (error) {

    }
}


//google signup
export const googleRegister = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).send({ message: "invalid token" })
        }

        const token = req.headers.authorization.split(" ")[1];

        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (!decodeValue) {
                return res.status(500).json({ success: false, message: "unauthorized user" })
            }

            //check the user existence
            const userExist = await User.findOne({ email: decodeValue.email });
            if (!userExist) {
                newUserData(decodeValue, req, res)
            } else {
                updateUserData(decodeValue, req, res);

            }
        } catch (error) {
            return res.status(500).send({ success: false, msg: error })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

//google login
export const googleLogin = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(500).send({ message: "invalid token" })
        }

        const token = req.headers.authorization.split(" ")[1];

        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (!decodeValue) {
                return res.status(500).json({ success: false, message: "unauthorized user" })
            }

            //check the user existence
            const userExist = await User.findOne({ email: decodeValue.email });
            if (!userExist) {
                res.status(500).json({ err: "no user with this email address" })
            } else {
                res.status(200).json({ success: "successfully logged in" })

            }
        } catch (error) {
            return res.status(500).send({ success: false, msg: error })
        }

    } catch (error) {
        res.status(500).send(error)
    }
}


//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) {
            let isValidUser = await bcrypt.compare(password, user.password);
            if (isValidUser) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                const updateToken = await User.findByIdAndUpdate(user._id, { tokens: { accessToken: accessToken, refreshToken: refreshToken } });

                refreshTokens.push(refreshToken);


                res.status(201).send({ msg: "Login successfull", user, accessToken, refreshToken })
            } else {
                res.status(500).send("invalid credentials")
            }
        } else {
            res.status(404).send("user not found")
        }

    } catch (error) {
        res.status(500).send(error)

    }
}

//get user
export const getUser = async (req, res,) => {
    const userId = req.user.userId;
    try {

        let user = await User.findById(userId);

        if (user) {
            console.log(user, ":::");
            let { password, ...rest } = Object.assign({}, user.toJSON());
            res.status(201).send(rest);
        } else {
            res.status(500).send("can't find the user")
        }

    } catch (error) {
        res.status(500).send("not authorized")
    }

}

//get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        let doctors = await Doctor.find({}, '-password');
        res.status(200).send(doctors);

    } catch (error) {
        res.status(500).json({ err: "can't get all doctors" })

    }
}

//get single doctor
export const getSingleDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findOne({ _id: id }, '-password');
        res.status(200).send(doctor)

    } catch (error) {
        res.status(500).json({ err: "can't access doctor" })

    }
}

//get a doctor availability
export const getDoctorAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const schedules = await Schedule.find({ doctorId: id });
        if (schedules) {
            return res.status(200).send(schedules);
        } else {
            res.status(500).json({ err: "schedules not found" })
        }

    } catch (error) {
        res.status(500).json({ err: "can't get doctor availability" })

    }
}

//appointment user
export const appointment = async (req, res) => {
    try {
        const { userId, doctorId, doctorInfo, userInfo, date, time, status } = req.body;
        // date = moment(req.body.date,'DD-MM-YYYY').toISOString();
        // time = moment(req.body.time,'HH:mm').toISOString();
        // console.log(req.body.time,"::::");
        const newAppointment = new Appointment({
            userId,
            doctorId,
            doctorInfo,
            userInfo,
            date,
            time,
            status
        });
        newAppointment.save().then(() => {
            res.status(201).send({ success: "data added successfully" });
        }).catch((err) => {
            res.status(500).send({ err: "can't insert data into database" });
        })
    } catch (error) {
        res.status(500).json({ err: "can't book this time" })
    }
};

export const appointmentUpdate = async (req, res) => {
    try {
        const { id, status } = req.body;
        const updateData = await Appointment.findByIdAndUpdate(id, { status: status });
        if (updateData) {
            res.status(201).json({ success: "data updated" })
        }

    } catch (error) {
        res.status(500).json({ err: "updation failed" })

    }


}

//manage timings
// export const manageTimings = async (req,res)=>{
//     try {
//         const {doctorId,timings,date} = req.body;
//         const newTiming = new Timing({
//             doctorId,
//             timings,
//             date
//         });

//         newTiming.save().then((data)=>{
//             res.status(201).send(data)
//         }).catch((err)=>{
//             res.status(500).json({err:"something went wrong"});
//         })

//     } catch (error) {
//         res.status(500).json({err:"cant update data"})

//     }
// }

// //update timings
// export const updateTimings = async (req,res) =>{
//     try {
//         const {doctorId,date,timings} = req.body;

//         const updatedTime = await Timing.findOneAndUpdate({doctorId,date},{timings});

//         if(updatedTime){
//             res.status(200).send({...updatedTime, success:true})

//         }else{
//             res.status(200).json({success:false})
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({err:"something went wrong"})

//     }
// }

//check availability
export const checkAvailability = async (req, res) => {
    let { date, time, doctorId } = req.body;
    date = new Date(date);
    try {

        // const fromTime = moment(time,'HH:mm').subtract(60,'minutes').toISOString();
        // const toTime = moment(time,'HH:mm').add(60,'minutes').toISOString();
        const appointments = await Appointment.find({
            doctorId,
            time,
            date
        });


        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointment not available",
                success: false
            });
        } else {
            return res.status(200).send({
                message: "Appointment available",
                success: true
            })
        }
    } catch (error) {
        throw error;

    }
}

//payment
export const payment = async (req, res) => {
    try {
        const line_items = req.body;

        const usdToInrRate = 100; // Assuming 1 USD = 100 INR
        const usdAmount = line_items?.price
        const inrAmount = usdAmount * usdToInrRate;

        const customer = await stripe.customers.create({
            metadata: {
                userId: line_items.userId,
                appointments: JSON.stringify(line_items)

            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: line_items?.doctor,
                            images: [line_items?.doctorImage],
                            description: line_items?.name,
                            metadata: {
                                id: line_items?.doctorId
                            }
                        },
                        unit_amount: inrAmount
                    },
                    quantity: 1
                },
            ],
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,
        });
        res.send({ URL: session.url })

    } catch (error) {
        res.status(500).json(error)

    }
}

export const handleWebhook = async (req, res) => {
    let signature = req.headers['stripe-signature'];
    const endpointSecret = "whsec_98351d7eaef6f96ad8d4da5bd4f2bf4413d7bbf97dd7a1302aeeb794ea875e62";

    let data;
    let eventType;

    if (endpointSecret) {
        const payload = req.body;
        const payloadString = JSON.stringify(payload, null, 2);
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret: endpointSecret,
        });
        let event;
        try {
            event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);

        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers
            .retrieve(data.customer)
            .then((customer) => {
                console.log(data,"PPPP");
                const appointmentsData = JSON.parse(customer.metadata.appointments);

                const newAppointment = new Appointment({
                    userId: customer?.metadata?.userId,
                    doctorId: appointmentsData?.doctorId,
                    doctorName: appointmentsData?.doctor,
                    doctorImage: appointmentsData?.doctorImage,
                    department: appointmentsData?.doctorDepartment,
                    date: appointmentsData?.date,
                    time: appointmentsData?.time,
                    price: appointmentsData?.price,
                    payment_status: data?.payment_status,
                    paymentOwner:data?.customer_details?.name,
                    paymentOwnerEmail:data?.customer_details?.email

                })
                newAppointment.save().then(() => {
                    console.log("data added successfully");
                }).catch((err) => {
                    console.log(err);
                })

         })
            .catch((err) => console.log(err));
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();

}


//login with otp
export const loginWithOtp = async (req, res) => {
    const { mobile } = req.body;
    try {
        const users = await User.findOne({ mobile });
        if (users) {
            res.status(201).json(users);
        }


    } catch (error) {
        res.status(500).json(error)

    }
}

//forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(500).json({ err: "No user exists with this email" });
        }

        const secret = user.password + process.env.JWT_SECRET;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: "5m"
        });

        const link = `<a href="${process.env.CLIENT_URL}/reset-password/${user._id}/${token}">Click to reset passowrd</a>`;



        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Reset password", // Subject line
            html: link, // plain text body
        });

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));




    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Forgot password failed" });
    }
};


//reset password
export const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(500).json({ err: "Not verified" });
        }

        const secret = user.password + process.env.JWT_SECRET;
        jwt.verify(token, secret, async function (err, decoded) {
            if (err) {
                console.log(err);
                return res.status(500).json({ err: "Verification failed" });
            } else {
                const _id = user.id;
                const encryptedPassword = await bcrypt.hash(password, 10);
                try {
                    const updatedUser = await User.findOneAndUpdate({ _id }, { $set: { password: encryptedPassword } });
                    res.status(200).json({ success: "updated data" });

                } catch (error) {
                    res.status(500).json({ err: "cant update user" })

                }
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Reset password failed" });
    }
};

//get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const getAllDepartments = await Department.find({});
        res.status(200).json({ departments: getAllDepartments })

    } catch (error) {
        res.status(500).json({ err: "unable to get data" })

    }
}

//get token
export const getToken = async (req, res) => {
    try {
        const userId = req.user;
        res.status(200).json(userId)

    } catch (error) {
        res.status(500).json({ err: "can't get the access token" })

    }
}

//get user appointment
export const getMyAppointment = async(req,res) =>{
    try {
        const {id} = req.params;
        const myAppointments = await Appointment.find({userId:id});
        res.status(200).json(myAppointments);
        
    } catch (error) {
        res.status(500).json({err:"can't get the appointments"})
        
    }
}

//get my doctors
export const getMyDoctors = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Appointment.find({ userId }).select('-userId -payment_status -createdAt -updatedAt -paymentOwner -price -__v -paymentOwnerEmail')

        res.status(200).send(data)

    } catch (error) {
        res.send("can't get user data");

    }
}

//get profile
export const getUserProfile = async(req,res) =>{
    try {
        const userId = req.params.id;
        const user = await User.findOne({_id:userId}).select('-password -tokens')
        return res.status(201).json(user)
        
    } catch (error) {
        res.status(500).json("can't access user")
    }
}

//update profile

export const updateProfile = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        const userId = await User.findOneAndUpdate({_id:id});
        
    } catch (error) {
        res.status(500).json("can't update the data")
        
    }
}


//get single user
export const getSingleUser = async (req,res)=>{
    const {id} = req.params;
    const user = await User.findById({_id:id}).select('-password')
    res.status(201).json(user)
}



//signout user
export const signoutUser = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        console.log(refreshToken, "::::::::::::::::::::::::");
        const user = req.user;

        if (refreshToken) {
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const updateToken = await User.findOneAndUpdate(user._id, { tokens: { accessToken: "", refreshToken: "" } });
            res.status(200).json("you are logout successfully")

        } else {
            res.status(500).json("can't logout")
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);

    }
}