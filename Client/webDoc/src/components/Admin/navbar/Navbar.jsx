import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllNotificationCount } from "../../../Helpers/adminHelper";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [count,setCount] = useState()

  useEffect(()=>{
    getAllNotificationCount().then((notifications)=>{
      setCount(notifications?.data?.count);
    })
  })

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        
        <div className="items">
        <div className="notification">
        <Link to='/admin/notifications'><NotificationsNoneOutlinedIcon /></Link>
          
          <div className="dot">{count}</div>
        </div>
          <div className="item">
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/admin-roles.png"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;