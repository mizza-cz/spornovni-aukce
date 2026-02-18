// (function () {
//   const masonryGrid = document.querySelector(".masonry-products-grid");

//   if (!masonryGrid || typeof imagesLoaded !== "function") return;

//   imagesLoaded(masonryGrid, function () {
//     const msnry = new Masonry(masonryGrid, {
//       itemSelector: ".masonry-products-grid__item",
//       gutter: 28,
//       horizontalOrder: false,
//     });

//     const loadMoreBtn = document.querySelector(".products-load-more");
//     if (!msnry || !loadMoreBtn || typeof masonryReferenceSource === "undefined")
//       return;

//     loadMoreBtn.addEventListener("click", async () => {
//       const loader = document.createElement("div");
//       loader.classList.add("loader");
//       loadMoreBtn.prepend(loader);

//       const productsContainer = document.querySelector(".products");
//       if (productsContainer) {
//         productsContainer.style.maxHeight = "none";
//         productsContainer.style.overflow = "visible";
//         productsContainer.classList.add("hide-before");
//       }

//       const url = new URL(window.location.origin + masonryReferenceSource);

//       try {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: { Accept: "application/json" },
//         });

//         if (!response.ok) {
//           loader.remove();
//           return;
//         }

//         const data = await response.json();

//         if (data.html) {
//           const range = document.createRange();
//           const documentFragment = range.createContextualFragment(data.html);
//           const elements = Array.from(documentFragment.children);

//           masonryGrid.append(...elements);

//           imagesLoaded(masonryGrid, function () {
//             msnry.appended(elements);
//           });
//         }

//         loadMoreBtn.style.display = "none";
//       } catch (error) {
//         console.error("Error loading products:", error);
//       } finally {
//         loader.remove();
//       }
//     });
//   });
// })();
(function () {
  const masonryGrid = document.querySelector(".masonry-products-grid");
  const loadMoreBtn = document.querySelector(".products-load-more");

  if (!masonryGrid || !loadMoreBtn || typeof imagesLoaded !== "function")
    return;

  const debounce = (fn, wait = 150) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const getRowCount = () => {
    const items = Array.from(
      masonryGrid.querySelectorAll(".masonry-products-grid__item")
    );
    if (!items.length) return 0;

    const gridTop = masonryGrid.getBoundingClientRect().top;
    const tol = 6;

    const tops = items
      .map((el) => Math.round(el.getBoundingClientRect().top - gridTop))
      .sort((a, b) => a - b);

    const rows = [];
    for (const t of tops) {
      if (!rows.some((r) => Math.abs(r - t) <= tol)) rows.push(t);
    }
    return rows.length;
  };

  const updateLoadMoreVisibility = () => {
    const count = masonryGrid.querySelectorAll(
      ".masonry-products-grid__item"
    ).length;

    if (count <= 8) {
      loadMoreBtn.style.display = "none";
      return;
    }

    loadMoreBtn.style.display = getRowCount() >= 2 ? "" : "none";
  };

  imagesLoaded(masonryGrid, function () {
    const msnry = new Masonry(masonryGrid, {
      itemSelector: ".masonry-products-grid__item",
      gutter: 28,
      horizontalOrder: false,
    });

    requestAnimationFrame(() => {
      msnry.layout();
      requestAnimationFrame(updateLoadMoreVisibility);
    });

    window.addEventListener(
      "resize",
      debounce(() => {
        msnry.layout();
        requestAnimationFrame(updateLoadMoreVisibility);
      }, 150)
    );

    if (typeof masonryReferenceSource === "undefined") return;

    loadMoreBtn.addEventListener("click", async () => {
      const loader = document.createElement("div");
      loader.classList.add("loader");
      loadMoreBtn.prepend(loader);

      const productsContainer = document.querySelector(".products");
      if (productsContainer) {
        productsContainer.style.maxHeight = "none";
        productsContainer.style.overflow = "visible";
        productsContainer.classList.add("hide-before");
      }

      const url = new URL(window.location.origin + masonryReferenceSource);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) return;

        const data = await response.json();

        const hasMore =
          data.hasMore ??
          data.has_more ??
          data.more ??
          data.nextPage ??
          data.next_page ??
          null;

        if (!data.html || !String(data.html).trim()) {
          loadMoreBtn.style.display = "none";
          return;
        }

        const range = document.createRange();
        const documentFragment = range.createContextualFragment(data.html);
        const elements = Array.from(documentFragment.children).filter((el) =>
          el.classList.contains("masonry-products-grid__item")
        );

        if (!elements.length) {
          loadMoreBtn.style.display = "none";
          return;
        }

        masonryGrid.append(...elements);

        imagesLoaded(elements, function () {
          msnry.appended(elements);
          msnry.layout();
          requestAnimationFrame(updateLoadMoreVisibility);

          if (hasMore === false) loadMoreBtn.style.display = "none";
        });
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        loader.remove();
      }
    });
  });
})();


 