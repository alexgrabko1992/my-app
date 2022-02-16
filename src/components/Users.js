import React, { useState, useEffect } from "react";
import { TableRow } from "./TableRow";
import PrivateActions from "../service";

import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const Users = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    PrivateActions.getUsers(getAccessTokenSilently, setUsers);
  }, []);

  return (
    <>
      <>
        <h3>Users</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>id</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Created at</th>
              <th>Last login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e) => (
              <TableRow user={e} />
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};
