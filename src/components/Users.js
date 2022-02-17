import React, { useState, useEffect } from "react";
import PrivateActions from "../service";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "react-bootstrap";

import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const Users = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const handleClick = ({ target }) => {
    const getResponseDelete = async (user) => {
      const response = await PrivateActions.deleteUsers(
        getAccessTokenSilently,
        user.user_id
      );
      alert(response, setReload(!reload));
    };
    const getResponseBlock = async (user) => {
      const response = await PrivateActions.blockUsers(
        getAccessTokenSilently,
        user.user_id
      );
      alert(response, setReload(!reload));
    };
    const getResponseUnblock = async (user) => {
      const response = await PrivateActions.unblockUsers(
        getAccessTokenSilently,
        user.user_id
      );
      alert(response, setReload(!reload));
    };
    if (target.value === "unblock") {
      users.map((user) => (user.isSelected ? getResponseUnblock(user) : user));
    } else if (target.value === "block") {
      users.map((user) => (user.isSelected ? getResponseBlock(user) : user));
    } else {
      users.map((user) => (user.isSelected ? getResponseDelete(user) : user));
    }
  };

  useEffect(() => {
    PrivateActions.getUsers(getAccessTokenSilently, setUsers);
  }, [reload, getAccessTokenSilently]);

  return (
    <>
      <>
        <h3>Users</h3>
        <Button
          variant="outline-secondary"
          value={"block"}
          onClick={handleClick}
        >
          Block
        </Button>
        <Button
          style={{ marginLeft: "2%" }}
          variant="outline-warning"
          value={"unblock"}
          onClick={handleClick}
        >
          Unblock
        </Button>
        {/* <Button
          style={{ marginLeft: "2%" }}
          variant="outline-danger"
          value={"delete"}
          onClick={handleClick}
        >
          Delete
        </Button> */}
        <MdDeleteForever
          style={{ marginLeft: "2%", transform: "scale(2)", cursor: "pointer" }}
          onClick={handleClick}
        ></MdDeleteForever>
        <Table striped bordered hover style={{ marginTop: "2%" }}>
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
                <td>{e.blocked ? "Blocked" : "Unblocked"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};
