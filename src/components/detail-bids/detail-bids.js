(() => {
  const isOverflowing = (el) => el.scrollHeight > el.clientHeight + 1;

  const init = () => {
    const wrappers = document.querySelectorAll(".auction-desc-wrapper");
    if (!wrappers.length) return;

    const updates = [];

    wrappers.forEach((wrapper) => {
      const desc = wrapper.querySelector(".js-desc");
      const btn = wrapper.querySelector(".js-descToggle");
      if (!desc || !btn) return;

      const update = () => {
        // временно убираем expanded для корректного измерения
        const wasExpanded = desc.classList.contains("is-expanded");
        if (wasExpanded) desc.classList.remove("is-expanded");

        // ждём перерисовку
        const overflowing = isOverflowing(desc);

        // возвращаем состояние
        if (wasExpanded) desc.classList.add("is-expanded");

        btn.hidden = !overflowing;
      };

      requestAnimationFrame(update);

      btn.addEventListener("click", () => {
        const expanded = desc.classList.toggle("is-expanded");
        btn.textContent = expanded ? "Skrýt popis" : "Kompletní popis";
      });

      updates.push(update);
    });

    window.addEventListener("resize", () => {
      updates.forEach((fn) => fn());
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
