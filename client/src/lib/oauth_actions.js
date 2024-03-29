import { openSignInWindow } from "./oauth_popup";
const VITE_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fbSignInAction = () => {
  openSignInWindow(`${VITE_APP_SERVER_URL}/oauth/facebook`, "SignIn");
};

export const googleSignInAction = () => {
  openSignInWindow(`${VITE_APP_SERVER_URL}/oauth/google`, "SignIn");
};
