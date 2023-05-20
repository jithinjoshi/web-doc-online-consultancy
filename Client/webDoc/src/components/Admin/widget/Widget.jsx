import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { getAllData } from "../../../Helpers/adminHelper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [details,setDetails] = useState();
  useEffect(()=>{
    getAllData().then((details)=>{
      setDetails(details?.data)
    })
  },[])
  let data;

  switch (type) {
    case "user":
      data = {
        title: "PATIENTS",
        isMoney: false,
        link: "See all patients",
        linkAddress:'users',
        data:details?.patients,
      };
      break;
    case "order":
      data = {
        title: "DOCTORS",
        isMoney: false,
        link: "View all Doctors",
        linkAddress:'doctors',
        data:details?.doctors,
      };
      break;
    case "earning":
      data = {
        title: "APPOINTMENTS",
        isMoney: false,
        data:details?.appointments,
        linkAddress:'doctors',
      };
      break;
    case "balance":
      data = {
        title: "TRANSACTIONS",
        isMoney: true,
        data:details?.Transaction
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₹"} {data.data}
        </span>
        <Link to={data?.linkAddress}><span className="link">{data.link}</span></Link>
      </div>
    </div>
  );
};

export default Widget;
