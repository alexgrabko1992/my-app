import React, { useState, useEffect } from "react";
import PrivateActions from "../service";
import { BsFillTrashFill } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
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
    if (target.value == "delete") {
      users.map((user) => (user.isSelected ? getResponseDelete(user) : user));
    } else if (target.value == "block") {
      users.map((user) => (user.isSelected ? getResponseBlock(user) : user));
    } else if (target.value == "unblock") {
      users.map((user) => (user.isSelected ? getResponseUnblock(user) : user));
    }
  };

  useEffect(() => {
    PrivateActions.getUsers(getAccessTokenSilently, setUsers);
  }, [reload]);

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
          variant="outline-warning"
          value={"unblock"}
          onClick={handleClick}
        >
          Unblock
        </Button>
        <Button variant="outline-danger" value={"delete"} onClick={handleClick}>
          Delete
        </Button>
        {/* <CgUnblock /> */}
        {/* <BsFillTrashFill /> */}

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
                <td>{e.blocked ? "Blocked" : "Unblocked"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </>
  );
};
