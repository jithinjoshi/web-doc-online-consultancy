import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import "./notifications.scss";
import Notification from "../../../components/Admin/Notifications/Notifications";

const Notifications = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="listContainer">
                    <div className="listTitle">Unseen Notifications</div>
                    <Notification/>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
