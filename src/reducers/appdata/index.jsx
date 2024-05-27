import { GET_APP_DATA } from "../../actions/appdata";

const initialize = {
  accessToken: null,
  activeOrg: null,
  activeEvent: null,
};

const appData = (state = initialize, action) => {
  switch (action.type) {
    case GET_APP_DATA:
      return {
        ...state,
        accessToken: action.payloads.accessToken,
        activeOrg: action.payloads.activeOrg,
        activeEvent: action.payloads.activeEvent,
      };
    default:
      return state;
  }
};

export default appData;
