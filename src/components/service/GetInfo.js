class GetInfo {
  getPublicInfo = async () => {
    const response = await fetch("http://localhost:5000/");
    const jsonResponse = await response.json();
    return jsonResponse;
  };

  getPrivateInfo = async (getToken) => {
    const token = await getToken();
    const response = await fetch("http://localhost:5000/firebase", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse.firebaseToken;
  };
  signInFirebase = async (auth, signInWithCustomToken, firebaseToken) => {
    const userCredential = await signInWithCustomToken(auth, firebaseToken);
    return userCredential;
  };
  getUser = async (user, getAccessTokenSilently) => {
    const token = await getAccessTokenSilently();
    const user_id = user.sub;
    const response = await fetch(`http://localhost:5000/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };
}

export default new GetInfo();
