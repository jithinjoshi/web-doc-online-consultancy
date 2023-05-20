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

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
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
