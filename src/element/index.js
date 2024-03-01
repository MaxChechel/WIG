import gsap from "gsap";
import Swiper from "swiper";
import initVideo from "../utility/initVideo";

document.addEventListener("DOMContentLoaded", () => {
  const teamSwiper = new Swiper(".full-slider_wrap.swiper", {
    slidesPerView: "auto",
    loop: true,
    freeMode: true,
  });

  //Init video on slides
  const slides = document.querySelectorAll(".swiper-slide.card_item");
  slides.forEach((slide) => initVideo(slide));

  //Cursor
  const cursor = document.querySelector(".custom-cursor");

  (function () {
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // Pointer move event to move the cursor
    document.addEventListener("pointermove", moveCursor);

    function moveCursor(e) {
      gsap.to(cursor, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
      });
    }

    // Pointer down event to scale down the cursor
    document.addEventListener("pointerdown", function () {
      gsap.to(cursor, {
        duration: 0.5,
        scale: 0.8,
      });
    });

    // Pointer up event to scale the cursor back to normal
    document.addEventListener("pointerup", function () {
      gsap.to(cursor, {
        duration: 0.5,
        scale: 1,
      });
    });
  })();
  const fullSlider = document.querySelector(".full-slider_wrap");
  fullSlider.addEventListener("mouseenter", function () {
    cursor.classList.add("is-active");
  });
  fullSlider.addEventListener("mouseleave", function () {
    cursor.classList.remove("is-active");
  });
});
