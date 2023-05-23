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

const Navbar = ({Logout}) => {
  const { dispatch } = useContext(DarkModeContext);
  const [count,setCount] = useState()

  useEffect(()=>{
    getAllNotificationCount().then((notifications)=>{
      setCount(notifications?.data?.count);
    })
  })

  const logoutHandler = (e=>{
    e.preventDefault();
    Logout();
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
            <button onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;