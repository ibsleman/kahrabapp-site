// Theme toggle. The initial value is applied by a tiny inline script in <head>
// (before first paint, so there is no white flash); this file only wires the
// button and keeps the choice in localStorage.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("themeBtn");
  if (!btn) return;

  var label = function () {
    var dark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  };

  label();

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("kahrab-theme", next);
    } catch (e) {}
    label();
  });

  // Follow the OS only while the visitor has not made an explicit choice.
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  var onSystemChange = function (e) {
    try {
      if (localStorage.getItem("kahrab-theme")) return;
    } catch (err) {}
    root.setAttribute("data-theme", e.matches ? "dark" : "light");
    label();
  };
  if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
  else if (mq.addListener) mq.addListener(onSystemChange);
})();
