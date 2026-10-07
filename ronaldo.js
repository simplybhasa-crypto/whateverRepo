const crFilterButtons = document.querySelectorAll(".cr-filter");
const crTimelineEntries = document.querySelectorAll(".cr-timeline-entry");
const crMenuToggle = document.querySelector(".cr-menu-toggle");
const crNav = document.querySelector(".cr-nav");

crFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    crFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    crTimelineEntries.forEach((entry) => {
      entry.hidden = selectedCategory !== "all" && entry.dataset.category !== selectedCategory;
    });
  });
});

crMenuToggle.addEventListener("click", () => {
  const isExpanded = crMenuToggle.getAttribute("aria-expanded") === "true";
  crMenuToggle.setAttribute("aria-expanded", String(!isExpanded));
  crMenuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  crNav.classList.toggle("is-open", !isExpanded);
});

crNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    crMenuToggle.setAttribute("aria-expanded", "false");
    crMenuToggle.setAttribute("aria-label", "Open navigation");
    crNav.classList.remove("is-open");
  });
});

const crRevealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const crRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  crRevealItems.forEach((item) => crRevealObserver.observe(item));
} else {
  crRevealItems.forEach((item) => item.classList.add("is-visible"));
}