import gsap from "gsap";
import Swiper from "swiper";
import initVideo from "../utility/initVideo";

import tagsCount from "../utility/tagsCount";
import sliderCursor from "../utility/sliderCursor";

document.addEventListener("DOMContentLoaded", () => {
  tagsCount();
  toPageTop();

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
