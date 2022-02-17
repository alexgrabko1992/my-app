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
  };
  transformDate = (date) => {
    const standart = new Date(date);
    return standart.toUTCString();
  };
}

export default new PrivateActions();
