export default function sliderCursor() {
  const cursor = document.querySelector(".custom-cursor");

  (function () {
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0.1, opacity: 0 });

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
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      ease: "power4out",
    });
  });
  fullSlider.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0.1,
      opacity: 0,
      ease: "power4out",
    });
  });
}
