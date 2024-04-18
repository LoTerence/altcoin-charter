import { openSignInWindow } from "./oauth_popup";
const serverURL =
  import.meta.env?.VITE_APP_SERVER_URL || import.meta.env.BASE_URL;

console.log("BASE_URL:", import.meta.env.BASE_URL);
console.log("serverURL:", serverURL);

export const fbSignInAction = () => {
  openSignInWindow(`${serverURL}/oauth/facebook`, "SignIn");
};

export const googleSignInAction = () => {
  openSignInWindow(`${serverURL}/oauth/google`, "SignIn");
};
