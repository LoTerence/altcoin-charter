import { openSignInWindow } from "./oauth_popup";
const { REACT_APP_SERVER_URL } = process.env;

export const fbSignInAction = () => {
  openSignInWindow(`${REACT_APP_SERVER_URL}/users/facebook`, "SignIn");
};

export const googleSignInAction = () => {
  openSignInWindow(`${REACT_APP_SERVER_URL}/users/google`, "SignIn");
};
