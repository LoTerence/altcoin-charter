// initIndexHTML.js: injects this javascript at the top of the
// HTML body element for better critical render path

// init dark mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.setAttribute("data-bs-theme", "dark");
} else {
  document.documentElement.removeAttribute("data-bs-theme");
}

// connect facebook
// TODO: fix facebook Oauth login
/*
window.fbAsyncInit = function () {
  FB.init({
    appId: "1013817746106477",
    cookie: true,
    xfbml: true,
    version: "v12.0",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
*/
