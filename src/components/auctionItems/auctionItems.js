(function () {
  // Подождем пока страница полностью загрузится
  if (document.readyState === "loading") {
    document.addEventListener("readystatechange", init);
  } else {
    init();
  }

  function init() {
    const buttons = document.querySelectorAll(".auctionItems__btn");

    if (!buttons.length) return; // Нет кнопок — выходим

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentRow = btn.closest("tr");
        const detailsRow = currentRow.nextElementSibling;

        // Закрыть все другие строки
        document.querySelectorAll(".auction-details").forEach((row) => {
          if (row !== detailsRow) row.classList.add("d-none");
        });

        // Убрать "active" с других кнопок
        buttons.forEach((b) => {
          if (b !== btn) b.classList.remove("active");
        });

        // Переключить текущие
        detailsRow.classList.toggle("d-none");
        btn.classList.toggle("active");
      });
    });
  }
})();
