(function () {
  const masonryGrid = document.querySelector(".masonry-products-grid");

  if (!masonryGrid || typeof imagesLoaded !== "function") return;

  imagesLoaded(masonryGrid, function () {
    const msnry = new Masonry(masonryGrid, {
      itemSelector: ".masonry-products-grid__item",
      gutter: 28,
      horizontalOrder: false,
    });

    const loadMoreBtn = document.querySelector(".products-load-more");
    if (!msnry || !loadMoreBtn || typeof masonryReferenceSource === "undefined")
      return;

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

        if (!response.ok) {
          loader.remove();
          return;
        }

        const data = await response.json();

        if (data.html) {
          const range = document.createRange();
          const documentFragment = range.createContextualFragment(data.html);
          const elements = Array.from(documentFragment.children);

          masonryGrid.append(...elements);

          imagesLoaded(masonryGrid, function () {
            msnry.appended(elements);
          });
        }

        loadMoreBtn.style.display = "none";
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        loader.remove();
      }
    });
  });
})();
