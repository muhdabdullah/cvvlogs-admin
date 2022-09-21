export const SignIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: "RESET_AUTH_MESSAGE",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status === 200) {
          const auth_id = response.data.auth_id;
          const username = response.data.username;
          dispatch({
            type: "SIGN_IN",
            authError: null,
            auth_id,
            authMessage: "Signing you in...",
            loading: true,
          });
          localStorage.setItem("auth_id", auth_id);
          localStorage.setItem("name", username);
          window.location = "/dashboard";
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        const authError = JSON.stringify(error);
        console.log(authError);
        dispatch({
          type: "SIGN_IN",
          authError,
          auth_id: null,
          employee_id: null,
          authMessage: null,
          loading: true,
        });
      });
  };
};
export const signOut = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/logout.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_id: localStorage.getItem("auth_id"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("auth_id");
          localStorage.removeItem("name");
          window.location = "/";
          dispatch({
            type: "SIGN_OUT",
          });
        }
      })
      .catch((error) => {
        const authError = JSON.stringify(error);
        console.log(authError);
      });
  };
};
