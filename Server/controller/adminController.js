import bcrypt, { hash } from 'bcrypt';
import { Admin } from '../Model/admin.js';
import jwt from 'jsonwebtoken'
import cloudinary from '../utils/cloudinary.js';
import Doctor from '../Model/Doctor.js';
import { Department } from '../Model/Department.js';
import { User } from '../Model/user.js';
import nodemailer from 'nodemailer'
import { Appointment } from '../Model/Appointment.js'
import { createSecretTokenForAdmin } from '../utils/secretToken.js';




//admin signup
export const signup = (async (req, res) => {
    try {
        const { email, password } = req.body;


        if (email && hash) {
            const hash = await bcrypt.hash(password, 10);
            const adminSignIn = new Admin({
                email: email,
                password: hash
            });
            adminSignIn.save().then(() => {
                res.status(201).send({ success: "admin registered successfully" });
            }).catch((err) => {
                res.status(404).send({ err: "admin registration failure" })
            })

        } else {
            return res.status(500).send({ err: 'invalid credentials' })
        }


    } catch (error) {
        res.status(500).send({ err: error })

    }
})


//admin signin
export const signin = (async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin) {
            const compare = await bcrypt.compare(password, admin.password);
    
            if (compare) {
                const token = createSecretTokenForAdmin(admin._id);
                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false,
                });
                
                res.status(201).send({ msg: "Login successfull", username: admin.email})
            } else {
                
                res.status(500).send({ err: 'invalid credentials' });
            }
        }else{
            res.status(500).json({err:"wrong credentials"})
        }
    } catch (error) {
        
        return res.status(500).send({ err: error })
    }
});


//create doctors
export const addDoctor = (async (req, res) => {
    try {
        const { firstName, lastName, mobile, dob, email, department, address, password, image } = req.body;

        const hash = await bcrypt.hash(password, 10);

        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });

            if (uploadRes) {
                const addNewDoctor = new Doctor({
                    firstName,
                    lastName,
                    mobile,
                    dob,
                    email,
                    department,
                    address,
                    password: hash,
                    image: uploadRes
                });

                addNewDoctor.save().then(() => {
                   
                    res.status(200).send({ success: "doctor added successfully" });
                }).catch((err) => {
                    res.status(500).send({ err: "something went wrong" })
                })

            }
        }
    } catch (error) {
        return res.status(500).json({ err: "Adding doctor failed" })
    }
})


//get all doctors
export const getAllDoctors = (async (req, res) => {
    try {
        const allDoctors = await Doctor.find({ deleted: false, status: 'approved' });
        res.status(200).json({ data: allDoctors })
    } catch (error) {
        return res.status(500).json({ err: "cant find doctors" })
    }
});


//create department
export const createDepartment = async (req, res) => {
    try {
        const { department } = req.body;
        const lowercaseDepartment = department.trim().toLowerCase();
        const checkDepartment = await Department.findOne({ lowercaseDepartment });

        if (!checkDepartment) {
            const newDepartment = new Department({
                department: lowercaseDepartment
            });
            newDepartment.save().then(async () => {
                const departments = await Department.find({})
                res.status(200).json(departments)
            }).catch((err) => {
                res.status(500).json({ err: "can't add department" })
            })
        } else {
            res.status(500).json({ err: "department is already exist" });
        }

    } catch (error) {
        res.status(500).json({ err: "can't create department" });
    }
}


//get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});

        if (departments) {
            res.status(201).send(departments);
        } else {
            res.status(500).send({ err: "something wrong" })
        }

    } catch (error) {
        res.status(500).json({ err: "can't get departments" })
    }
};


//get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({});
        res.status(201).send(patients);


    } catch (error) {
        res.status(500).json({ err: "can't get the patients" });
    }
};


//delete a doctor
export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctors = await Doctor.findByIdAndUpdate(id, { deleted: true });
        if (doctors) {
            const updatedDoctors = await Doctor.find({ deleted: false });
            res.status(200).json({ doctors: updatedDoctors })
        }

    } catch (error) {
        res.status(500).json({ err: "can't delete the doctor" })
    }
}

//delete a department
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDep = await Department.findByIdAndDelete(id);
        if (deleteDep) {
            const departments = await Department.find({});
            res.status(201).json({ departments });
        } else {
            res.status(500).json({ err: "dletetion failed" })
        }
    } catch (error) {

        res.status(500).json({ err: "can't delete department" })

    }

}

//block user
export const blockUser = async (req, res) => {
    try {
        const id = req.params;
        const block = await User.findByIdAndUpdate(id, { isActive: false });
        if (block) {
            return res.status(200).json({ success: "user blocked successfully" })
        }
        return res.status(500).json({ err: "user blocking failed" })

    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const editDoctor = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;

        if (req.body.image) {
            const imgId = req.body.imgPublicId;

            await cloudinary.uploader.destroy(imgId);

            const uploadRes = await cloudinary.uploader.upload(req.body.image, {
                allowed_formats: "jpg,png,webp,jpeg",
                upload_preset: 'webDoc'
            });
            data.image = uploadRes;
            delete data.imgPublicId;
        }

        const doctors = await Doctor.findByIdAndUpdate(userId, data);
        if (doctors) {
            const updatedDoctor = await Doctor.findOne({ _id: doctors._id });
            res.status(200).send(updatedDoctor)
        } else {
            res.status(500).json({ err: "Doctor Updation failed" });
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Admin.find({}).select('unSeenNotification');
        res.status(200).json(notifications[0]?.unSeenNotification);

    } catch (error) {
        return res.status(500).json(error)

    }
}

export const getAllNotificationCount = async (req, res) => {
    try {
        const notificationCount = await Admin.find({}).select('unSeenNotification');
        return res.status(200).json({ count: notificationCount[0]?.unSeenNotification?.length })

    } catch (error) {
        return res.status(500).json(error)

    }
}

export const selectedDoctorDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorDetails = await Doctor.findOne({ _id: id }).select('-password')
        res.status(200).json(doctorDetails)

    } catch (error) {
        return res.status(500).json({ err: "unable to get the data" })

    }

}

