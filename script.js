document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");
  const newsCards = Array.from(document.querySelectorAll(".news-card"));

  // Optional: if you used my updated HTML with a nav toggle button
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // --- Mobile nav toggle (only runs if button exists) ---
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navMenu.classList.toggle("is-open", !expanded);
    });
  }

  if (!searchInput || !searchButton || newsCards.length === 0) return;

  // Create a "no results" message (shown only when needed)
  const container = document.querySelector(".news-container");
  const noResults = document.createElement("p");
  noResults.className = "no-results";
  noResults.textContent = "No results found.";
  noResults.hidden = true;
  container?.appendChild(noResults);

  const normalize = (s) => (s || "").toLowerCase().trim();

  function applySearch() {
    const term = normalize(searchInput.value);
    let visibleCount = 0;

    newsCards.forEach((card) => {
      const title = normalize(card.querySelector("h3")?.textContent);
      const content = normalize(card.querySelector("p")?.textContent);

      const match = term === "" || title.includes(term) || content.includes(term);
      card.hidden = !match;      // better than display:block/none for grid
      if (match) visibleCount++;
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  }

  // Small debounce so it feels smooth while typing
  let t;
  function debouncedSearch() {
    clearTimeout(t);
    t = setTimeout(applySearch, 120);
  }

  // Button click
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    applySearch();
  });

  // Live search while typing
  searchInput.addEventListener("input", debouncedSearch);

  // Enter to search + Esc to clear
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applySearch();
    }
    if (e.key === "Escape") {
      searchInput.value = "";
      applySearch();
      searchInput.blur();
    }
  });

  // Initial state
  applySearch();
});


/* ===== Added functionality ===== */
document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.querySelector(".theme-toggle");

  if (localStorage.getItem("football-theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  function updateThemeIcon() {
    if (!themeButton) return;
    themeButton.textContent =
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  }

  updateThemeIcon();

  themeButton?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "football-theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
    updateThemeIcon();
  });

});
