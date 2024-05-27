export const GET_APP_DATA = "GET_APP_DATA";

export const getAppData = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_APP_DATA,
      payloads: {
        accessToken: null,
        activeOrg: null,
        activeEvent: null,
      },
    });

    if (data) {
      dispatch({
        type: GET_APP_DATA,
        payloads: {
          accessToken: data.accessToken,
          activeOrg: data.activeOrg,
          activeEvent: data.activeEvent,
        },
      });
    } else {
      dispatch({
        type: GET_APP_DATA,
        payloads: {
          accessToken: null,
          activeOrg: null,
          activeEvent: null,
        },
      });
    }
  };
};
