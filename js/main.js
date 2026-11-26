(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");

  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () {
    setMenu(!links.classList.contains("open"));
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Scroll reveal
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Active nav link
  var navLinks = links.querySelectorAll("a:not(.btn)");
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { so.observe(s); });
  }

  // Project rail arrows
  var rail = document.getElementById("rail");
  function step() {
    var card = rail.querySelector(".proj");
    return card ? card.getBoundingClientRect().width + 20 : 400;
  }
  document.getElementById("prev").addEventListener("click", function () {
    rail.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.getElementById("next").addEventListener("click", function () {
    rail.scrollBy({ left: step(), behavior: "smooth" });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
