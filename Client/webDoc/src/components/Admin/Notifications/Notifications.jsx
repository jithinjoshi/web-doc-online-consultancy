import "./notification.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllNotifications } from "../../../Helpers/adminHelper";

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        getAllNotifications().then((notifications) => {
            setNotifications(notifications?.data)
        })
    }, [])
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {
                        notifications?.map((notification) => {
                            return (
                                <TableRow>
                                    <TableCell className="tableCell"><img src={notification?.data?.image?.secure_url} alt="doctorImg"/></TableCell>
                                    <TableCell className="tableCell">{notification?.message}</TableCell>
                                    <TableCell><Link class="btn btn-green" to={`/admin/doctor-request/${notification?.doctorId}`}>view Notification</Link></TableCell>
                                </TableRow>

                            )
                        })
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Notifications;
