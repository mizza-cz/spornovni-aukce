const bidsceSwiper = document.querySelector(".bids-swiper");
if (bidsceSwiper) {
  new Swiper(".bids-swiper", {
    loop: true,
    navigation: false,
    slidesPerView: "auto",
    speed: 400,
    allowTouchMove: true,
    simulateTouch: true,
    grabCursor: true,
    //  autoplay: {
    //    delay: 0,
    //    disableOnInteraction: false,
    //    pauseOnMouseEnter: false,
    //  },
  });
}