export const doctorApproval = async (req, res) => {
    try {
        const { id } = req.params;
        const approveDoctor = await Doctor.findByIdAndUpdate({ _id: id }, { status: 'approved' });
        if (approveDoctor) {

            //node mailer
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

            const link = `<a href="${process.env.CLIENT_URL}/doctor/signup/${id}">Click here to create account</a>`;

            const info = await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: approveDoctor?.email, // list of receivers
                subject: "doctor application approved by the authority. please create your doctor account with the  ", // Subject line
                html: link, // plain text body
            });


            res.status(200).json({ success: "doctor application approved successfully" })
        }

    } catch (error) {
        res.status(500).json({ err: "unable to update the data" })
    }
}

//reject doctor request
export const doctorRejection = async (req, res) => {
    try {
        const { id } = req.params;
        const email = await Doctor.findById(id, 'email');
        const rejectDoctor = await Doctor.findByIdAndDelete(id);
        if (rejectDoctor) {


            //node mailer
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


            `<a href="${process.env.CLIENT_URL}/doctor/signin">You can request for doctor with proper documents</a>`;


            const info = await transporter.sendMail({
                from: process.env.EMAIL, // sender address
                to: email, // list of receivers
                subject: "doctor application denied by the authority", // Subject line
                html: link, // plain text body
            });


            res.status(200).json({ success: "doctor application denied successfully" })
        }
    } catch (error) {
        res.status(500).json({ err: "unable to deny" })

    }
}



//doctor requests
export const doctorRequests = (async (req, res) => {
    try {
        const doctorRequests = await Doctor.find({ status: 'pending' });
        res.status(200).json(doctorRequests)

    } catch (error) {
        return res.status(500).json({ err: "can't find data" })

    }
})


//total price
export const getAllDataCount = (async (req, res) => {
    try {
        const patients = await User.find({});
        const doctors = await Doctor.find({ status: 'approved' });
        const appointments = await Appointment.find();
        const price = await Appointment.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$price" }
                }
            }
        ])
        res.status(201).json({ patients: patients?.length, doctors: doctors?.length, appointments: appointments?.length, Transaction: price[0]?.totalPrice });


    } catch (error) {
        res.status(500).json({ err: "can't get the patients" });
    }
});


//monthly report
export const getSalesForChart = (async (req, res) => {
    try {
        const result = await Appointment.aggregate([
            {
                $group: {
                    _id: { $month: '$date' },
                    Total: { $sum: '$price' },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id', 1] }, then: 'January' },
                                { case: { $eq: ['$_id', 2] }, then: 'February' },
                                { case: { $eq: ['$_id', 3] }, then: 'March' },
                                { case: { $eq: ['$_id', 4] }, then: 'April' },
                                { case: { $eq: ['$_id', 5] }, then: 'May' },
                                { case: { $eq: ['$_id', 6] }, then: 'June' },
                                { case: { $eq: ['$_id', 7] }, then: 'July' },
                                { case: { $eq: ['$_id', 8] }, then: 'Auguest' },
                                { case: { $eq: ['$_id', 9] }, then: 'September' },
                                { case: { $eq: ['$_id', 10] }, then: 'October' },
                                { case: { $eq: ['$_id', 11] }, then: 'November' },
                                { case: { $eq: ['$_id', 12] }, then: 'December' },

                            ],
                            default: 'Unknown',
                        },
                    },
                    Total: 1,
                },
            },
        ]);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ err: "can't update the data" })

    }
});


//weekly report
export const getWeeklyReport = (async (req, res) => {
    try {

        const result = await Appointment.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    totalSales: { $sum: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const salesByDay = Array.from({ length: 7 }, (_, index) => {
            const dayData = result.find(data => data._id === index + 1);
            return dayData ? dayData.totalSales : 0
        });
       
        res.status(201).json(salesByDay)
    } catch (error) {
       
        res.status(500).json({ err: "can't create data" })

    }

});

//daily report 
export const getDailyReport = (async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await Appointment.aggregate([
            {
                $match: {
                    date: { $gte: today }
                }
            },
            {
                $group: {
                    _id: null,
                    prices: { $push: "$price" }
                }
            }
        ])

        const dailyPrices = result.length > 0 ? result[0].prices : 0;
      
        res.status(201).json(dailyPrices)

    } catch (error) {
        res.status(500).json({ err: "can't find the data" })

    }
})

//yearly report
export const getYearlyReport = (async (req, res) => {
    try {
        const result = await Appointment.aggregate([
            {
                $group: {
                    _id: { $year: "$createAt" },
                    totalSales: { $sum: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const yearlyReport = result.map(yearData => yearData.totalSales);
        res.status(201).json(yearlyReport)

    } catch (error) {
        res.status(500).json({ err: "can't update the data" })

    }
})

//sales report 
export const getSaleReport = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const result = await Appointment.paginate(
        {},
        {
          page,
          limit,
          populate: {
            path: 'userId',
            select: ['-password', '-tokens', '-mobile']
          },
          sort: { createdAt: -1 }
        }
      );
  
      const totalPages = Math.ceil(result.total / limit);
  
      res.status(201).json({
        transactions: result.docs,
        totalPages: totalPages
      });
    } catch (error) {
      res.status(500).json({ err: "Can't access data" });
    }
  };
  

  export const getData = async (req, res,) => {
    const adminId = req.admin;
    try {

        const user = await Admin.findById(adminId);
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
