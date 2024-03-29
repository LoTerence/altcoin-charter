let windowObjectReference = null;
let previousUrl = null;
const VITE_APP_CLIENT_URL = import.meta.env.VITE_APP_CLIENT_URL;

export const openSignInWindow = (url, name) => {
  // remove any existing event listeners
  window.removeEventListener("message", receiveMessage);

  // window features
  const strWindowFeatures =
    "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist 
        or if such pointer exists but the window was closed */
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    /* if the resource to load is different,
        then we load it in the already opened secondary window and then
        we bring such window back on top/in front of its parent window. */
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference.focus();
  } else {
    /* else the window reference must exist and the window 
        is not closed; therefore, we can bring it back on top of any other 
        window with the focus() method. There would be no need to re-create 
        the window or to reload the referenced resource.  */
    windowObjectReference.focus();
  }

  // add the listener for receiving a message from the popup

  window.addEventListener("message", (event) => receiveMessage(event), false);
  // assign the previous url
  previousUrl = url;
};

const receiveMessage = (event) => {
  // Do we trust the sender of this message? (might be different from what we originally opened, for example).
  if (event.origin !== VITE_APP_CLIENT_URL) {
    return;
  }

  // if we trust the sender and the source is our popup
  if (event.source.name === "SignIn") {
    const { data } = event;
    const token = "JWT " + data.slice(7);
    localStorage.setItem("token", token);
    window.location.pathname = "/feature";
  }
};

export { receiveMessage, windowObjectReference, previousUrl };
