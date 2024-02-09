import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import navLinksHadler from "../components/navLinksHandler";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

const navTags = document.querySelectorAll(".navbar_tags-wrapper a");
const navTagShape = document.querySelector(
  ".navbar_tags-wrapper .navbar_tag-shape"
);

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  //Hovers
  mm.add("(hover:hover)", () => {
    navLinksHadler();

    navTags.forEach(function (tag) {
      tag.addEventListener("mouseenter", function () {
        const state = Flip.getState(navTagShape, {
          props: "opacity",
          simple: true,
        });
        navTagShape.classList.add("is-active");
        tag.classList.add("is-active");

        this.appendChild(navTagShape);

        Flip.from(state, {
          absolute: true,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      tag.addEventListener("mouseleave", function () {
        tag.classList.remove("is-active");
      });
    });

    // navMenu.addEventListener("mouseleave", function () {
    //   const state = Flip.getState(navTagShape, {
    //     props: "opacity",
    //     simple: true,
    //   });
    //   navTagShape.classList.remove("is-active");
    //   Flip.from(state, {
    //     absolute: true,
    //     duration: 0.3,
    //     ease: "power2.out",
    //     scale: true,
    //   });
    // });
  });
});
