const thumbsSwiper = new Swiper(".photoSwiperThumbs", {
  spaceBetween: 24,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
  breakpoints: {
    // Десктоп
    1024: {
      slidesPerView: 3.7,
      spaceBetween: 24,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2.5,
      spaceBetween: 16,
    },
    0: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
  },
});

const mainSwiper = new Swiper(".mainPhotoSwiper", {
  spaceBetween: 24,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  thumbs: {
    swiper: thumbsSwiper,
  },
});

document
  .querySelectorAll(".photoSwiperThumbs .swiper-slide")
  .forEach((slide, index) => {
    slide.addEventListener("click", () => {
      thumbsSwiper.slideTo(index);
    });
  });
