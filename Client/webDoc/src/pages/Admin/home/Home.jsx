import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/Admin/widget/Widget";
import Featured from "../../../components/Admin/featured/Featured";
import Chart from "../../../components/Admin/chart/Chart";
import Table from "../../../components/Admin/table/Table";
import WeeklyChart from "../../../components/Admin/WeeklyChart/WeeklyChart";
import YearlyChart from "../../../components/Admin/YearlyChart/YearlyChart"
import DailyChart from "../../../components/Admin/DailyChart/DailyChart";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { getAdmin } from "../../../Helpers/adminHelper";

const Home = () => {
  const [cookies, removeCookie] = useCookies([]);
const [admin, setAdmin] = useState("");
const navigate = useNavigate();

const Logout = () => {
  removeCookie("token");
  navigate("/admin/login");
};

useEffect(() => {
  try {
    const verifyCookie = async () => {
      
      if (cookies.token === "undefined") {
        navigate('/admin/login');
        const admin = await getAdmin();
        setAdmin(admin);
        if (!admin) {
          removeCookie("token");
          navigate("/admin/login");
        }
      }
    };
  
    verifyCookie();
    
  } catch (error) {
    return error;
    
  }
  
}, [cookies, navigate, removeCookie]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar Logout={Logout}/>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Chart title="Monthly Revenue" aspect={2 / 1} />
          <WeeklyChart title="Weekly Revenue" aspect={2/ 1} />
        </div>
        <div className="charts">
          <YearlyChart title='Yearly Revenue' aspect={2/1}/>
          <DailyChart title='Daily Revenue' aspect={2/1}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
