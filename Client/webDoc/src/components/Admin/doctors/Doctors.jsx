import "./doctors.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { blockDoctor, deleteDoctor, unblockDoctor } from "../../../Helpers/adminHelper";
import Swal from 'sweetalert2'

const Doctors = ({ doctors, setDoctors }) => {
  const [data, setData] = useState();

  const handleBlock = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const blockDoc = await blockDoctor(id);
          setDoctors(blockDoc?.data)

          setData()

          Swal.fire(
            'Success!',
            'You Blocked doctor successfully',
            'success'
          )
        }
      })



    } catch (error) {
      return error

    }
  };

  const handleUnBlock = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Do it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const unblockDoc = await unblockDoctor(id);
          setDoctors(unblockDoc?.data)

          setData()

          Swal.fire(
            'Success!',
            'You unblocked doctor successfully',
            'success'
          )
        }
      })



    } catch (error) {
      return error

    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/admin/update-doctor/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {
              params?.row?.isActive ? <div
              className="deleteButton"
              onClick={() => handleBlock(params.row._id)}
            >
              Block

            </div>
            :
            <div
              className="unblockButton"
              onClick={() => handleUnBlock(params.row._id)}
            >
              unblock

            </div>
            }
            
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Doctors List
        <Link to="/admin/addDoctor" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={doctors}
        getRowId={(row) => row._id}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Doctors;
