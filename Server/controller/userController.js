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
import moment from 'moment'


import dotenv from 'dotenv'
import cloudinary from '../utils/cloudinary.js';
import { Admin } from '../Model/admin.js';
import { createSecretToken } from '../utils/secretToken.js';
import { Prescription } from '../Model/Prescription.js';
dotenv.config()


const stripe = Stripe(process.env.STRIPE_SECRET_KEY);



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
                       
                        return res.status(500).json({ err: err })
                    }
                    const newUser = new User({
                        username,
                        email,
                        password: hash,
                        mobile
                    })

                    newUser.save().then((user) => {
                        const token = createSecretToken(user._id);
                        res.cookie("token", token, {
                            withCredentials: true,
                            httpOnly: false,
                        });
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
        const user = await User.findOne({ email });

        if (user) {
            const isValidUser = await bcrypt.compare(password, user.password);
            if (isValidUser) {
                const token = createSecretToken(user._id);
                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false,
                });


                res.status(201).send({ msg: "Login successfull", user })
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
    const userId = req.user;
    
    try {

        const user = await User.findById(userId);

        if (user) {
            const { password, ...rest } = Object.assign({}, user.toJSON());
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


        const doctors = await Doctor.find({ status: "approved" }, '-password');
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

export const checkAvailability = async (req, res) => {
    try {
      const { date, doctorId } = req.body;
  
      let momentObj;
  
      if (date && doctorId) {
        momentObj = moment(date, 'MM/DD/YYYY');
        if (!momentObj.isValid()) {
          console.error(`Invalid date format: ${date}`);
          res.status(400).json({ error: 'Invalid date format' });
          return;
        }
  
        const appointments = await Appointment.find({ doctorId, date });
  
        if (appointments && Array.isArray(appointments)) {
          const bookedTimes = appointments.map(appointment => appointment.time);
          const bookedDates = appointments.map(appointment => appointment.date);
          res.status(200).json({ bookedDates, bookedTimes });
        } else {
          res.status(200).json({ bookedDates: [], bookedTimes: [] });
        }
      } else {
        res.status(400).json({ error: 'Invalid request parameters' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

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
    const signature = req.headers['stripe-signature'];
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
                    paymentOwner: data?.customer_details?.name,
                    paymentOwnerEmail: data?.customer_details?.email

                })
                newAppointment.save();

            })
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



        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Reset password", // Subject line
            html: link, // plain text body
        });

       




    } catch (error) {
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
export const getMyAppointment = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const { id, status } = req.params;
        const currentDate = new Date();

        function getCurrentTime() {
            const now = new Date();
            return now.getHours() + ':' + now.getMinutes();
        }

        let myAppointments;

        const options = {
            page,
            limit,
            sort: { createdAt: -1 },
        };

        if (status === 'completed') {
            myAppointments = await Appointment.paginate(
                {
                    userId: id,
                    $or: [
                        { date: { $lt: currentDate } },
                        { date: currentDate, time: { $lt: getCurrentTime() } },
                    ],
                },
                options
            );
        } else {
            myAppointments = await Appointment.paginate(
                {
                    userId: id,
                    $or: [
                        { date: { $gte: currentDate } },
                        { date: currentDate, time: { $gte: getCurrentTime() } },
                    ],
                },
                options
            );
        }

        res.status(200).json(myAppointments);

    } catch (error) {
        
        res.status(500).json({ err: "Failed to retrieve appointments" });
    }
};



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
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId }).select('-password -tokens')
        return res.status(201).json(user)

    } catch (error) {
        res.status(500).json("can't access user")
    }
}

//update profile

export const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userId = await User.findOneAndUpdate({ _id: id });

    } catch (error) {
        res.status(500).json("can't update the data")

    }
}

//apply for doctor
export const applyForDoctor = async (req, res) => {

    try {
        const { fullName, email, firstName, lastName, address, mobile, dob, about, image, department, experience, fees, startTime, endTime, certificate } = req.body;

        if (image && certificate) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });

            const certificateUploadRes = await cloudinary.uploader.upload(certificate, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });

            if (uploadRes && certificateUploadRes) {
                const addDoc = new Doctor({
                    fullName,
                    email,
                    firstName,
                    lastName,
                    address,
                    mobile,
                    dob,
                    about,
                    department,
                    experience,
                    fees,
                    startTime,
                    endTime,
                    image: uploadRes,
                    certificate: certificateUploadRes
                });

                addDoc.save().then(async () => {
                    const adminId = await Admin.find({}).select('_id');
                    const doctor = await Doctor.find({ email }).select('-password');
                    const unSeenNotification = {
                        doctorId: doctor[0]._id,
                        message: `${doctor[0].fullName} was applied for doctor account`,
                        data: doctor[0]
                    }

                    const applyDoctor = await Admin.updateOne(
                        { _id: adminId },
                        { $push: { unSeenNotification: unSeenNotification } }
                    );


                    res.status(200).json({ success: true })
                })
                    .catch((err) => {

                        res.status(400).json({ error: new Error("some of the creditials are already exist") })
                    }
                    );

            }


        }

    } catch (error) {
       
        return res.status(500).json({ success: false })

    }

}


//get single user
export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id }).select('-password')
    res.status(201).json(user)
}


//profile
export const profile = async (req, res) => {
    try {
      const userId = req.user;
      const updatedData = req.body;
  
                                          
  
      if (userId) {
        const updateUser = await User.findByIdAndUpdate(userId, updatedData);
        res.status(200).json(updateUser);
      }
    } catch (error) {

      res.status(500).json({ err: "Update user failed" });
    }
  };
  


export const getAppointedDoctors = (async(req,res)=>{
    try {
        const userId = req.user;
        const doctorIds = await Appointment.distinct('doctorId', { userId: userId });
        if(doctorIds){
            const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')
            return res.status(201).json(doctors)
        }
        res.status(201).json({doctors:[]})
        
        
    } catch (error) {
        res.status(500).json({err:"can't find the data"})
        
    }
})


export const getPrescriptions = (async(req,res)=>{
    try {
        const {doctorId} = req.params;
        const userId = req.user;

        const prescripions = await Prescription.find({doctorId,userId}).populate({
            path: 'doctorId',
            select: ['firstName','lastName','image.secure_url']

        })
        res.status(200).json(prescripions);
    } catch (error) {
        return res.status(500).json({err:"unable to get the data"})
        
    }
});