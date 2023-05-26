import jwt from 'jsonwebtoken';
import { User } from '../Model/user.js';
import Doctor from '../Model/Doctor.js';
import { Admin } from '../Model/admin.js';

export const Auth = ((req, res, next) => {
  try {
    const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id);
      
      if (user){
        req.user = user?._id
        next()
      }
      else return res.json({ status: false })
    }
  })
  } catch (error) {
    res.status(401).json({ err: 'unauthorized user' });
  }
})

export const DoctorAuth = ((req, res, next) => {
  try {
    const token = req.cookies.token
  if (!token) {
    return res.json({ status: "no token"})
  }
  jwt.verify(token, process.env.DOCTOR_JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: 'verify failed' })
    } else {
      const user = await Doctor.findById(data.id)
      if (user){
        req.doctor = user?._id
        next()
      } 
      else return res.json({ status: false })
    }
  })
  } catch (error) {
    res.status(401).json({ err: 'unauthorized user' });
  }
})

export const AdminAuth = ((req, res, next) => {
  try {
    const token = req.cookies.token;
  if (!token) {
    return res.json({ status: "no token"})
  }
  jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err, data) => {
    if (err) {
     return res.json({ status: 'verify failed' })
    } else {
      const user = await Admin.findById(data.id);
      if (user){
        req.admin = user?._id
        next()
      } 
      else return res.json({ status: false })
    }
  })
  } catch (error) {
    res.status(401).json({ err: 'unauthorized user' });
  }
})




