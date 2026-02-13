(function () {
  const normalizeText = (s) =>
    (s || "").replace(/\s+/g, " ").trim().toLowerCase();

  const parseCzk = (s) => {
    const cleaned = (s || "").replace(/\u00A0/g, " ");
    const num = cleaned.replace(/[^\d]/g, "");
    return num ? Number(num) : 0;
  };

  const parseItemNumber = (s) => {
    const m = String(s || "").match(/\d+/);
    return m ? Number(m[0]) : 0;
  };

  const parseCzDateTime = (s) => {
    const str = (s || "").trim();
    const m = str.match(
      /(\d{1,2}):(\d{2})(?::(\d{2}))?\s+(\d{1,2})\.(\d{1,2})\.(\d{4})/
    );
    if (!m) return 0;
    const [, hh, mm, ss = "0", d, mon, y] = m;
    return new Date(
      Number(y),
      Number(mon) - 1,
      Number(d),
      Number(hh),
      Number(mm),
      Number(ss)
    ).getTime();
  };

  function buildGroups(tbody) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const groups = [];
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (r.classList.contains("auction-details")) continue;
      const detail =
        rows[i + 1] && rows[i + 1].classList.contains("auction-details")
          ? rows[i + 1]
          : null;
      groups.push({ main: r, detail });
    }
    return groups;
  }

  function getColumnIndexFromTh(th) {
    return Array.from(th.parentElement.children).indexOf(th);
  }

  function getValueFromGroup(group, colIndex, type) {
    const cell = group.main.children[colIndex];
    const text = cell ? cell.textContent : "";

    if (type === "num") return parseItemNumber(text);
    if (type === "price") return parseCzk(text);
    if (type === "datetime") return parseCzDateTime(text);
    return normalizeText(text);
  }

  function sortTable(table, th) {
    const tbody = table.tBodies[0];
    if (!tbody) return;
    const ACTIVE_CLASS = "text-primary-500";
    table.querySelectorAll("th[data-sort]").forEach((h) => {
      h.classList.remove(ACTIVE_CLASS);
    });
    th.classList.add(ACTIVE_CLASS);
    const colIndex = getColumnIndexFromTh(th);
    const type = th.dataset.type || "text";

    const dir = th.dataset.dir === "asc" ? "desc" : "asc";

    table.querySelectorAll("th[data-sort]").forEach((h) => {
      if (h !== th) h.removeAttribute("data-dir");
    });
    th.dataset.dir = dir;

    const groups = buildGroups(tbody);

    groups.sort((a, b) => {
      const va = getValueFromGroup(a, colIndex, type);
      const vb = getValueFromGroup(b, colIndex, type);
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });

    const frag = document.createDocumentFragment();
    groups.forEach(({ main, detail }) => {
      frag.appendChild(main);
      if (detail) frag.appendChild(detail);
    });
    tbody.appendChild(frag);
  }

  function initSortableTables(root = document) {
    const tables = root.querySelectorAll("table.auctionTable");

    tables.forEach((table) => {
      table.querySelectorAll("th[data-sort]").forEach((th) => {
        th.addEventListener("click", (e) => {
          const a = e.target.closest("a");
          if (a) e.preventDefault();
          sortTable(table, th);
        });
      });
    });
  }

  // Надёжный init для внешнего файла
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initSortableTables());
  } else {
    initSortableTables();
  }
})();
