import './Header.css'
import Logo from './1 (12).png'
// import { GiHamburgerMenu } from "react-icons/gi";
// import { MdOutlineMenu } from "react-icons/md";
import { FaTimes, FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [header, setHeader] = useState(false)

    const HeaderDrop = (
        header && (
            <div className='HeaderDrop'>
                {/* <FaTimes/> */}
                <p onClick={() => navigate("alllogin/adminlogin")} style={{ cursor: "pointer" }} >Login</p>
                <p onClick={() => navigate("/allsignup/adminsignup")} style={{ cursor: "pointer" }}>sign up</p>
                <button className='Header_Bttn1' onClick={() => navigate("alllogin/adminlogin")} >Register Your Hotel</button>
                    <button className='Header_Bttn2'>Book a room</button>
            </div>
        )
    )
    return (
        <div className="HeaderMain">
            <div className="HeaderWrap">
                <div className='Header_LogoDiv'>
                    <img src={Logo} className='HeaderLogoImg' />
                </div>
                <div className='HeaderNav'>

                </div>
                <div className='Header_Bttn'>
                    <button className='Header_Bttn1' onClick={() => navigate(`/adminverify/${6464663}`)} >Register Your Hotel</button>
                    <button className='Header_Bttn2' onClick={() => navigate("/alllogin/login")}>Book a room</button>
                </div>
                <div className='HeaderBurgeMenu'>
                    {
                        header ? <FaTimes onClick={() => { setHeader(!header) }} className='TimesIcon' /> :
                            <FaRegUserCircle onClick={() => { setHeader(!header) }} className='MenuIcon' />
                    }
                    {header && HeaderDrop}

                </div>
            </div>
        </div>
    )
}
export default Header
