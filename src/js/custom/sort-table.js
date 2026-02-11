const tables = document.querySelectorAll("table.auctionTable");
if (!tables.length) return;

tables.forEach((table) => {
  const th = table.querySelector("th.sort-auction");
  const tbody = table.querySelector("tbody");
  if (!th || !tbody) return;

  const link = th.querySelector("a") || th;
  let asc = true;

  link.addEventListener("click", (e) => {
    e.preventDefault();

    const columnIndex = th.cellIndex;

    const mainRows = Array.from(
      tbody.querySelectorAll("tr:not(.auction-details)")
    );

    const pairs = mainRows.map((main) => {
      const next = main.nextElementSibling;
      const details =
        next && next.classList.contains("auction-details") ? next : null;
      return { main, details };
    });

    pairs.sort((pA, pB) => {
      const a = (pA.main.children[columnIndex]?.textContent || "")
        .trim()
        .toLowerCase();
      const b = (pB.main.children[columnIndex]?.textContent || "")
        .trim()
        .toLowerCase();
      return asc ? a.localeCompare(b, "cs") : b.localeCompare(a, "cs");
    });

    asc = !asc;

    const frag = document.createDocumentFragment();
    pairs.forEach(({ main, details }) => {
      frag.appendChild(main);
      if (details) frag.appendChild(details);
    });
    tbody.appendChild(frag);
  });
});
