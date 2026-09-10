/*
Theme is UI preference only.
No application/user data is stored here.
The preference is intentionally handled without localStorage.
The backend remains the source of application data.
*/
(() => {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = systemDark ? "dark" : "light";

  window.toggleTheme = () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  };
})();
