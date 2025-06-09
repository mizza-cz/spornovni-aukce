// (function () {
//   const masonryGrid = document.querySelector(".masonry-products-grid");

//   if (masonryGrid) {
//     // Init masonry
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
//       }

//       const url = new URL(window.location.origin + masonryReferenceSource);
//       const page = loadMoreBtn.dataset.page ?? 2;
//       url.searchParams.append("page", page);

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

//           elements.forEach((element) => {
//             masonryGrid.append(element);
//           });

//           msnry.appended(elements);
//         }

//         if (data.loadMore === false) {
//           loadMoreBtn.style.display = "none";
//         } else {
//           loadMoreBtn.dataset.page = parseInt(page) + 1;
//         }
//       } catch (error) {
//         console.error("error", error);
//       } finally {
//         loader.remove();
//       }
//     });
//   }
// })();
(function () {
  const masonryGrid = document.querySelector(".masonry-products-grid");

  if (!masonryGrid) return;

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

      // Скрыть псевдоэлемент ::before с помощью класса
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

        elements.forEach((element) => {
          masonryGrid.append(element);
        });

        msnry.appended(elements);
      }

      loadMoreBtn.style.display = "none";
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    } finally {
      loader.remove();
    }
  });
})();
