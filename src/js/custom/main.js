(function () {
  // Scroll watcher
  const header = document.querySelector(".main-header");
  const scrollWatcher = document.createElement("div");

  scrollWatcher.setAttribute("data-scroll-watcher", "");
  header.before(scrollWatcher);

  const navObserver = new IntersectionObserver(
    (entries) => {
      header.classList.toggle("scrolled", !entries[0].isIntersecting);
    }
    //   { rootMargin: "80px 0px 0px 0px" }
  );
  navObserver.observe(scrollWatcher);
})();
