const routes = [
  {
    path: "/",
    sectionId: "mainSection",
  },
  {
    path: "/add",
    sectionId: "addSection",
  },
  {
    path: "/report",
    sectionId: "reportSection",
  },
];

const navigate = (url) => {
  window.history.pushState(null, null, url);
  App();
};

const App = async () => {
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });

  const match = pageMatches.find((pageMatch) => pageMatch.isMatch);

  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.style.display = "none";
  });

  if (match) {
    document.getElementById(match.route.sectionId).style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // console.log("😎 DOMContentLoaded");
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");
    console.log("target", target);
    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault();
    navigate(target.href);
  });
  
  App();
});

window.addEventListener("popstate", App);
