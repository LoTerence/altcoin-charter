if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.setAttribute("data-bs-theme", "dark");
} else {
  document.documentElement.removeAttribute("data-bs-theme");
}
