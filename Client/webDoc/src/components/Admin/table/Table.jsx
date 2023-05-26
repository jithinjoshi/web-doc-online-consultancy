import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useRef, useState } from "react";
import { getAllTransactions } from "../../../Helpers/adminHelper";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const List = () => {
  const tableRef = useRef(null);

  const generatePDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('sales report.pdf');
    });
  };

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async (page) => {
    try {
      const data = await getAllTransactions(page);
      setRows(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
      setRows([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="button-group" style={{ margin: "10px" }}>
        <span style={{ paddingLeft: "30px" }}>
          <Button variant="contained" color="primary" onClick={generatePDF}>
            Download PDF
          </Button>
        </span>
      </div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">NO.</TableCell>
              <TableCell className="tableCell">Doctor</TableCell>
              <TableCell className="tableCell">Patient</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Owner</TableCell>
              <TableCell className="tableCell">Payment Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row?._id}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row?.doctorImage} alt="" className="image" />
                    {row?.doctorName}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row?.userId?.username}</TableCell>
                <TableCell className="tableCell">{row?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="tableCell">₹{row?.price}</TableCell>
                <TableCell className="tableCell">{row?.paymentOwner}</TableCell>
                <TableCell className="tableCell">{row?.paymentOwnerEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`pagination-button${currentPage === page ? " active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
};

export default List;
