// theme toggle - uses system state then toggles if desired.

function dayNightIcon(type) {
  var icon = document.querySelector(".day-night-icon");
  var mode;
  if (type === "day") {
    if (icon.className.split(" day").length <= 1) mode = "day";
  }
  if (type === "night") {
    if (icon.className.split(" night").length <= 1) mode = "night";
  }
  if (typeof mode === "string") {
    icon.style.pointerEvents = "none";
    icon.className =
      icon.className.split(" ").shift() +
      " " +
      (mode === "day" ? "night" : "day") +
      "-close";
    setTimeout(function () {
      icon.className = icon.className.split(" ").shift() + " " + mode;
      setTimeout(function () {
        icon.style.pointerEvents = "auto";
      }, 500);
    }, 500);
  }
}

// check system state
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark-mode") {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  dayNightIcon("night");
} else if (savedTheme === "light-mode") {
  document.documentElement.setAttribute("data-bs-theme", "light");
  dayNightIcon("day");
} else {
  // If no theme is saved, check the system's preference.
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    dayNightIcon("night");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
    dayNightIcon("day");
  }
}

function themeToggle() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-bs-theme");

  if (currentTheme === "dark") {
    localStorage.setItem("theme", "light-mode");
    htmlElement.setAttribute("data-bs-theme", "light");
    dayNightIcon("day");
  } else {
    localStorage.setItem("theme", "dark-mode");
    htmlElement.setAttribute("data-bs-theme", "dark");
    dayNightIcon("night");
  }
}
