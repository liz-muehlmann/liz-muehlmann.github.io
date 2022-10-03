function adddarkmode(e) {
  if (!document.getElementById("dark-mode")){
  var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = "dark-mode";
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '/assets/css/darkmode.css';
    link.media = 'all';
    head.appendChild(link);
} }

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
    icon.className = icon.className.split(" ").shift() + " " + (mode === "day" ? "night" : "day") + "-close";
    setTimeout(function() {
      icon.className = icon.className.split(" ").shift() + " " + mode;
      setTimeout(function() {
        icon.style.pointerEvents = "auto";
      }, 500);
    }, 500);
  }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log(localStorage.getItem("theme"));
  if (localStorage.getItem("theme") === null || localStorage.getItem("theme") == "dark-mode") {
    adddarkmode();
    dayNightIcon("night");
    localStorage.setItem('theme', 'dark-mode');
  } else {
    dayNightIcon("day");
  }
}


function themeToggle() {
  let element = document.body;
  let theme = localStorage.getItem("theme");

  if (theme && theme === "dark-mode") {
    localStorage.setItem("theme", "light-mode");
    document.getElementById("dark-mode").remove();
    dayNightIcon("day");
  } else {
    localStorage.setItem("theme", "dark-mode");
    adddarkmode();
    dayNightIcon("night");
  }
}
