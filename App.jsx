//Main screen
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import * as muiImports from "@mui/material";
import { border, borderRadius, padding } from "@mui/system";
const {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} = muiImports;

function App() {
  const [data, setdata] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`https://651e976244a3a8aa4768a26e.mockapi.io/Crud`)
      .then((response) => {
        if (response.status!==200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => setdata(data))
      .catch((error) => console.error("Error in fetching data: ", error));
  };

  const handleAddButton = () => {
    navigate("/new-entry");
  };

  const handleEditButton = (itemId) => {
    navigate(`/edit-entry/${itemId}`);
  };

  const handleDeleteButton = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`https://651e976244a3a8aa4768a26e.mockapi.io/Crud/${itemId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          fetchData();
        })
        .catch((error) => console.error("Error deleting item: ", error));
    }
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 20, align: "center" },
    { id: "name", label: "Name", minWidth: 20, align: "center" },
    { id: "age", label: "Age", minWidth: 20, align: "center" },
    { id: "email", label: "Email", minWidth: 20, align: "center" },
    { id: "actions", label: "Actions", minWidth: 20, align: "center" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    // <div className="container">
    //   <h1>API Data:</h1>
    //   <table className="dataTable">
    //     <thead className="dataHeader">
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Age</th>
    //         <th>Email</th>
    //         <th>Activities</th>
    //       </tr>
    //     </thead>
    //     <tbody className="dataBody">
    //       {data.map((item) => (
    //         <tr key={item.id}>
    //           <td>{item.id}</td>
    //           <td>{item.name}</td>
    //           <td>{item.age}</td>
    //           <td>{item.email}</td>
    //           <td>
    //             <button
    //               id="newEntryButton"
    //               onClick={() => handleEditButton(item.id)}
    //             >
    //               Edit
    //             </button>
    //             {""} &nbsp;
    //             <button
    //               id="deleteEntryButton"
    //               onClick={() => handleDeleteButton(item.id)}
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <br />
    //   <center>
    //     <button className="btn btn-primary" onClick={handleAddButton}>
    //       Add new
    //     </button>
    //   </center>
    // </div>
    <div className="container">
      <h1>API Data</h1>
      <center>
        <Paper sx={{ width: "50%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {data.map((item) => ( */}
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.age}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">
                        <button
                          className="actionButton"
                          id="newEntryButton"
                          onClick={() => handleEditButton(item.id)}
                        >
                          <EditIcon />
                        </button>{" "}
                        &nbsp;
                        <button
                          className="actionButton"
                          variant="text"
                          id="deleteEntryButton"
                          onClick={() => handleDeleteButton(item.id)}
                        >
                          <DeleteIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </center>
      <br />
      <center>
        <button className="btn btn-primary" onClick={handleAddButton}>
          Add new
        </button>
      </center>
    </div>
  );
}

export default App;
