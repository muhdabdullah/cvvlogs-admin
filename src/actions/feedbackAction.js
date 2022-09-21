export const feedBack = (userId, feedback) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/send_feedback.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        feedback: feedback,
      }),
    })
      .then((response) => {
        dispatch({
          type: "FEEDBACK_MODAL_TOGGLE",
          feedbackModal: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FEEDBACK_MODAL_TOGGLE",
          feedbackModal: true,
        });
      });
  };
};
