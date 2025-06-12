(function () {
  if (document.readyState === "loading") {
    document.addEventListener("readystatechange", init);
  } else {
    init();
  }

  function init() {
    const buttons = document.querySelectorAll(".auctionItems__btn");

    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentRow = btn.closest("tr");
        const detailsRow = currentRow.nextElementSibling;

        // Закрыть все другие строки и снять классы
        document.querySelectorAll(".auction-details").forEach((row) => {
          if (row !== detailsRow) {
            row.classList.add("d-none");

            const parentTr = row.previousElementSibling;
            if (parentTr) {
              parentTr.classList.remove("active-row");
              const btnInRow = parentTr.querySelector(".auctionItems__btn");
              if (btnInRow) btnInRow.classList.remove("active");
            }
          }
        });

        // Переключить текущие
        const isHidden = detailsRow.classList.contains("d-none");
        detailsRow.classList.toggle("d-none", !isHidden);
        btn.classList.toggle("active", isHidden);
        currentRow.classList.toggle("active-row", isHidden);
      });
    });
  }
})();
