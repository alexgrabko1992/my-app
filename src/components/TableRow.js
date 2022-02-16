import React, { useState } from "react";
import PrivateActions from "../service";

export const TableRow = ({ user }) => {
  return (
    <tr>
      <th>
        <input type="checkbox" />
      </th>
      <td>{user.user_id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{PrivateActions.transformDate(user.created_at)}</td>
      <td>{PrivateActions.transformDate(user.last_login)}</td>
      <td>login</td>
    </tr>
  );
};
