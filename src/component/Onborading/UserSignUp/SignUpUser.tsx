import React, { useState } from 'react';
import axios from 'axios';
// import HotelSignUp from './HotelImg2.jpeg'
import './SignUp.css'
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phonenumber: string;
}

const SignUpUser: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignUpForm>({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    phonenumber: '',
  });
  const[ showPassword, setShowPassword] = useState(false)
  const visiblePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div className='SignUpMain'>
      <div className='SignUpLeft'>
        <h2>Create an Account to continue as a User</h2>
        <form onSubmit={handleSubmit} className='SignUpForm'>
          <div className='SignUpInputDiv'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className='SignUpinput'
              placeholder='Name'
            />
          </div>
          <div className='SignUpInputDiv'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='SignUpinput'
              placeholder='Email'
            />
          </div>
          <div className='SignUpInputDiv'>
            <label htmlFor="password">Password</label>
            <div className='Input_Eye'>
              <input
                type= 'password' 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className='SignUpinputPass'
                placeholder='Password'
              />
               <div className="password-toggle">
             
            </div>
            </div>
          </div>
          <div className='SignUpInputDiv'>
            <label htmlFor="password">Confirm Password</label>
          <div className='Input_Eye'>
          <input
              type={showPassword ? 'text' : 'password'}
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
              className='SignUpinputPass'
              placeholder='Confirm Password'
            />
             <div className="password-toggle" onClick={visiblePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          </div>
          <div className='SignUpInputDiv'>
            <label htmlFor="password">Phone Number</label>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              required
              className='SignUpinput'
              placeholder='Phone Number'
            />
          </div>
          <button type="submit" className='SignUpBttn'>Sign Up</button>
        </form>
        <span className='SigupSpan'>Already have an account? <b onClick={() => navigate("/alllogin/login")} >Login here</b></span>
        <span className='SigupSpan'>I am not a User <b onClick={() => navigate("/allsignup/adminsignup")} >SignUp here</b></span>
      </div>
      {/* <div className='SignUpRight'>
        <img src={HotelSignUp} alt='signupimage' className='SignUpImage' />
      </div> */}
    </div>
  );
};

export default SignUpUser;
