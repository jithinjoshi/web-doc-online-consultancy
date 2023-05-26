import "./doctorRequests.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteDoctor } from "../../../Helpers/adminHelper";
import Swal from 'sweetalert2'

const DotorRequests = ({doctors,setDoctors}) => {
  const [data, setData] = useState();

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteDoc = await deleteDoctor(id);
          setDoctors(deleteDoc?.data?.doctors)
          
          setData()
          
          Swal.fire(
            'success!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

      
      
    } catch (error) {
      return error;
      
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
            <Link to={`/admin/doctor-request/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
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

export default DotorRequests;
