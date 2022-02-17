class PrivateActions {
  getUsers = async (getAccessToken, setHook) => {
    const token = await getAccessToken();
    const response = await fetch("http://localhost:5000/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    let jsonResponse = await response.json();
    jsonResponse.map((item) => (item.isSelected = false));
    setHook(jsonResponse);
    console.log(jsonResponse);
  };
  //===============================================================================================
  transformDate = (date) => {
    const standart = new Date(date);
    return standart.toUTCString();
  };
  //===============================================================================================
  deleteUsers = async (getAccessToken, userId) => {
    const token = await getAccessToken();
    const response = await fetch("http://localhost:5000/delete-users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        body: JSON.stringify(userId),
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  //===============================================================================================
  blockUsers = async (getAccessToken, userId) => {
    const token = await getAccessToken();
    const response = await fetch("http://localhost:5000/block-users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        body: JSON.stringify(userId),
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  //===============================================================================================
  unblockUsers = async (getAccessToken, userId) => {
    const token = await getAccessToken();
    const response = await fetch("http://localhost:5000/unblock-users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
        body: JSON.stringify(userId),
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };
}

export default new PrivateActions();
