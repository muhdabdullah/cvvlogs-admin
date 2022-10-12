export const SignIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: "RESET_AUTH_MESSAGE",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/login`, {
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
        if (!response.access_token || response.access_token !== '') {
          const auth_id = response.user.id;
          const username = response.user.username;
          dispatch({
            type: "SIGN_IN",
            authError: null,
            auth_id,
            authMessage: "Signing you in...",
            loading: true,
          });
          localStorage.setItem("auth_id", auth_id);
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("name", username);
          window.location = "/dashboard";
        } else {
          alert(response.error);
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
