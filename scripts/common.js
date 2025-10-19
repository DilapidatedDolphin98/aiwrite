(function () {
  const header = document.querySelector("header.site-header");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const backToTop = document.querySelector("[data-back-to-top]");

  function handleScroll() {
    if (!header) return;
    const isScrolled = window.scrollY > 20;
    header.classList.toggle("is-scrolled", isScrolled);
    if (backToTop) {
      backToTop.hidden = window.scrollY < 500;
    }
  }

  function toggleMenu(forceState) {
    if (!menuButton || !mobileMenu) return;
    const shouldOpen = forceState ?? !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", shouldOpen);
    menuButton.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    document.body.classList.toggle("no-scroll", shouldOpen);
  }

  menuButton?.addEventListener("click", () => toggleMenu());

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
})();
