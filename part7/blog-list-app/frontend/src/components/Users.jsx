import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";

import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <TableContainer>
        <Table sx={{ maxWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>name</strong>
              </TableCell>
              <TableCell>
                <strong>blogs&nbsp;created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
