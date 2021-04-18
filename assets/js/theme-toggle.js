function adddarkmode(){
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


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log(localStorage.getItem("theme"))
      if (localStorage.getItem("theme") === null || localStorage.getItem("theme") == "dark-mode") {
        adddarkmode();
        localStorage.setItem('theme', 'dark-mode');
      }
  }


function themeToggle() {
  let element = document.body;
  let theme = localStorage.getItem("theme");

  if (theme && theme === "dark-mode") {
    localStorage.setItem("theme", "light-mode");
    document.getElementById("dark-mode").remove();
  } else {
    localStorage.setItem("theme", "dark-mode");
    adddarkmode();
  }
}
