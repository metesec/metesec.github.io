(function () {
  const searchButton = document.getElementById("writing-search-button");
  if (searchButton && typeof window.displaySearch === "function") {
    searchButton.addEventListener("click", window.displaySearch);
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-writing-filter]"));
  const filterItems = Array.from(document.querySelectorAll(".writing-filter-item"));
  const emptyState = document.getElementById("writing-empty");
  const resultCount = document.getElementById("writing-result-count");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.writingFilter;
      let visible = 0;

      filterButtons.forEach(function (candidate) {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", active ? "true" : "false");
      });

      filterItems.forEach(function (item) {
        const tags = (item.dataset.tags || "").split("|");
        const show = filter === "all" || tags.includes(filter);
        item.hidden = !show;
        if (show && item.classList.contains("writing-card")) visible += 1;
      });

      if (emptyState) emptyState.hidden = visible !== 0;
      if (resultCount) resultCount.textContent = visible + (visible === 1 ? " matching article" : " matching articles");
    });
  });

  const progress = document.getElementById("reading-progress");
  if (progress) {
    const updateProgress = function () {
      const article = document.querySelector(".article-content");
      if (!article) return;
      const start = article.getBoundingClientRect().top + window.scrollY;
      const end = start + article.offsetHeight - window.innerHeight;
      const ratio = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      progress.style.transform = "scaleX(" + ratio + ")";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  const copyButton = document.getElementById("copy-article-link");
  if (copyButton && navigator.clipboard) {
    copyButton.addEventListener("click", function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        const original = copyButton.textContent;
        copyButton.textContent = "Link copied";
        window.setTimeout(function () { copyButton.textContent = original; }, 1800);
      });
    });
  }

  document.querySelectorAll("[data-goatcounter-code][data-goatcounter-path]").forEach(function (counter) {
    const code = counter.dataset.goatcounterCode;
    const path = counter.dataset.goatcounterPath;
    if (!code || !path) return;

    const counterPath = path === "TOTAL" ? "TOTAL" : (path.startsWith("/") ? path : "/" + path);
    const endpoint = "https://" + code + ".goatcounter.com/counter/" + counterPath + ".json";

    fetch(endpoint, { credentials: "omit", referrerPolicy: "no-referrer" })
      .then(function (response) {
        if (!response.ok) throw new Error("Counter unavailable");
        return response.json();
      })
      .then(function (data) {
        const value = counter.querySelector("[data-goatcounter-value]");
        const count = data.count_unique || data.count;
        if (!value || count === undefined || count === null) return;
        value.textContent = new Intl.NumberFormat(document.documentElement.lang || "en").format(Number(count));
        counter.hidden = false;
      })
      .catch(function () {
        counter.hidden = true;
      });
  });
})();
