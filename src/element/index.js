import gsap from "gsap";
import Swiper from "swiper";
import initVideo from "../utility/initVideo";

import navLinksHadler from "../utility/navLinksHandler";
import tagsCount from "../utility/tagsCount";
import sliderCursor from "../utility/sliderCursor";
import toPageTop from "../utility/toPageTop";

document.addEventListener("DOMContentLoaded", () => {
  tagsCount();
  toPageTop();
  navLinksHadler();

  const teamSwiper = new Swiper(".full-slider_wrap.swiper", {
    slidesPerView: "auto",
    loop: true,
    freeMode: true,
  });

  //Init video on slides
  const slides = document.querySelectorAll(".card_item");
  slides.forEach((slide) => initVideo(slide));

  //Cursor
  sliderCursor();
});
