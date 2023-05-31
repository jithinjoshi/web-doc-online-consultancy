import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, selectUser } from '../../Redux/Doctor/doctorSlice';
import { doctorProfile, editDoctorProfile } from '../../Helpers/doctorHelper';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';

const DoctorsEdit = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  let result;

  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [fees, setFees] = useState('');
  const [image, setImage] = useState('');

  const handleDoctorImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage('');
    }
  };

  const validate = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    } else if (firstName.length < 3) {
      errors.firstName = 'First name should contain at least three characters';
    } else if (firstName.length > 15) {
      errors.firstName = 'Maximum limit exceeded';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.includes(' ')) {
      errors.password = 'Invalid password';
    }

    if (!address) {
      errors.address = 'Address is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 7) {
      errors.password = 'Password must contain at least six characters';
    }

    if (experience > 50) {
      errors.experience = 'Invalid experience';
    } else if (experience < 0) {
      errors.experience = 'Invalid experience. Please enter proper experience';
    }

    if (fees < 0) {
      errors.fees = 'Invalid fees';
    } else if (fees > 3000) {
      errors.fees = 'Maximum fees limit exceeded';
    }

    if (about.length > 300) {
      errors.about = 'Please shorten the about me content';
    }

    if (image) {
      const delimiter = '/';
      const end = ';';
      const index = image.indexOf(delimiter);
      const endIndex = image.indexOf(end);
      result = image.slice(index + 1, endIndex);
      if (
        result !== 'jpg' &&
        result !== 'jpeg' &&
        result !== 'png' &&
        result !== 'webp'
      ) {
        errors.image = 'Invalid file format. Please upload a valid image';
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      dob: '',
      about: '',
      experience: '',
      fees: '',
      image: '',
    },
    validate,
    onSubmit: (values) => {
      const data = new FormData();
      data.append('firstName', values.firstName);
      data.append('lastName', values.lastName);
      data.append('email', values.email);
      data.append('password', values.password);
      data.append('address', values.address);
      data.append('dob', values.dob);
      data.append('about', values.about);
      data.append('experience', values.experience);
      data.append('fees', values.fees);
      data.append('image', values.image);

      dispatch(editDoctorProfile(data))
        .then((res) => {
          if (res.status === 200) {
            toast.success('Profile updated successfully');
            history(`/doctor-profile/${id}`);
          }
        })
        .catch((err) => {
          toast.error('Failed to update profile');
        });
    },
  });

  useEffect(() => {
    if (user) {
      doctorProfile(id).then((res) => {
        setDoctor(res.data.doctor);
      });
    } else {
      history('/doctor-signin');
    }
  }, [user]);

  useEffect(() => {
    if (doctor) {
      setFirstName(doctor.firstName);
      setLastName(doctor.lastName);
      setEmail(doctor.email);
      setAddress(doctor.address);
      setDob(doctor.dob);
      setAbout(doctor.about);
      setExperience(doctor.experience);
      setFees(doctor.fees);
      setImage(doctor.image);
    }
  }, [doctor]);

  return (
    <div>
      <Toaster />
      <div className="mainDiv">
        <div className="contentDiv">
          <div className="row">
            <div className="col-md-3">
              <SideBar />
            </div>
            <div className="col-md-9">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="error">{formik.errors.firstName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="error">{formik.errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea
                        name="address"
                        id="address"
                        className="form-control"
                        rows="3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      ></textarea>
                      {formik.touched.address && formik.errors.address ? (
                        <div className="error">{formik.errors.address}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dob}
                      />
                      {formik.touched.dob && formik.errors.dob ? (
                        <div className="error">{formik.errors.dob}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="about">About Me</label>
                      <textarea
                        name="about"
                        id="about"
                        className="form-control"
                        rows="3"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.about}
                      ></textarea>
                      {formik.touched.about && formik.errors.about ? (
                        <div className="error">{formik.errors.about}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="experience">Experience (in years)</label>
                      <input
                        type="number"
                        name="experience"
                        id="experience"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.experience}
                      />
                      {formik.touched.experience && formik.errors.experience ? (
                        <div className="error">{formik.errors.experience}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="fees">Consultation Fees</label>
                      <input
                        type="number"
                        name="fees"
                        id="fees"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fees}
                      />
                      {formik.touched.fees && formik.errors.fees ? (
                        <div className="error">{formik.errors.fees}</div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Profile Image</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control"
                        onChange={(e) => {
                          formik.setFieldValue('image', e.target.files[0]);
                          handleDoctorImageUpload(e);
                        }}
                      />
                      {formik.touched.image && formik.errors.image ? (
                        <div className="error">{formik.errors.image}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsEdit;
