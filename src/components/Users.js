import React, { useState, useEffect } from "react";
import PrivateActions from "../service";

import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const Users = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  console.log(users);
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
                <input
                  type="checkbox"
                  onChange={({ target }) => {
                    const checked = target.checked;
                    setUsers(
                      users.map((user) => {
                        user.isSelected = checked;
                        return user;
                      })
                    );
                  }}
                />
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
              <tr key={e.user_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={e.isSelected}
                    onChange={({ target }) => {
                      const checked = target.checked;
                      setUsers(
                        users.map((user) => {
                          if (user.user_id === e.user_id) {
                            user.isSelected = checked;
                            return user;
                          } else {
                            return user;
                          }
                        })
                      );
                    }}
                  />
                </td>
                <td>{e.user_id}</td>
                <td style={{ textTransform: "capitalize" }}>{e.username}</td>
                <td>{e.email}</td>
                <td>{PrivateActions.transformDate(e.created_at)}</td>
                <td>{PrivateActions.transformDate(e.last_login)}</td>
                <td>login</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};
