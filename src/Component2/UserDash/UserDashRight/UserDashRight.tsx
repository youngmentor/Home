import { Route,Routes } from "react-router-dom"
import UserProfile from "./UserProfile/UserProfile"
import UserHistory from "./UserHistory/UserHistory"
import './UserDashRight.css'
const UserDashRight: React.FC = () => {


    return (
        <div className="UserDashRight_Main">
           <div className="UserDash_Header"> 

           </div>
           <div className="UserDashRight_Content">
              <Routes>
                <Route path="/userprofile" element={<UserProfile/>}/>
                <Route path="/userhistory" element={<UserHistory/>}/>
              </Routes>
           </div>
        </div>
    )
}

export default UserDashRight