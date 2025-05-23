const referenceSwiper = document.querySelector(".reference-swiper");
if (referenceSwiper) {
  new Swiper(".reference-swiper", {
    loop: true,
    navigation: false,
    noSwipingClass: "swiper-slide",
    slidesPerView: "auto",
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
  });
}
